export class VoidGlitchNpcSheet extends ActorSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["voidglitch", "sheet", "actor", "npc"],
      template: "systems/void-glitch/templates/npc-sheet.html",
      width: 700,
      height: 600
    });
  }

  async getData() {
    const context = super.getData();
    context.system = context.actor.system;
    
    // Allow sheet to adapt styling if it's marked as an Environment
    context.isEnvironment = context.system.details.isEnvironment;

    context.weapons = context.items.filter(i => i.type === 'weapon');
    context.abilities = context.items.filter(i => i.type === 'ability');

    const TextEditorImpl = foundry?.applications?.ux?.TextEditor?.implementation ?? TextEditor;
    context.enrichedDescription = await TextEditorImpl.enrichHTML(context.system.details.description || "");
    context.enrichedTactics = await TextEditorImpl.enrichHTML(context.system.details.tactics || "");

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Track box click handlers (can be clicked even if not editable)
    html.find('.track-box').click(this._onTrackBoxClick.bind(this));

    if (!this.isEditable) return;

    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      item.sheet.render(true);
    });

    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteEmbeddedDocuments("Item", [li.data("itemId")]);
      li.slideUp(200, () => this.render(false));
    });

    html.find('.item-broadcast').click(async ev => {
      ev.preventDefault();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) {
        const templateData = {
          actor: this.actor,
          item: item,
          isWeapon: item.type === "weapon"
        };
        const chatHtml = await renderTemplate("systems/void-glitch/templates/chat/item-broadcast.html", templateData);
        let chatData = {
          user: game.user.id,
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          content: chatHtml
        };
        ChatMessage.create(chatData);
      }
    });
  }

  async _onTrackBoxClick(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const trackName = element.dataset.track;
    const index = parseInt(element.dataset.index);

    const currentVal = this.actor.system.tracks[trackName].value;
    
    // If clicking the current value, decrease it by 1 (uncheck)
    let newVal = index;
    if (index === currentVal) {
      newVal -= 1;
    }

    await this.actor.update({ [`system.tracks.${trackName}.value`]: newVal });
  }
}
