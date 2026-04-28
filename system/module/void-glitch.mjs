import { VoidGlitchActor } from "./documents/actor.mjs";
import { VoidGlitchItem } from "./documents/item.mjs";
import { VoidGlitchAssetSheet } from "./sheets/asset-sheet.mjs";
import { VoidGlitchNpcSheet } from "./sheets/npc-sheet.mjs";
import { VoidGlitchEnvironmentSheet } from "./sheets/environment-sheet.mjs";
import "./apps/controller-toolkit.mjs";

Hooks.once('init', async function() {
  console.log("VOID // GLITCH | Initializing System");

  // Assign custom classes and constants here
  game.voidglitch = {
    VoidGlitchActor,
    VoidGlitchItem
  };

  CONFIG.Actor.documentClass = VoidGlitchActor;
  CONFIG.Item.documentClass = VoidGlitchItem;

  // Register Sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("void-glitch", VoidGlitchAssetSheet, { types: ["asset"], makeDefault: true });
  Actors.registerSheet("void-glitch", VoidGlitchNpcSheet, { types: ["npc"], makeDefault: true });
  Actors.registerSheet("void-glitch", VoidGlitchEnvironmentSheet, { types: ["environment"], makeDefault: true });

  // Register Handlebars Helpers
  Handlebars.registerHelper('trackBoxes', function(current, max, trackName) {
    let html = '';
    for (let i = 1; i <= max; i++) {
      let checked = i <= current ? "fas fa-square" : "far fa-square";
      html += `<i class="${checked} track-box" data-track="${trackName}" data-index="${i}"></i>`;
    }
    return new Handlebars.SafeString(html);
  });

  // Register System Settings
  registerSystemSettings();
});

function registerSystemSettings() {
  game.settings.register("void-glitch", "automateAdversaryStages", {
    name: "Automate Adversary Stages",
    hint: "Automatically calculate and adjust an adversary's Stage (Intact, Shaken, Critical, Down) based on incoming Hits versus their Tier.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("void-glitch", "automateShatterRolls", {
    name: "Automate Shatter Rolls",
    hint: "Automatically prompt Shatter Rolls and apply consequences when a Vital Track fills.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });

  game.settings.register("void-glitch", "gameDifficulty", {
    name: "Game Difficulty",
    hint: "Determines how many Vital Boxes clear after surviving a Shatter Roll.",
    scope: "world",
    config: true,
    type: String,
    choices: {
      "cinematic": "Cinematic (Clears 3 boxes)",
      "standard": "Standard (Clears 2 boxes)",
      "brutal": "Brutal (Clears 1 box)"
    },
    default: "standard"
  });
}
