---
title: Doors and Elevators
icon: material/door-sliding
---

# :material-door-open: Doors and Elevators

Doors and elevators are built with mover components and are typically paired with buttons or other controls. The complexity involved for setup really depends on the use case. 

!!! info ""
    TTT's player can interact with s&box's native `Door` component for basic use. If you're more comfortable working with those, they're fine as standalone/paired doors around the map that players can walk up to and open or close. If you need more specific behavior like locks, button-activated or role-only doors, we have our own I/O compatible doors with a bit of additional functionality.  

## Choose the mover

| Goal | Component | Notes |
| --- | --- | --- |
| Sliding door, lift, or panel | `TTT Linear Mover` | Moves between a closed position and an offset. |
| Hinged door or rotating trap | `TTT Rotating Door` | Use a pivot helper when the object's origin is not at the hinge. |
| Elevator, train, or multi-stop platform | `TTT Path Mover` with `TTT Path Track` and `TTT Path Point` | Use named path points for call buttons and routing. |

## Door checklist

- Give the moving object a stable name if it will be targeted by buttons or triggers.
- Decide whether the door starts open, closed, locked, or role-gated.
- Wire buttons with `Open`, `Close`, `Toggle`, `Lock`, or `Unlock`.
- Test blocked movement and round reset behavior.

## Elevator checklist

- Build the path points first.
- Name each stop clearly, such as `floor_1`, `floor_2`, and `roof`.
- Link call buttons with the correct destination payload.
- Test players standing on the platform during movement.
- Verify the elevator resets to the intended floor between rounds.

!!! note "Migration scaffold"
    This page is ready for the older door and elevator tutorial content, screenshots, and exact component properties.
