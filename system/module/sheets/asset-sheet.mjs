import { ActionDialog } from "../dialogs/action-dialog.mjs";

export class VoidGlitchAssetSheet extends ActorSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["voidglitch", "sheet", "actor", "asset"],
      template: "systems/void-glitch/templates/asset-sheet.html",
      width: 800,
      height: 600,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "abilities" }]
    });
  }

  getData() {
    const context = super.getData();
    context.system = context.actor.system;

    // Prepare items for rendering
    context.abilities = context.items.filter(i => i.type === 'ability');
    context.traits = context.items.filter(i => i.type === 'trait');
    context.weapons = context.items.filter(i => i.type === 'weapon');
    context.armor = context.items.filter(i => i.type === 'armor');
    context.gear = context.items.filter(i => i.type === 'gear');

    // Make safe HTML for editor
    context.enrichedBackground = TextEditor.enrichHTML(context.system.details.background, {async: false});

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Roll handlers (can be clicked even if not editable)
    html.find('.rollable').click(this._onRoll.bind(this));

    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Item controls (e.g., delete, edit)
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

  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.rollType === "action") {
      // Default the dialog to the attribute that was clicked
      const options = { defaultAttribute: dataset.attribute };
      await ActionDialog.create(this.actor, options);
    }
  }
}
