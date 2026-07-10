---
title: Linear Movers
icon: material/swap-vertical
---

# :material-swap-vertical: Linear Movers

`TTT Linear Mover` moves one object between two positions: the authored rest position and a local-space offset. It is the general-purpose tool behind sliding doors, lifts, moving panels, shutters, bars, traps, and other two-state movement.

## When To Use It

<div class="grid cards" markdown>

-   __[:material-door-sliding:{ .lg .middle } Sliding doors](doors.md#sliding-doors)__

    ---

    A door or gate that opens by moving straight sideways, upward, or downward

-   __[:material-swap-vertical:{ .lg .middle } Two-position movers](#two-position-movers)__

    ---

    Platforms, shutters, panels, covers, lifts, and traps with one closed and one open position

</div>

!!! question "Need more than two positions?"
    If the object needs named stops, call/send-away buttons or a more specific route through space, use [Path Movers](elevators.md) instead.

---

## :material-swap-vertical: Two-Position Movers

### Setup

1. Create a `GameObject` for the moving object.
2. Add the visible model and make sure it has solid collision if players or props should collide with it.
3. Add the `TTT Linear Mover` component.
4. Set `Move Delta` to the local-space offset from the authored position to the moved position.
5. Set `Open Duration` and `Close Duration` if the default timing is not right.
6. Wire buttons, role buttons, triggers, or other senders to the mover if it should be controlled by map I/O.

### Move Delta

`Move Delta` is local to the mover's transform. A value of `0, 0, 128` moves along the mover's local up direction, not always the world's up direction. This is useful when the object is rotated, but it can be confusing if the mover's local axes are not what you expect.

!!! tip "Author the closed position"
    Place the object where it should be when closed or inactive, then set `Move Delta` toward the open or active position. That makes reset behavior easier to reason about.

### Direct Use

`Allow Direct Use` controls whether players can press the mover directly. This is disabled by default for linear movers because many of them are meant to be driven by buttons, triggers, or role buttons instead of being pressed like a normal door.

`Direct Use Mode` controls whether direct use behaves like `Activate` or `Toggle`.

### Useful Options

| Option | Use |
| --- | --- |
| `Move Delta` | Local-space offset from the authored rest position to the moved/open position. |
| `Allow Direct Use` | Lets players press the mover directly. |
| `Direct Use Mode` | Chooses whether direct use should `Activate` or `Toggle` the mover. |
| `Starts Open` | Starts at the moved/open position on round start or map reset. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `Auto Reset` / `Reset Time` | Automatically closes after opening. |
| `Partner Object` / `Partner Name` | Mirrors open, close, toggle, lock, and unlock actions to another linear mover. |
| Opening and closing fields | Control movement duration, curves, and sounds for open and close travel. |

## :material-source-branch: Inputs

| Input | Behavior |
| --- | --- |
| `Open` / `Start` / `GoTop` | Moves to the moved/open position. |
| `Close` / `Stop` / `GoBottom` | Moves back to the authored closed position. |
| `Activate` | Opens when closed. If `Auto Reset` is disabled, it can also close when open. |
| `Toggle` | Flips between open and closed. |
| `Lock` / `Unlock` | Prevents or allows future activation. |

Leave a map link input blank when the sender's default `Activate` behavior is enough. Set the input when the receiver needs a specific command, such as `Toggle`, `Open`, `Close`, `Lock`, or `Unlock`.

## :material-tools: Common Patterns

| Pattern | Setup |
| --- | --- |
| Sliding door | `TTT Linear Mover` on the door object, `Move Delta` along the slide direction. |
| Trap panel | Drive the mover with a role button or trigger and use `Auto Reset` if it should close again. |
| Paired doors | Set `Partner Object` or `Partner Name` so both halves mirror the same action. |
| One-floor lift | Use a linear mover if it only has two positions. Use a path mover if it needs call buttons or more stops. |
| Logic-only blocker | Use a simple invisible collider on the moving object if the visual movement is handled elsewhere. |

## :material-check-circle: Testing Checklist

- Confirm the local direction of `Move Delta` in-game.
- Test every button, trigger, or role button that drives the mover.
- Test locked and unlocked states if the mover can be locked.
- Run a round reset and make sure the mover returns to its intended starting state.
- Check what happens when a player or prop blocks the mover.
