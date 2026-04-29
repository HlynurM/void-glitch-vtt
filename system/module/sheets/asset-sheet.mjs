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

  async getData() {
    const context = super.getData();
    context.system = context.actor.system;

    // Prepare items for rendering
    context.abilities = context.items.filter(i => i.type === 'ability');
    context.traits = context.items.filter(i => i.type === 'trait');
    context.weapons = context.items.filter(i => i.type === 'weapon');
    context.armor = context.items.filter(i => i.type === 'armor');
    context.gear = context.items.filter(i => i.type === 'gear');
    context.blueprints = context.items.filter(i => i.type === 'blueprint');

    // Make safe HTML for editor (V13 compatible)
    const TextEditorImpl = foundry?.applications?.ux?.TextEditor?.implementation ?? TextEditor;
    context.enrichedBackground = await TextEditorImpl.enrichHTML(context.system.details.background || "");

    return context;
  }

  /** @override */
  async _onDropItemCreate(itemData) {
    // If dropping a blueprint, update the asset's blueprint text field automatically
    const isBlueprint = itemData.type === "blueprint" || (Array.isArray(itemData) && itemData[0]?.type === "blueprint");
    if (isBlueprint) {
      const blueprintName = Array.isArray(itemData) ? itemData[0].name : itemData.name;
      await this.actor.update({ "system.details.blueprint": blueprintName });
    }

    return super._onDropItemCreate(itemData);
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Roll handlers (can be clicked even if not editable)
    html.find('.rollable').click(this._onRoll.bind(this));

    // Track box click handlers
    html.find('.track-box').click(this._onTrackBoxClick.bind(this));

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

    html.find('.trait-toggle').click(async ev => {
      ev.preventDefault();
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.items.get(li.data("itemId"));
      if (item) {
        await item.update({ "system.isActive": !item.system.isActive });
      }
    });
  }

  async _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if (dataset.rollType === "action") {
      const options = { defaultAttribute: dataset.attribute };
      await ActionDialog.create(this.actor, options);
    } else if (dataset.rollType === "weapon") {
      const item = this.actor.items.get(dataset.itemId);
      const options = { 
        defaultAttribute: "edge", // Engaging usually uses Edge or Grit
        weaponName: item.name,
        weaponDamage: item.system.damage,
        weaponTags: item.system.tags
      };
      await ActionDialog.create(this.actor, options);
    } else if (dataset.rollType === "move") {
      const options = {
        actionName: dataset.move,
        defaultAttribute: "edge"
      };
      await ActionDialog.create(this.actor, options);
    }
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
