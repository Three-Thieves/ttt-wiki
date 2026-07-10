---
title: Mapping Tools Overview
icon: material/tools
---

# Mapping Tools Overview

TTT mapping tools are small components added to map objects. Each component does one job: a button sends a signal, a mover moves, a trigger reacts to players, a spawner creates pickups, and so on. Larger map features come from combining those pieces.

## Component categories

| Editor category | Components | Typical use |
| --- | --- | --- |
| `Interaction/Buttons` | `TTT Button`, `TTT Role Button` | World buttons, hold buttons, toggles, traitor buttons, detective buttons. |
| `Interaction/State` | `TTT Enable Target` | Turn lights, sounds, particles, components, or object groups on and off. |
| `Movement/Binary` | `TTT Linear Mover`, `TTT Rotating Door` | Sliding doors, lifts, panels, hinged doors, and rotating traps. |
| `Movement/Path` | `TTT Path Mover`, `TTT Path Track`, `TTT Path Point` | Elevators, trains, multi-stop platforms, and path-based movement. |
| `Spawners` | Weapon, ammo, grenade, and random spawn markers | Round-resetting pickups. |
| `Triggers` | `TTT Trigger Box`, `TTT Trigger Hurt`, `TTT Trigger Push`, `TTT Trigger Teleport`, `TTT Trigger Role Tester` | Sensors, traps, launch pads, teleporters, and tester rooms. |

## Core ideas

### Map I/O signals

Most authored logic uses the same signal model:

1. A sender fires an output.
2. The output contains one or more map links.
3. Each map link finds a receiver by direct reference, object name, or tag.
4. The receiver gets an input such as `Activate`, `Open`, `Start`, `Stop`, `Toggle`, `Lock`, or `Unlock`.

### Reset between rounds

TTT maps reset between rounds. Doors, buttons, triggers, movers, role buttons, enable targets, and spawners should return to their authored baseline without rebuilding the whole scene.

### Stable names help wiring

When using `TargetName`, give target objects stable names such as `door_traitor_room`, `elevator_platform`, or `tester_light_green`. Name matching trims whitespace and is case-insensitive, but duplicate names should be intentional.

!!! warning "Do not switch map tools to object networking"
    Objects with TTT mapping tools should stay on the default snapshot networking path unless a specific tool page says otherwise.
