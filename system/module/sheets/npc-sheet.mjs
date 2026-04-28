export class VoidGlitchNpcSheet extends ActorSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["voidglitch", "sheet", "actor", "npc"],
      template: "systems/void-glitch/templates/npc-sheet.html",
      width: 700,
      height: 600
    });
  }

  getData() {
    const context = super.getData();
    context.system = context.actor.system;
    
    // Allow sheet to adapt styling if it's marked as an Environment
    context.isEnvironment = context.system.details.isEnvironment;

    context.weapons = context.items.filter(i => i.type === 'weapon');
    context.abilities = context.items.filter(i => i.type === 'ability');

    context.enrichedDescription = TextEditor.enrichHTML(context.system.details.description, {async: false});
    context.enrichedTactics = TextEditor.enrichHTML(context.system.details.tactics, {async: false});

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

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
  }
}
