---
title: Triggers
icon: material/select-all
---

# :material-select-all: Triggers

Triggers are volumes that react when players or objects enter, leave, or stay inside them. Use them for sensors, teleporters, push volumes, automatic doors, map events, and trap setup.

This page covers general-purpose triggers. Damage volumes are covered in [Damage and Breakables](damage-and-breakables.md).

## Trigger Tools

<div class="grid cards" markdown>

-   __[:material-select-all:{ .lg .middle } Trigger Box](#trigger-box)__

    ---

    A general sensor volume that fires outputs based on occupancy

-   __[:material-swap-horizontal-hidden:{ .lg .middle } Trigger Teleport](#trigger-teleport)__

    ---

    Moves players to a destination object or named destination

-   __[:material-weather-windy:{ .lg .middle } Trigger Push](#trigger-push)__

    ---

    Pushes players, props, ragdolls, and debris while they are inside

</div>

---

## :material-cog: Shared Trigger Behavior

Most trigger tools have the same state controls.

| Option | Use |
| --- | --- |
| `Starts Active` | Starts active on round start or reset. Inactive triggers ignore occupancy behavior. |
| `Starts Locked` | Starts locked and ignores `Start`, `Toggle`, and `Activate` until it receives `Unlock`. |
| `Activate Mode` | Controls what `Activate` does: enable, toggle, or timed enable. |
| `Activate Duration Seconds` | Duration for timed activation. |

| Input | Behavior |
| --- | --- |
| `Start` / `Open` | Turns the trigger active. |
| `Stop` / `Close` | Turns the trigger inactive. |
| `Activate` | Uses `Activate Mode`. |
| `Toggle` | Flips between active and inactive. |
| `Lock` / `Unlock` | Prevents or allows activation. |

!!! tip "Start active is normal"
    Most trigger volumes should start active. Disable `Starts Active` when a trap, timed event, or button should arm the trigger first.

---

## :material-select-all: Trigger Box { #trigger-box }

`TTT Trigger Box` is the basic sensor volume. It does not do anything by itself except report occupancy through outputs.

### Setup

1. Add a `GameObject` where the volume should be.
2. Add `TTT Trigger Box`.
3. Resize the trigger `BoxCollider` to cover the area.
4. Set occupant filters only if the defaults do not match your use case.
5. Wire occupancy outputs to doors, enable targets, counters, traps, or other receivers.

### Outputs

| Output | Use |
| --- | --- |
| `Targets On Entered` | Fires when a valid occupant enters while the trigger is active. |
| `Targets On Exited` | Fires when a valid occupant exits while the trigger is active. |
| `Targets On Occupied` | Fires when the trigger becomes occupied. |
| `Targets On Empty` | Fires when the last valid occupant leaves. |
| `Targets On Activated` / `Targets On Deactivated` | Fires when the trigger starts or stops being active. |
| `Targets On Locked` / `Targets On Unlocked` | Fires when the trigger is locked or unlocked. |

### Common Patterns

| Pattern | Wiring |
| --- | --- |
| Trigger opens a door | `Targets On Occupied` to a door with `Open`; `Targets On Empty` with `Close`. |
| Trigger turns on a light | `Targets On Entered` to an enable target with `Start`; `Targets On Empty` with `Stop`. |
| Trigger increments a counter | `Targets On Entered` to a logic counter with blank input or `Increment`. |

---

## :material-swap-horizontal-hidden: Trigger Teleport { #trigger-teleport }

`TTT Trigger Teleport` moves living players from a trigger volume to a destination object or destination name. It is useful for traitor traps, shortcuts, secret exits, and map events.

### Setup

1. Place the destination object where players should arrive.
2. Face the destination in the direction players should look after arrival.
3. Add `TTT Trigger Teleport` to the trigger volume.
4. Assign `Destination Object`, or set `Destination Name` when direct references are inconvenient.
5. Test with one player and with several players entering close together.

### Useful Options

| Option | Use |
| --- | --- |
| `Destination Object` | Direct destination reference. Best when available. |
| `Destination Name` | Name fallback for Hammer-style authoring or awkward direct references. |
| `Randomize Named Matches` | Randomly chooses between matching destination names. |
| `Use Destination Rotation` | Makes players face the destination object's forward direction. |
| `Reentry Cooldown Seconds` | Prevents chained teleporters from immediately bouncing the same player back and forth. |

### Outputs

| Output | Use |
| --- | --- |
| `Targets On Teleported` | Fires after a player is successfully teleported. |
| `Targets On Teleport Failed` | Fires when the destination is missing or placement is blocked. |

!!! warning "Keep destinations clear"
    Teleporters try to place players safely. If the destination is blocked by walls, ceilings, props, or another bad placement, the teleport can fail instead of trapping the player.

---

## :material-weather-windy: Trigger Push { #trigger-push }

`TTT Trigger Push` applies force while valid occupants are inside the volume. Use it for vents, fan traps, jump pads, low-gravity flows, river currents, and prop pushers.

### Setup

1. Add `TTT Trigger Push` to a trigger volume.
2. Rotate the volume so its local push direction points the way you want.
3. Set `Direction`, `Acceleration`, and `Max Speed`.
4. Adjust occupant filters if the push should affect only players or only objects.
5. Test as both host and client if the push is player-facing.

### Useful Options

| Option | Use |
| --- | --- |
| `Direction` | Local-space direction to push. Rotating the volume rotates this direction too. |
| `Acceleration` | Force added over time while an occupant stays inside. |
| `Max Speed` | Maximum speed along the push direction. Sideways velocity is preserved. |
| `Allow Crouch Descend` | Lets crouching players slowly descend through mostly upward push volumes. |
| `Crouch Descend Max Speed` | Descent speed when crouch-descend is enabled. |
| `Clear Ground When Pushing` | Helps upward/vent pushes lift grounded players reliably. |

!!! tip "Push is continuous"
    A push trigger is not a one-frame launch. It keeps accelerating valid occupants while they remain inside the active volume, up to `Max Speed` along the push direction.

## :material-check-circle: Testing Checklist

- Confirm the trigger volume is the size and orientation you expect.
- Test enter, exit, occupied, and empty behavior separately when using several outputs.
- Test trigger activation, locking, and round reset if the trigger can be armed or disabled.
- For teleporters, test blocked or crowded destinations.
- For push volumes, test from the ground, in mid-air, and while carrying or throwing props.
