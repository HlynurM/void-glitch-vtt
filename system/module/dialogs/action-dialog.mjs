export class ActionDialog extends Dialog {
  
  static async create(actor, options = {}) {
    const templateData = {
      attributes: {
        edge: actor.system.attributes.edge.value,
        grit: actor.system.attributes.grit.value,
        cortex: actor.system.attributes.cortex.value,
        guile: actor.system.attributes.guile.value
      },
      defaultAttribute: options.defaultAttribute || "edge",
      actionName: options.actionName || "",
      weaponName: options.weaponName,
      weaponDamage: options.weaponDamage,
      weaponTags: options.weaponTags
    };

    const html = await renderTemplate("systems/void-glitch/templates/dialogs/action-dialog.html", templateData);

    return new Promise((resolve) => {
      const dialog = new ActionDialog({
        classes: ["voidglitch", "action-dialog", "dialog"],
        title: `Action Roll: ${actor.name}`,
        content: html,
        buttons: {
          roll: {
            icon: '<i class="fas fa-dice"></i>',
            label: "Roll",
            callback: html => resolve(ActionDialog._processRoll(html, actor))
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
            callback: () => resolve(null)
          }
        },
        default: "roll",
        close: () => resolve(null)
      });
      dialog.render(true);
    });
  }

  static async _processRoll(html, actor) {
    const form = html[0].querySelector("form");
    
    const actionName = form.actionName ? form.actionName.value : "Custom";
    const attributeKey = form.attributeKey ? form.attributeKey.value : "edge";
    const baseRisk = parseInt(form.baseRisk ? form.baseRisk.value : 4) || 4;
    const positionMod = parseInt(form.positionMod ? form.positionMod.value : 0) || 0;
    const bonusDice = parseInt(form.bonusDice ? form.bonusDice.value : 0) || 0;
    const isVoidTainted = form.isVoidTainted ? form.isVoidTainted.checked : false;
    const spendStrain = form.spendStrain ? form.spendStrain.checked : false;
    const spendCorruption = form.spendCorruption ? form.spendCorruption.checked : false;

    try {
      // Calculate Final Risk (min 3, max 6)
      let finalRisk = Math.max(3, Math.min(6, baseRisk + positionMod));

      // Calculate Pool Size
      const attributeValue = parseInt(actor.system.attributes[attributeKey]?.value) || 1;
      let poolSize = attributeValue + bonusDice;
      
      let costs = [];
      if (spendStrain) {
        poolSize += 1;
        costs.push("1 Strain");
        // Apply Strain cost (we will update the actor document)
        const currentStrain = parseInt(actor.system.tracks.strain.value) || 0;
        await actor.update({ "system.tracks.strain.value": currentStrain + 1 });
      }
      if (spendCorruption) {
        poolSize += 1;
        costs.push("1 Corruption");
        // Apply Corruption cost
        const currentCorruption = parseInt(actor.system.tracks.corruption.value) || 0;
        await actor.update({ "system.tracks.corruption.value": currentCorruption + 1 });
      }

      // Ensure pool is at least 1 die
      poolSize = Math.max(poolSize, 1);

      // Roll the dice
      const rollExpression = `${poolSize}d6cs>=${finalRisk}`;
      const roll = new Roll(rollExpression);
      await roll.evaluate({async: true});

      // Process Results
      const diceResults = roll.terms[0].results.map(r => r.result);
      let hits = 0;
      let flares = 0;

      diceResults.forEach(r => {
        if (r >= finalRisk) hits++;
        if (isVoidTainted && (r === 1 || r === 6)) flares++;
      });

      // Determine Outcome Ladder
      let outcome = "GLITCH";
      let advantagePicks = 0;

      if (hits === 1) {
        outcome = "SPARK";
      } else if (hits === 2) {
        outcome = "SURGE";
        advantagePicks = 2;
      } else if (hits >= 3) {
        outcome = "NOVA";
        advantagePicks = 3;
      }

      // Render Chat Message
      const templateData = {
        actor: actor,
        actionName: actionName,
        attribute: attributeKey.toUpperCase(),
        poolSize: poolSize,
        risk: finalRisk,
        costs: costs.join(" & "),
        dice: diceResults,
        hits: hits,
        flares: flares,
        outcome: outcome,
        advantagePicks: advantagePicks,
        isVoidTainted: isVoidTainted,
        weaponDamage: form.weaponDamage ? parseInt(form.weaponDamage.value) : null
      };

      const chatHtml = await renderTemplate("systems/void-glitch/templates/chat/action-result.html", templateData);

      let chatData = {
        user: game.user.id,
        speaker: ChatMessage.getSpeaker({ actor: actor }),
        content: chatHtml,
        type: CONST.CHAT_MESSAGE_TYPES.ROLL,
        rolls: [roll],
        sound: CONFIG.sounds.dice
      };

      ChatMessage.create(chatData);

      return { hits, outcome, flares };
    } catch (e) {
      console.error("VOID // GLITCH | Dice Roller Error:", e);
      ui.notifications.error("Dice Error: " + e.message);
    }
  }
}
