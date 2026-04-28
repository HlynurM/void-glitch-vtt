# VOID // GLITCH - Foundry VTT System

This is the official Foundry Virtual Tabletop (VTT) system for **VOID // GLITCH**, a tabletop RPG of dangerous operatives and shifting reality developed by Dark Roast Publishing.

## Features (In Development)
- Custom Action Engine for D6 Dice Pool mechanics.
- Vital Tracks management (Harm, Strain, Corruption).
- Automated Adversary Stages and Swarm Clocks.
- Controller Toolkit with Oracle and environment generation tables.

## Local Installation (Development)
If you are developing or testing this system locally:
1. Locate your Foundry VTT `Data/systems` directory.
2. Create a symlink pointing to the `/system` folder within this repository.
   ```bash
   # Example for macOS/Linux
   ln -s "/Path/To/This/Repo/VOID_GLITCH_VTT/system" "/Path/To/Your/FoundryVTT/Data/systems/void-glitch"
   ```
3. Ensure the symlink is named exactly `void-glitch`.
4. Restart Foundry VTT.

## Dependencies
This system strongly recommends the `global-progress-clocks` module for managing the various Complication, Swarm, and Cover clocks during gameplay.
