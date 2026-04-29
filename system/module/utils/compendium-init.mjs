export async function initializeBlueprints() {
  if (!game.user.isGM) return; // Only GM runs initialization

  // Check if we have already initialized blueprints by looking for "Striker"
  const existingStriker = game.items.find(i => i.type === "blueprint" && i.name === "Striker");
  if (existingStriker) return; // Already generated

  console.log("VOID // GLITCH | Auto-generating Core Blueprints...");

  const blueprintsData = [
    {
      name: "Striker",
      type: "blueprint",
      system: {
        role: "Frontline pressure dealer",
        engine: "MOMENTUM: stay in the fight, stay deadly. Start it with SURGE or NOVA on ENGAGE. While in it, +1 die on ENGAGE. SURGE deals +1 Hit. Keep it going by staying active every exchange. Crash it on SPARK or GLITCH while active: 1 HARM, Inferior Position, MOMENTUM ends.",
        description: "Fast, forward, mean. The room clears because you walked into it — and kept walking. Close distance. Keep pressure. Don't stop."
      }
    },
    {
      name: "Bioforge",
      type: "blueprint",
      system: {
        role: "Brutal survivor",
        engine: "ADAPTATION. You get harder to kill as the fight goes on.",
        description: "Flesh sculpted by illicit gene-mods or Void taint. The traits here are important because each trait adds a type of mutation capability that works hand in hand with the specialty."
      }
    },
    {
      name: "Savant",
      type: "blueprint",
      system: {
        role: "Eccentric inventor",
        engine: "RIG: jury-rig solutions, operate through proxies. Choose components from a table to build a dynamic statblock for your RIG.",
        description: "Neurologically plugged into the hyper-net or carrying heavy tech. Reality is just code and hardware."
      }
    },
    {
      name: "Infiltrator",
      type: "blueprint",
      system: {
        role: "Precision operative",
        engine: "THE DROP: set the angle, strike clean, fade to the next.",
        description: "Artificial lifeforms, androids, or simply the best ghost in the business."
      }
    },
    {
      name: "Handler",
      type: "blueprint",
      system: {
        role: "Calculated scoundrel",
        engine: "THE GAMBIT: bank angles, cash them in big.",
        description: "The one calling the shots. They see the board."
      }
    }
  ];

  await Item.createDocuments(blueprintsData);
  ui.notifications.info("VOID // GLITCH: Core Blueprints have been automatically generated in your Items tab!");
}
