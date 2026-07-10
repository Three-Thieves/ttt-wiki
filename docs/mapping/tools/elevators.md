---
title: Elevators and Path Movers
icon: material/elevator
---

# :material-elevator: Elevators and Path Movers

Use path movers for elevators, trains, moving platforms, scripted lifts, and anything that needs more than a closed position and an open position. A path mover follows a `TTT Path Track`, and the track is made from `TTT Path Point` stops.

## Path Tool Pieces

<div class="grid cards" markdown>

-   __[:material-map-marker-path:{ .lg .middle } TTT Path Track](#ttt-path-track)__

    ---

    Owns the route and gathers the path points

-   __[:material-map-marker:{ .lg .middle } TTT Path Point](#ttt-path-point)__

    ---

    Marks a stop, waypoint, or named elevator floor

-   __[:material-elevator:{ .lg .middle } TTT Path Mover](#ttt-path-mover)__

    ---

    Moves the platform, elevator, train, or object along the route

-   __[:material-cursor-default-click:{ .lg .middle } Buttons](#buttons)__

    ---

    Send the mover to a stop or call it like an elevator

</div>

---

## :material-map-marker-path: TTT Path Track { #ttt-path-track }

!!! info ""
    `TTT Path Track` is the route owner. It finds the `TTT Path Point` components that belong to it and turns them into the path a mover can follow.

### Setup

1. Create an empty `GameObject` for the path track.
2. Add `TTT Path Track`.
3. Add `TTT Path Point` objects as children, or give the points a matching `Track Name`.
4. Choose `Shape Mode`: `Linear` for straight segments or `Spline` for curved movement.
5. Enable `Closed Loop` only when the last point should connect back to the first.

Path points are easiest to manage as children of the track object. When direct hierarchy or references are inconvenient, `Track Name` and stable point names can be used instead, but we suggest having everything neatly under one `GameObject` as children of it.

## :material-map-marker: TTT Path Point { #ttt-path-point }

!!! info ""
    `TTT Path Point` marks a place the mover can travel to. For an elevator, each point is usually a floor or stop.

### Setup

1. Create one `GameObject` for each stop or waypoint.
2. Add `TTT Path Point` to each one.
3. Give important stops a stable `Point Name`, such as `basement`, `lobby`, or `roof`.
4. Set `Order` if hierarchy order is not enough.
5. Use `Is Stop` and `Wait Seconds` when the mover should pause at that point.

`Point Name` is what `GoTo` and `CallOrDepart` payloads usually target. If `Point Name` is empty, the point can fall back to its `GameObject` name.

### Departure Targets

`Departure Target` and `Departure Target Name` are used by `CallOrDepart`. They tell the mover where to go when it is already sitting at the point that called it.

On a two-point track, this is automatic: if the mover is already at one point, `CallOrDepart` sends it to the other point. On tracks with three or more points, set a departure target for each call point that should send the mover somewhere specific.

## :material-elevator: TTT Path Mover { #ttt-path-mover }

!!! info ""
    `TTT Path Mover` goes on the object that actually moves: the elevator platform, train car, lift, bridge, or moving set piece.

### Setup

1. Create the moving platform or object.
2. Add the visible model and collision it needs.
3. Add `TTT Path Mover`.
4. Assign `Track` directly or set `Track Name` to the path track object's name.
5. Set `Start Point` if it should begin at a specific point. Ideally, it is placed at the starting point in the map already.
6. Set `Move Speed` and `Movement Curve`.
7. Wire buttons, role buttons, triggers, or logic to the mover.

### Useful Options

| Option | Use |
| --- | --- |
| `Track` / `Track Name` | The path track this mover should follow. Use direct references when available, or names when needed. |
| `Start Point` | Optional point name or zero-based index where the mover starts. |
| `Traversal Mode Setting` | Controls whether movement is manual, one-shot, looping, ping-pong, or reset-after-fire. |
| `Move Speed` | Travel speed in units per second. |
| `Movement Curve` | Curve used while moving between points. |
| `Spline Rotation` / `Spline Rotation Offset` | Controls how the mover rotates while following spline paths. |
| `Queue Requested Stops` | Queues `GoTo`, `CallOrDepart`, `Next`, and `Previous` requests while already moving. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `Start Active` | Begins autonomous traversal on start/reset when using a non-manual traversal mode. |

### Traversal Modes

| Mode | Behavior |
| --- | --- |
| `Manual` | Waits for inputs such as `GoTo`, `CallOrDepart`, `Next`, or `Previous`. Best for elevators. |
| `Once` | Runs through the path once when started. |
| `Loop` | Repeats the path. Use `Closed Loop` on the track when the last point should connect to the first. |
| `PingPong` | Moves forward and backward along the path. |
| `ResetAfterFire` | Runs, then returns to the starting point after firing. |

### :material-cursor-default-click: Buttons { #buttons }

Buttons usually drive elevators with either `GoTo` or `CallOrDepart`.

For a button that always sends the platform to one stop:

```text
Input   = GoTo
Payload = roof
```

For an elevator call/send-away button:

```text
Input   = CallOrDepart
Payload = lobby
```

`Payload` should be a point name or a zero-based point index. Names are easier to read and safer to maintain.

!!! tip "CallOrDepart"
    Use `CallOrDepart` for elevator-style buttons. If the platform is away, it comes to the requested point. If it is already idle at that point, it departs to that point's departure target.

## :material-source-branch: Inputs And Outputs

### Inputs

| Input | Behavior |
| --- | --- |
| `GoTo` | Sends the mover to the point named by `Payload`, or to a zero-based point index. |
| `CallOrDepart` | Elevator-style call/send-away behavior using `Payload`. |
| `Next` / `Previous` | Moves to a neighboring path point. |
| `Start` / `Activate` / `Toggle` | Starts movement according to the traversal mode. |
| `Stop` / `Reset` | Stops movement or returns to the start. |
| `Pause` / `Resume` | Pauses or resumes movement. |
| `Reverse` | Reverses travel direction. |
| `Lock` / `Unlock` | Prevents or allows future movement requests. |

### Outputs

| Output | Use |
| --- | --- |
| `Targets On Started` | Fires when a movement request begins. |
| `Targets On Stopped` | Fires when movement is stopped. |
| `Targets On Paused` / `Targets On Resumed` | Fires when the mover pauses or resumes. |
| `Targets On Point Reached` | Fires whenever a path point is reached. Payload is the point name or index. |
| `Targets On Completed` | Fires when an explicit request or finite autonomous traversal completes. |
| `Targets On Locked` / `Targets On Unlocked` | Fires when the mover is locked or unlocked. |
| Path point `Targets On Arrived` | Fires from the path point when that point is reached. |

## :material-tools: Common Patterns

| Pattern | Setup |
| --- | --- |
| Two-floor elevator | Two path points, one path mover, floor buttons using `CallOrDepart`. |
| Multi-floor elevator | One path point per floor, each with a stable point name and departure target where needed. |
| Train or tram | Path mover on the vehicle, path points along the route, traversal mode set to `Once`, `Loop`, or `PingPong`. |
| Moving platform trap | Button or trigger sends `GoTo` or `Start`; outputs can fire effects when points are reached. |
| Zipline or slide | Uses the same path family, but the player-ride setup belongs with movement basics rather than elevator setup. |

## :material-check-circle: Testing Checklist

- Confirm every point name used by a button payload is spelled exactly as authored.
- Test every call button while the mover is idle, moving, and already at the caller's point.
- For tracks with three or more points, confirm `Departure Target` or `Departure Target Name` is set where `CallOrDepart` needs it.
- Make sure the platform has the collision players and props need.
- Test with multiple players standing on or near the platform.
- Run a round reset and confirm the mover returns to its intended start point and lock state.

