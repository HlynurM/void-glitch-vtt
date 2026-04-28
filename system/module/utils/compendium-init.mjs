export async function initializeBlueprints() {
  if (!game.user.isGM) return; // Only GM runs initialization

  // Check if we have already initialized blueprints by looking for "Chrome"
  const existingChrome = game.items.find(i => i.type === "blueprint" && i.name === "Chrome");
  if (existingChrome) return; // Already generated

  console.log("VOID // GLITCH | Auto-generating Core Blueprints...");

  const blueprintsData = [
    {
      name: "Chrome",
      type: "blueprint",
      system: {
        role: "Striker",
        engine: "Mark 1 HEAT when you roll SURGE or NOVA on a KINETIC ability. CLOCK (4 segments). At 1–2 (WARM): +1 die to all KINETIC rolls. At 3–4 (HOT): +1 die AND you may spend 1 STRAIN to trigger the KINETIC SURGE version of any KINETIC ability. Clears at end of scene.",
        description: "The apex predator of the sprawl. Heavy cybernetics, combat-wired reflexes."
      }
    },
    {
      name: "Bioforge",
      type: "blueprint",
      system: {
        role: "Mutant",
        engine: "Mark 1 MUTATION when you push a roll with CORRUPTION. CLOCK (4 segments). At 1-2 (AWAKE): You ignore Position penalties from environmental hazards. At 3-4 (UNSTABLE): You gain a natural weapon (Harm 2) and +1 die to all physical actions. Clears at end of scene.",
        description: "Flesh sculpted by illicit gene-mods or Void taint."
      }
    },
    {
      name: "Synth",
      type: "blueprint",
      system: {
        role: "Infiltrator / Specialist",
        engine: "Mark 1 GHOST when you succeed on a stealth or tech roll. CLOCK (4 segments). At 1-2 (VEILED): +1 die on all GUILE rolls to avoid detection. At 3-4 (PHANTOM): You are completely invisible to electronic surveillance and can bypass physical security without a roll. Clears at end of scene.",
        description: "Artificial lifeforms, androids, and escaped corporate assets."
      }
    },
    {
      name: "Cortex",
      type: "blueprint",
      system: {
        role: "Hacker",
        engine: "Mark 1 RESONANCE when you roll SURGE or NOVA on an INTERFACE ability. CLOCK (4 segments). At 1–2 (ATTUNED): +1 die on all INTERFACE rolls. At 3–4 (RESONANT): +1 die AND you may spend 1 STRAIN to instantly override a system. Clears at end of scene.",
        description: "Neurologically plugged into the hyper-net. Reality is just code."
      }
    },
    {
      name: "Handler",
      type: "blueprint",
      system: {
        role: "Leader / Tactician",
        engine: "Mark 1 GAMBIT when an ally rolls a GLITCH. CLOCK (4 segments). At 1-2 (FOCUSED): You can spend 1 GAMBIT to give an ally +1 die after they roll. At 3-4 (MASTERMIND): You can spend 2 GAMBIT to turn an ally's GLITCH into a SPARK. Clears at end of scene.",
        description: "The one calling the shots. They see the board."
      }
    },
    {
      name: "Void Witch",
      type: "blueprint",
      system: {
        role: "Reality Bender",
        engine: "Mark 1 FLUX when you roll SURGE or NOVA on a FLUX ability. CLOCK (4 segments). At 1–2 (ATTUNED): +1 die on all FLUX ability rolls. At 3–4 (RESONANT): +1 die AND you may spend 1 CORRUPTION to trigger the FLUX SURGE version of any FLUX ability. Clears at end of scene.",
        description: "Channelers of the Void. Dangerous, powerful, unstable."
      }
    }
  ];

  await Item.createDocuments(blueprintsData);
  ui.notifications.info("VOID // GLITCH: Core Blueprints have been automatically generated in your Items tab!");
}
