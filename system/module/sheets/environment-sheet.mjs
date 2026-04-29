export class VoidGlitchEnvironmentSheet extends ActorSheet {
  
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["voidglitch", "sheet", "actor", "environment"],
      template: "systems/void-glitch/templates/environment-sheet.html",
      width: 700,
      height: 600
    });
  }

  async getData() {
    const context = super.getData();
    context.system = context.actor.system;

    const TextEditorImpl = foundry?.applications?.ux?.TextEditor?.implementation ?? TextEditor;
    context.enrichedDescription = await TextEditorImpl.enrichHTML(context.system.details.description || "");
    context.enrichedHazards = await TextEditorImpl.enrichHTML(context.system.details.hazards || "");

    return context;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Track box click handlers
    html.find('.track-box').click(this._onTrackBoxClick.bind(this));
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
