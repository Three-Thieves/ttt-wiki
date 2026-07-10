---
title: Doors
icon: material/door-open
---

# :material-door-open: Doors

Doors are one of the most common places where map I/O shows up. A door might be a normal player-use door, a locked traitor room entrance, a button-driven sliding wall, or a paired double door that needs both sides to move together.

## Which Door Setup To Use

<div class="grid cards" markdown>

-   __[:material-rotate-3d-variant:{ .lg .middle } TTT Rotating Door](#ttt-rotating-door)__

    ---

    A hinged door, panel, shutter, or trap that rotates open with I/O

-   __[:material-door-sliding:{ .lg .middle } Sliding door](#sliding-doors)__

    ---

    A two-position door built with `TTT Linear Mover`

</div>

---

## :material-door-open: Doors are usually simple

Use the simplest door setup that fits the room. If a door only needs to be opened by players and does not need TTT map I/O, locking, partnering, reset behavior, or custom button control, it usually does not need to be built as a TTT movement tool.

!!! tip "Use our tools when the door is part of TTT logic"
    Use `TTT Rotating Door` or `TTT Linear Mover` when the door needs I/O inputs- if it needs to be controlled by our buttons, role buttons, triggers, timers, or other TTT logic. Otherwise, the s&box native `Door` component will work. 
    
    Both `TTT Rotating Door` and `TTT Linear Mover` are generally compatible with games that make use of the native [IPressable](https://sbox.game/api/Sandbox.Component.IPressable), so any games using it should be compatible to some degree, networking differences notwithstanding... We can't guarantee full behavior on other games, though, just player input. Long and short, be aware that **using our I/O components does not guarantee your map's compatibility with all other games on the platform**.

## :material-rotate-3d-variant: TTT Rotating Door

!!! info ""
    `TTT Rotating Door` rotates an object from its authored closed position to a target rotation. Usually this is a door, but despite its name, this is also a generically applicable "Rotate this object this much" component. It's the choice for hinged doors, double doors, rotating wall panels or shutters, rotating traps... rotating things.

### Setup

1. Create a `GameObject` for the door.
2. Add the visible model and make sure it has solid collision.
3. Add the `TTT Rotating Door` component.
4. Set `Target Rotation` for how far the door should rotate from its closed position.
5. Set `Open Duration` and `Close Duration` if the default speed is not right.
6. Test it from both sides and after a round reset.

### Pivot Setup

If the model origin is already on the hinge, the default pivot may be enough. If not, create a helper `GameObject` at the hinge and assign it as `Pivot Target`. The door captures that helper's world position and uses it as the hinge.

You can also edit the fallback `Pivot` value directly in local space, but a helper object is usually easier to understand visually if it is needed.

### Useful Options

| Option | Use |
| --- | --- |
| `Allow Direct Use` | Lets players press the door directly. This is enabled by default for rotating doors. |
| `Direct Use Mode` | Chooses whether direct use should `Activate` or `Toggle` the door. |
| `Open Away From Activator` | Opens away from the player or signal activator when possible. |
| `Starts Open` | Starts open on round start or map reset. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `Auto Reset` / `Reset Time` | Automatically closes after opening. |
| `Partner Object` / `Partner Name` | Mirrors open, close, toggle, lock, and unlock actions to another rotating door. Useful for double doors. |
| Opening and closing fields | Control movement duration, curves, and sounds for open and close travel. |

### Inputs

| Input | Behavior |
| --- | --- |
| `Open` / `Start` | Opens the door. |
| `Close` / `Stop` | Closes the door. |
| `Activate` | Opens the door when closed. If `Auto Reset` is disabled, it can also close an open door. |
| `Toggle` | Flips between open and closed. |
| `Lock` / `Unlock` | Prevents or allows future activation. |

Leave a map link input blank when the sender's default `Activate` behavior is enough. Set the input only when you need a specific command, such as `Toggle` or `Unlock`.

## :material-door-sliding: Sliding Doors

!!! info ""
    Sliding doors are built with `TTT Linear Mover`. Use this for doors, panels, bars, gates, trap covers, and other two-position objects that move in a straight line.

### Setup

1. Create a `GameObject` for the moving door.
2. Add the visible model and make sure it has solid collision.
3. Add the `TTT Linear Mover` component.
4. Set `Move Delta` to the local-space offset from closed to open.
5. Set `Open Duration` and `Close Duration` if needed.
6. Enable `Allow Direct Use` only if players should press the door itself.

`Move Delta` is evaluated in the mover's local space. The model pivot does not need to sit on an edge like a rotating door pivot does.

### Useful Options

| Option | Use |
| --- | --- |
| `Move Delta` | Local-space movement from the authored closed position to the open position. |
| `Allow Direct Use` | Lets players press the mover directly. This is disabled by default for linear movers. |
| `Direct Use Mode` | Chooses whether direct use should `Activate` or `Toggle` the mover. |
| `Starts Open` | Starts in the moved/open position on round start or map reset. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `Auto Reset` / `Reset Time` | Automatically closes after opening. |
| `Partner Object` / `Partner Name` | Mirrors open, close, toggle, lock, and unlock actions to another linear mover. Useful for paired sliding doors. |
| Opening and closing fields | Control movement duration, curves, and sounds for open and close travel. |

### Inputs

| Input | Behavior |
| --- | --- |
| `Open` / `Start` | Moves to the open position. |
| `Close` / `Stop` | Moves to the closed position. |
| `Activate` | Opens when closed. If `Auto Reset` is disabled, it can also close when open. |
| `Toggle` | Flips between open and closed. |
| `Lock` / `Unlock` | Prevents or allows future activation. |

For a more general explanation of two-position moving objects, see [Linear Movers](linear-movers.md).

---

## :material-source-branch: Common Patterns

| Pattern | Wiring |
| --- | --- |
| Player-use hinged door | `TTT Rotating Door` with `Allow Direct Use` enabled. |
| Button opens a locked door | Button output to the door with input `Open`; another output can send `Unlock` first if needed. |
| Toggle button controls a sliding door | Button output to a `TTT Linear Mover` with input `Toggle`. |
| Double rotating doors | Set each door's partner directly, or use `Partner Name` when direct references are inconvenient. |
| Elevator door or multi-stop platform | Use [Elevators and Path Movers](elevators.md) instead of trying to chain several binary movers together. |

