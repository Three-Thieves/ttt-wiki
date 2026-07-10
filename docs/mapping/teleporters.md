---
title: Teleporters
icon: material/call-split
---

# Teleporters

Teleporters move players from a trigger volume to a destination object or destination name. They are useful for traitor traps, shortcuts, secret exits, and map events.

## Basic pattern

1. Place the destination object where players should arrive.
2. Give the destination a stable name, such as `teleport_traitor_exit`.
3. Add `TTT Trigger Teleport` to the trigger volume.
4. Set the destination reference or destination name.
5. Test the teleporter with one player and with several players entering close together.

## Safety checklist

- Keep destinations clear of walls, ceilings, props, and kill volumes.
- Face the destination in the direction players should look after arrival.
- Decide whether the teleporter should preserve velocity or reset movement.
- Test blocked destinations so players are not trapped or crushed.
- Verify the teleporter resets correctly between rounds.

!!! note "Migration scaffold"
    This page is ready for exact teleporter component settings, screenshots, and worked examples from the previous wiki.
