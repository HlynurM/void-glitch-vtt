# VOID // GLITCH AI Development Workflow

This document outlines the Model Context Protocol (MCP), Agent architecture, and Skills utilized by our AI assistant (Antigravity) to develop the VOID // GLITCH Foundry VTT system.

## 1. Agent Roles & Personas
To keep the development organized and high-quality, we will divide the tasks into conceptual "Roles" for the AI to adopt when working on specific features:

* **System Architect Agent:** Responsible for data structures (`template.json`, `system.json`) and core logic. Ensures data consistency and minimal overhead.
* **UI/UX Designer Agent:** Handles HTML (`templates/`) and CSS/Less (`styles/`). Focuses on a "VOID // GLITCH" aesthetic (e.g., glitch effects, sleek dark modes, neon highlights, card-based ability layouts).
* **Mechanics Engine Agent:** Writes the JavaScript for the dice pool, resolution mechanics, and Foundry VTT Macros. Responsible for the `Roll` overrides and logic behind SURGE, NOVA, SPARK, and GLITCH.

## 2. Model Context Protocol (MCP) Integration
When utilizing AI models, the following context boundaries and protocols will be maintained:
* **Rules Ingestion Protocol:** The Obsidian Vault is the single source of truth. Any time the AI needs clarification on mechanics (like Bioforge MUTANT stages or Handler GAMBIT marks), it will query the vault files before assuming rules.
* **Feature Module Protocol:** When a new system feature is implemented, the AI will document the changes in `docs/features/` with the design intent before writing the code.

## 3. Development Skills & Tools
The AI leverages the following skills/tools in this repository:
* **Data Modeling:** Creating robust Foundry VTT DataModels / `template.json`.
* **Handlebars Templating:** Designing the `operative` character sheet. We will model "Abilities" as modular cards that can be dragged and dropped into the sheet.
* **Roll Mechanics:** Intercepting Foundry's core `Roll` class to count 6s, 1s (Void Flares), and hits above the Operator's Risk threshold.
* **Localization:** Mapping hardcoded strings to `lang/en.json` from the start.

## 4. Prioritized Feature List (Development Backlog)

### Phase 1: Core Foundation (Current)
- [x] Establish Folder Structure
- [x] Read Rules from Obsidian Vault
- [x] Define `template.json` for Actors and Items
- [ ] Set up basic Handlebars templates for Operative and NPC sheets
- [ ] Setup base styling (CSS/Less) to look like a modern Sci-Fi interface

### Phase 2: Game Logic & Dice
- [ ] Implement custom Dice rolling dialog (prompt for Risk, SPIKE, ASSIST, PUSH)
- [ ] Implement core Hit resolution (counting successes, interpreting SPARK, SURGE, NOVA, GLITCH)
- [ ] Implement Void Flare triggers (1s and 6s in Void-Tainted zones)

### Phase 3: Modularity & Content
- [ ] Implement Drag & Drop for "Cards" (Abilities, Traits, Gear) onto the character sheet
- [ ] Build specific item sheets for Abilities with their Surge/Nova effects
- [ ] Add tracking for specific Blueprint resources (Momentum, Heat, Resonance, Gambit Marks)

### Phase 4: Polish & Advanced Modules
- [ ] Implement Compendium packs for initial Abilities, Weapons, and Traits from the rules
- [ ] Optional Module: Dice So Nice! integration for custom d6 skins
- [ ] Optional Module: Automated macros for complex Moves like "NUKEM" or "ZERO DAY"
