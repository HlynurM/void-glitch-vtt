export class ControllerToolkit extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "void-glitch-controller-toolkit",
      classes: ["voidglitch", "app", "controller-toolkit"],
      title: "Controller Toolkit",
      template: "systems/void-glitch/templates/apps/controller-toolkit.html",
      width: 500,
      height: "auto",
      resizable: true,
      tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "oracles" }]
    });
  }

  getData() {
    const data = super.getData();
    // In the future, we will populate this with actual Foundry RollTables if we create them.
    // For now, we will provide hardcoded random generation arrays or buttons to generate chat cards.
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find('.generate-btn').click(this._onGenerate.bind(this));
  }

  async _onGenerate(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const type = button.dataset.type;

    let resultHtml = "";
    
    // Quick random generator logic based on the Obsidian Vault tables
    switch(type) {
      case "oracle":
        const oracleRoll = new Roll("1d6");
        await oracleRoll.evaluate({async:true});
        const res = oracleRoll.total;
        let answer = "Hell No", number = "None", scale = "Minimal", condition = "Broken", vibes = "Hostile";
        if(res >= 2 && res <= 3) { answer = "No"; number = "A few"; scale = "Moderate"; condition = "Damaged"; vibes = "Wary"; }
        if(res >= 4 && res <= 5) { answer = "Yes"; number = "Several"; scale = "High"; condition = "Functional"; vibes = "Open"; }
        if(res === 6) { answer = "Hell Yeah"; number = "Numerous"; scale = "Extreme"; condition = "Exceptional"; vibes = "Friendly"; }
        
        resultHtml = `
          <h3>The Oracle</h3>
          <p><strong>Answer:</strong> ${answer}</p>
          <p><strong>Number:</strong> ${number}</p>
          <p><strong>Scale:</strong> ${scale}</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Vibes:</strong> ${vibes}</p>
        `;
        break;
      
      case "location":
        // Simulated roll for location type (d6)
        const locTypes = ["Corporate Spire", "Ashbelly Slum", "Void-Tainted Zone", "Abandoned Sector", "Syndicate Den", "The Underlayers"];
        const locRoll = Math.floor(Math.random() * 6);
        resultHtml = `
          <h3>Location Generator</h3>
          <p><strong>Type:</strong> ${locTypes[locRoll]}</p>
          <p><em>(Features and Atmosphere can be added here)</em></p>
        `;
        break;

      case "npc":
        // Simulated roll for NPC
        const drives = ["Survival", "Debt", "Power", "Escape", "Truth", "The Void"];
        const driveRoll = Math.floor(Math.random() * 6);
        resultHtml = `
          <h3>NPC Generator</h3>
          <p><strong>Drive:</strong> ${drives[driveRoll]}</p>
        `;
        break;
    }

    if (resultHtml) {
      ChatMessage.create({
        speaker: { alias: "Controller System" },
        content: `<div class="voidglitch chat-card">${resultHtml}</div>`
      });
    }
  }
}

// Hook to add a button to the sidebar/scene controls to open the Toolkit
Hooks.on('getSceneControlButtons', (controls) => {
  if (game.user.isGM) {
    const tokenControls = controls.find(c => c.name === "token");
    if (tokenControls) {
      tokenControls.tools.push({
        name: "controller-toolkit",
        title: "Controller Toolkit",
        icon: "fas fa-terminal",
        button: true,
        onClick: () => {
          new ControllerToolkit().render(true);
        }
      });
    }
  }
});
