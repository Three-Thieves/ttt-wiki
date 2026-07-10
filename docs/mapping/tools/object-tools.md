---
title: Object Tools
icon: material/package-variant
---

# :material-package-variant: Object Tools

Object tools create, detect, or consume physical objects through map I/O. Use them for secret rewards, puzzle turn-ins, traitor traps, prop sacrifices, item dispensers, and map events that care about props being placed into a volume.

## Tools On This Page

<div class="grid cards" markdown>

-   __[:material-plus-circle:{ .lg .middle } Object Spawner](#object-spawner)__

    ---

    Spawns a selected weapon or prefab when activated

-   __[:material-delete:{ .lg .middle } Object Sink](#object-sink)__

    ---

    Detects or consumes tagged props that enter a trigger volume

</div>

---

## :material-plus-circle: Object Spawner { #object-spawner }

`TTT Object Spawner` creates a weapon or prefab when activated by map I/O. It is meant for authored rewards and events, not normal round loot placement.

### Setup

1. Add `TTT Object Spawner` at the spawn location.
2. Choose `Spawn Kind`.
3. For `Weapon`, select the weapon and optional ammo count.
4. For `Prefab`, assign the prefab to clone. You can use a `GameObject` in the scene, too.
5. Decide whether it should be `One Shot`, locked, or reusable through `Reset`.
6. Wire a button, role button, trigger, or logic output to activate it.

### Spawn Kinds

| Kind | Use |
| --- | --- |
| `Weapon` | Spawns a specific TTT weapon and optional matching ammo. |
| `Prefab` | Clones a prefab or `GameObject`. If it clones a prop, it'll set it up as a normal loose prop if there isn't any extra logic attached. |

### Useful Options

| Option | Use |
| --- | --- |
| `Start Asleep` | Spawned pickups and prop rigidbodies start asleep. Useful for... "stable", floating reward placement. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `One Shot` | Creates only one object per round/reset unless reset. Enabled by default. |
| `Targets On Spawned` | Fires after a successful spawn. |

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Activate` / `Start` / `Press` / `Toggle` | Attempts to spawn the selected object. |
| `Lock` / `Unlock` | Prevents or allows activation. |
| `Reset` | Clears one-shot spawned state. |

| Output | Use |
| --- | --- |
| `Targets On Spawned` | Fires after the object is successfully created. |

!!! warning "Do not use this for normal map loot"
    Normal weapon, ammo, and grenade placement belongs in [Spawns](../basics/spawns.md). `TTT Object Spawner` is for map events that create something on demand, like a secret knife easter egg or a gun vending machine.

---

## :material-delete: Object Sink { #object-sink }

`TTT Object Sink` detects or consumes matching props that enter its trigger volume. Use it for prop puzzles, disposal machines, offering/sacrifice traps, item turn-ins, and objectives that count delivered objects.

### Setup

1. Add a trigger volume where props should be detected or consumed.
2. Add `TTT Object Sink`.
3. Choose `Action`.
4. Set `Required Tags` to the prop tag or tags that should be accepted.
5. Add those tags to the props that should count.
6. Wire `Targets On Consumed` or `Targets On Detected` to a receiver, such as a logic counter or enable target.
7. Test with held props, thrown props, and props dropped into the volume.

!!! warning "Required Tags are required"
    If `Required Tags` is empty, the sink matches nothing. This prevents accidental map-wide prop deletion or detection.

### Useful Options

| Option | Use |
| --- | --- |
| `Action` | `Consume` destroys matching props. `Detect Only` leaves matching props alone and only fires output once per prop per reset. |
| `Required Tags` | Props must have at least one of these tags to be detected or consumed. |
| `Require All Tags` | Requires every listed tag instead of any one tag. |
| `Targets On Consumed` | Fires whenever a matching prop is consumed. Payload is the consumed count for this round. |
| `Targets On Detected` | Fires whenever a matching prop is detected in `Detect Only` mode. Payload is the detected count for this round. |

### Outputs

| Output | Use |
| --- | --- |
| `Targets On Consumed` | Fires once per consumed prop. Payload is `1`, `2`, `3`, and so on for the current round. |
| `Targets On Detected` | Fires once per matching prop in `Detect Only` mode. Payload is `1`, `2`, `3`, and so on for the current round. |

### Common Patterns

| Pattern | Wiring |
| --- | --- |
| Three props open a door | Sink `Targets On Consumed` to a `TTT Logic Counter`; counter target count 3; counter reached output opens door. |
| Prop detector | Set `Action = Detect Only`; wire `Targets On Detected` to the event that should happen when the prop is placed. |
| Disposal chute sound | Sink `Targets On Consumed` to an enable target or sound receiver. |
| Traitor trap cleanup | Sink consumes tagged props and fires an effect or explosion after enough objects are delivered. |

## :material-check-circle: Testing Checklist

- Test with the exact prop tags expected by the sink.
- Confirm untagged props do not get detected or consumed.
- Test props while held, thrown, dropped, and resting inside the volume.
- Check the detected or consumed count payload if it drives a counter or display.
- Run a round reset and make sure one-shot spawners and sink counts reset cleanly.
