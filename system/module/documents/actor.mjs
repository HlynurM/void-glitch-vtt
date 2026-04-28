export class VoidGlitchActor extends Actor {
  
  /** @override */
  prepareData() {
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded documents or derived data.
  }

  /** @override */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.voidglitch || {};

    if (actorData.type === 'asset') this._prepareAssetData(actorData);
    if (actorData.type === 'npc') this._prepareNpcData(actorData);
  }

  _prepareAssetData(actorData) {
    const system = actorData.system;

    // Calculate Tracks
    const edge = system.attributes.edge.value || 1;
    const grit = system.attributes.grit.value || 1;
    const cortex = system.attributes.cortex.value || 1;
    const guile = system.attributes.guile.value || 1;

    system.tracks.harm.max = 3 + Math.max(edge, grit);
    system.tracks.strain.max = 3 + Math.max(grit, cortex);
    system.tracks.corruption.max = 3 + Math.max(cortex, guile);

    // Calculate Load
    system.load.max = edge + grit + 2;
    
    // We will calculate current load based on items in a later step
  }

  _prepareNpcData(actorData) {
    const system = actorData.system;

    // Automate stage calculation if setting is enabled
    if (game.settings.get("void-glitch", "automateAdversaryStages")) {
      const hits = system.tracks.harm.value || 0;
      const tier = system.details.tier || 1;
      
      let newStage = "Intact";
      if (hits >= tier * 3) {
        newStage = "Down";
      } else if (hits >= tier * 2) {
        newStage = "Critical";
      } else if (hits >= tier) {
        newStage = "Shaken";
      }
      
      system.details.stage = newStage;
    }
  }
}
