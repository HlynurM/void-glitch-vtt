export class VoidGlitchItemSheet extends ItemSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["voidglitch", "sheet", "item"],
      template: "systems/void-glitch/templates/item-sheet.html",
      width: 520,
      height: 480
    });
  }

  async getData() {
    const context = super.getData();
    context.system = context.item.system;

    context.enrichedDescription = await TextEditor.enrichHTML(context.system.description || "", {async: true});

    return context;
  }
}
