export async function initializeBlueprints() {
  if (!game.user.isGM) return;

  const blueprintNames = ["Striker", "Bioforge", "Savant", "Infiltrator", "Handler"];
  const existingNames = game.items
    .filter(i => i.type === "blueprint")
    .map(i => i.name);

  const missingNames = blueprintNames.filter(n => !existingNames.includes(n));
  if (missingNames.length === 0) return;

  console.log(`VOID // GLITCH | Auto-generating missing Blueprints: ${missingNames.join(", ")}`);

  const blueprintsData = [
    {
      name: "Striker",
      type: "blueprint",
      system: {
        role: "Frontline force. Rhythm-fighter. Your best exchanges happen at speed.",
        engine: `MOMENTUM: You're dangerous when the fight is in motion. 
• START IT: SURGE or NOVA on ENGAGE.
• WHILE IN IT: +1 die on ENGAGE. SURGE deals +1 Hit.
• KEEP IT GOING: stay active every exchange (ENGAGE, MANEUVER, or PRIME).
• CRASH IT: SPARK or GLITCH while active = 1 HARM + Inferior Position + MOMENTUM ends.

OVEREXTEND (Automatic): In MOMENTUM, push through a weak hit — turn SPARK into SURGE. Cost: 1 HARM. MOMENTUM holds. Operator gets no Counter Move.`,
        description: `Fast, forward, mean. The room clears because you walked into it — and kept walking. Close distance. Keep pressure. Don't stop.

Dangerous when: moving in and striking. +1 die on ENGAGE while in MOMENTUM.
Tanks: HARM.
Weak to: being forced to stop, mental and social pressure.
Build around: EDGE and GRIT.

Suggested Attributes: EDGE 3 · GRIT 2 · CORTEX 1 · GUILE 1`,
        traits: `CORE TRAIT — OVEREXTEND (Automatic for every Striker)
In MOMENTUM, push through a weak hit: turn SPARK into SURGE. Cost: 1 HARM. MOMENTUM holds. Operator gets no Counter Move.

TRAITS (choose 1 at creation; 3 XP each; max 4 total):
• Iron Warden: In MOMENTUM, once per action when you mark HARM for any reason, reduce it by 1 and mark 1 STRAIN instead.
• Berserker's Eye: After MOMENTUM crashes, your next roll gains +1 die.
• Hard Target: In MOMENTUM, incoming HARM is reduced by 1 (minimum 0).
• First Blood: Once per scene, your first ENGAGE triggers MOMENTUM regardless of the roll.
• War Hardened: +1 box on your HARM track. On a Body Shatter roll, clear 1 extra box.`
      }
    },
    {
      name: "Bioforge",
      type: "blueprint",
      system: {
        role: "Close-range adaptive brawler. The threat escalates because your body escalates.",
        engine: `MUTANT: Three Stages of physical escalation.
• STAGE 1 (Trigger: spend 1 STRAIN or take 1 HARM): Pick one unlocked Trait. GAIN only.
• STAGE 2 (Trigger: same, while at Stage 1): Pick a second Trait or double up. GAIN + COST applies to all active Traits.
• STAGE 3 — APEX (Trigger: advance again while at Stage 2): Every unlocked Trait fires. All Gains. All Costs. GLITCH = roll SPIRAL.
• REVERT: End of scene free. Hold Stage 1 into next scene = 1 STRAIN. Hold Stage 2 = 1 HARM. Stage 3 cannot be held.

HARD TO KILL (Automatic): Once per action when you take HARM, reduce it by 1 (minimum 1).`,
        description: `You are an abomination. A secret experiment that broke free: shunned, mistrusted, hated. But when shit hits the fan they come crawling, because no one adapts to danger like a Mutant.

Dangerous when: bleeding and still moving. HARM fuels the change.
Tanks: HARM and CORRUPTION.
Weak to: ranged pressure, sustained mental strain.
Build around: GRIT and EDGE.

Suggested Attributes: GRIT 3 · EDGE 2 · GUILE 1 · CORTEX 1`,
        traits: `CORE TRAIT — HARD TO KILL (Automatic for every Bioforge)
Once per action when you take HARM, reduce it by 1 (minimum 1).

MUTATION TRAITS — each is a domain. Stage 1: Gain only. Stage 2+: Gain + Cost.
Choose 1 at creation (3 XP each; max 4 total):

• BULK — Gain: +1 Hit on ENGAGE, +1 die on raw-force tasks. Cost: −1 die MANEUVER.
• REFLEX — Gain: +1 die MANEUVER. SURGE on MANEUVER closes one zone free. Cost: +1 Risk on WARD.
• CARAPACE — Gain: Armor 3 (natural). Cost: −1 die MANEUVER. Cannot stealth.
• TOXIN — Gain: Melee ENGAGE applies Toxin. Cost: anyone healing you marks 1 STRAIN.
• PREDATOR — Gain: +1 die TRACE/PRIME when stalking. Immune to surprise. Cost: cannot Aid or be Aided.
• REACH — Gain: ENGAGE at CLOSE from MELEE. Grapple two targets. +1 Hit on first ENGAGE per exchange. Cost: always top enemy target priority.
• DREAD — Gain: enemies in CLOSE/MELEE lose 1 Counter Move. +1 die OR −1 Risk on intimidation. Cost: allies in CLOSE mark 1 STRAIN per exchange.
• VOIDFLESH — Gain: +1 die on ALL rolls in Void-Tainted zones. CORRUPTION triggers Stage advance. Cost: +1 Risk on all rolls outside Void-Tainted zones.`
      }
    },
    {
      name: "Savant",
      type: "blueprint",
      system: {
        role: "Eccentric inventor. You operate through things — drones, exo-frames, traps, scripts.",
        engine: `RIG: Anything you build, hack, wire, or jury-rig.
• RIGGING UP: Declare a RIG and the modes it combines. Roll INTERFACE (software) or PRIME (physical).
  — Modes ≤ CORTEX = standard Risk
  — CORTEX +1 = +1 Risk + 1 STRAIN (PUSH)
  — CORTEX +2 = +2 Risk + 2 STRAIN (AUDACIOUS — GLITCH triggers SHORT-CIRCUIT)
• OPERATING: TRACE through any RIG as a Reflex. Act through any RIG's vantage from where you stand.
• MAX ACTIVE RIGS = your CORTEX score.
• RIGs persist across scenes within a mission until destroyed.

RIG MODES: SENSOR · STEALTH · NETWORK · MOBILITY · MANIPULATOR · ARMOR · WEAPON · POWER

TUNED (Automatic): When you operate through one of your own RIGs, gain +1 die on the action.`,
        description: `Neurologically plugged into the hyper-net or carrying heavy tech. Reality is just code and hardware. You see the building's nervous system.

Dangerous when: you've had time to scout, drop the RIGs, set the cascade.
Tanks: STRAIN.
Weak to: direct confrontation, losing your RIGs.
Build around: CORTEX and EDGE.

Suggested Attributes: CORTEX 3 · EDGE 2 · GUILE 1 · GRIT 1`,
        traits: `CORE TRAIT — TUNED (Automatic for every Savant)
When you operate through one of your own RIGs — see, act, trigger — gain +1 die on the action. You designed it.

TRAITS (choose 1 at creation; 3 XP each; max 4 total):
• Just One More: RIG cap +1.
• Maestro: Once per scene, treat CORTEX as +1 higher for one RIG you're rigging up.
• McGyver: Improvise a simple 1–2 mode solution from found objects. TRACE at Risk −1 to scavenge, then PRIME or INTERFACE at Risk −1 to build. Lasts this scene only.
• Cybered Up: Pick two cybernetic implants — Sensor Eyes, Cybernetic Limb, Neuro-buffer, or Subdermal Comms.
• Failsafe: Once per scene, when a RIG would break on a GLITCH, mark 1 STRAIN to turn it into a SPARK instead.
• Always Prepared: Mission start with 1 RIG already live (Operator approves).
• Make it Bigger: WEAPON-mode RIGs deal +1 DMG.
• Pet Drone: Personal drone companion — MOBILITY + SENSOR, T1 Hull. Doesn't consume CORTEX cap.`
      }
    },
    {
      name: "Infiltrator",
      type: "blueprint",
      system: {
        role: "Stealth specialist. Patient. Precise. You fight the exchange before it happens.",
        engine: `THE DROP: The setup before the strike.
• GETTING THE DROP: SURGE or NOVA on TRACE, PRIME, or MANEUVER to a scouted vantage. Entered scene unnoticed = +1 die on first setup roll. Hold drops on multiple targets.
• WHILE YOU HAVE THE DROP: +1 die on ENGAGE against a dropped target. +1 die on MANEUVER using the drop. Targets who haven't detected you cannot target you.
• KEEPING IT: The drop persists across exchanges. After CLEAN EXIT, relocate and it holds.
• BURNING THE DROP (optional, once per drop): +1 die still applies. After roll: upgrade one SURGE to NOVA OR reduce one Counter Move by one step. Drop ends.
• LOSING IT: GLITCH = drop lost. SPARK = 1 pip on NOISE clock (2 pips = drop lost).

CLEAN EXIT (Automatic): After any successful ENGAGE (SURGE+), reposition one zone, no roll. The strike and the exit are one motion.`,
        description: `Surgical. Patient. Prepared. You learned the ground before you walked in — the angles, the exits, the second before anyone turns their head. The fight was over before it started, because you chose the shape of it.

Dangerous when: you have the drop on a target.
Tanks: STRAIN.
Weak to: being caught in the open, forced exchanges.
Build around: EDGE and GUILE.

Suggested Attributes: EDGE 3 · GUILE 2 · CORTEX 2 · GRIT 1`,
        traits: `CORE TRAIT — CLEAN EXIT (Automatic for every Infiltrator)
After any successful ENGAGE (SURGE or better), reposition: one zone, or any position you could plausibly reach. No roll. No Risk.

TRAITS (choose 1 at creation; 3 XP each; max 4 total):
• Patient Killer: When you PRIME before an ENGAGE on a dropped target, next Hit deals Piercing(1).
• Exploit Opening: When your own or an ally's SURGE/NOVA lands against a target, your next action against them gains +1 die.
• Ghost Step: −1 Risk on any MANEUVER between scouted vantages.
• Ice Veins: When a GLITCH would lose you the drop, mark 1 STRAIN to hold it. Once per scene.
• Surveyor: One TRACE reads the scene and the target. SPARK = 1 vantage · SURGE = 2 vantages + drop on one target · NOVA = 3 vantages + the drop.`
      }
    },
    {
      name: "Handler",
      type: "blueprint",
      system: {
        role: "Calculated scoundrel. Charm, schemes, big plays for big payoffs.",
        engine: `THE GAMBIT: A MARK is an edge you've banked — a read, a debt, a tell, a setup. MAX MARKS = your GUILE score.
• BUILDING MARKS: SURGE on TRACE or PRIME = bank 1 MARK. NOVA = bank 2. Normal move result still applies.
• SPARK on any roll: lose 1 additional MARK from your bank.
• GLITCH on any roll: lose every MARK you hold.
• SPENDING MARKS: Before any roll, declare any number you're spending. Each adds +1 die.
• MIC DROP (once per mission, min 2 MARKS): Same +1 die each AND declare the score — a scene-rewriting play. SURGE/NOVA: lands at scale. SPARK: lands compromised. GLITCH: score lost.

THE LONG PLAY (Automatic): Your MARKS persist across scenes within a mission. Only resets when spent, lost on a roll, or the mission ends.`,
        description: `You don't play the hand you're dealt. You pocket the trick and play it three rounds later, when the pot's bigger. Half the fight gets resolved by a favor called in last week.

Dangerous when: you've had time to read the room, build the bank, work an angle.
Tanks: STRAIN.
Weak to: direct combat, being read first, getting cornered before the bank fills.
Build around: GUILE and EDGE.

Suggested Attributes: GUILE 3 · EDGE 2 · CORTEX 1 · GRIT 1`,
        traits: `CORE TRAIT — THE LONG PLAY (Automatic for every Handler)
Your MARKS persist across scenes within a mission. The bank only empties when you spend it, lose it on a SPARK or GLITCH, or the mission ends.

TRAITS (choose 1 at creation; 3 XP each; max 4 total):
• Silver Tongue: Once/scene, reduce Risk by 1 on a GUILE social roll.
• Read the Room: At the start of any social scene, Operator reveals one social vantage (motivation/vulnerability/lie) for one major NPC.
• Slippery: Once/scene, when you'd mark HARM from a Counter Move, mark 1 STRAIN instead and reposition one zone.
• Hidden Card: Once/mission, declare you have one small thing the pat-down missed. Operator approves on plausibility.
• Friends Everywhere: At mission start, declare one NPC or faction connection you have. Once/mission, lean on it for support.
• Dirty Tricks: When you ENGAGE, declare a dirty angle. On SURGE+, also pick one: Off-balance / Pull Focus / Trip 'em.
• Ace of Spades: Start each mission with 1 MARK already banked.
• I GOT THIS: Once/scene, declare "I got this." Gain +1 die. If you GLITCH, mark 2 STRAIN extra.`
      }
    }
  ];

  const toCreate = blueprintsData.filter(b => missingNames.includes(b.name));
  await Item.createDocuments(toCreate);
  ui.notifications.info(`VOID // GLITCH: Generated missing Blueprints: ${missingNames.join(", ")}`);
}
