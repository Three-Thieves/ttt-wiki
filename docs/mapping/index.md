---
title: Mapping
icon: material/map
---

# :material-map: Mapping

This section is for creators who want to make a new TTT map, add TTT support to an existing map they made, or build custom map interactions with our mapping tools on s&box.

## Start Here

<div class="grid cards" markdown>

-   __[:material-hammer:{ .lg .middle } Basics](basics/index.md)__

    ---

    Basic setup, editor testing, publishing

-   __[:material-walk:{ .lg .middle } Player Specs](basics/player-values.md)__

    ---

    Sizes and speeds of the player and their baseline movement capabilities

-   __[:material-map-marker-plus:{ .lg .middle } Spawns](basics/spawns.md)__

    ---

    Player & weapon spawns

-   __[:material-magnet-on:{ .lg .middle } Props](basics/props.md)__

    ---

    Adjust prop behavior for your needs

-   __[:material-transit-connection-variant:{ .lg .middle } Movement](basics/movement.md)__

    ---

    Movement types and traversal helpers

-   __[:material-source-branch:{ .lg .middle } I/O](basics/io.md)__

    ---

    Input/Output wiring concepts

</div>

## Mapping Tools

<div class="grid cards" markdown>

-   __[:material-tools:{ .lg .middle } Tools Overview](tools/index.md)__

    ---

    Pick the right tool before you start wiring things together

-   __[:material-cursor-default-click:{ .lg .middle } Buttons and Role Buttons](tools/buttons.md)__

    ---

    Player-use controls and role-gated trap controls

-   __[:material-badge-account:{ .lg .middle } Role Testers](tools/role-testers.md)__

    ---

    Role checking rooms, indicators, and tester outputs

-   __[:material-source-branch:{ .lg .middle } State and Logic](tools/state-and-logic.md)__

    ---

    Enable targets, disable targets, and count signals

-   __[:material-door-open:{ .lg .middle } Doors](tools/doors.md)__

    ---

    Rotating doors, sliding doors, and door control patterns

-   __[:material-swap-vertical:{ .lg .middle } Linear Movers](tools/linear-movers.md)__

    ---

    Two-position moving objects

-   __[:material-elevator:{ .lg .middle } Elevators and Path Movers](tools/elevators.md)__

    ---

    Multi-stop platforms, elevators, and call buttons

-   __[:material-slide:{ .lg .middle } Ziplines and Slides](tools/ziplines-and-slides.md)__

    ---

    Player ride paths for ziplines and slides

-   __[:material-select-all:{ .lg .middle } Triggers](tools/triggers.md)__

    ---

    Trigger boxes, teleports, and push volumes

-   __[:material-alert:{ .lg .middle } Damage and Breakables](tools/damage-and-breakables.md)__

    ---

    Hurt volumes, break outputs, damage surfaces, and glass

-   __[:material-barrel:{ .lg .middle } Explosives](tools/explosives.md)__

    ---

    Explosive props, explosion targets, and barrels

-   __[:material-package-variant:{ .lg .middle } Object Tools](tools/object-tools.md)__

    ---

    Spawn or consume map objects

</div>

## Authoring checklist

- Add enough player spawns for the server sizes you expect (32+, ideally).
- Add enough weapon spawns to support a variety of player counts. Prefer random weapon and ammo spawners unless a map wants deliberately consistent placements.
- Name interactive targets clearly when wiring map I/O by name.
- Test map logic as both host and client if possible. Speeds, in particular, for different map components can behave a little differently when you're not the host- so in-editor the timing is right, but with a client instance it isn't.

!!! tip "Good map support is mostly predictable reset behavior"
    TTT maps are played over repeated rounds. Doors, traps, spawns, buttons, disabled objects, and moving platforms should return to a clean authored state every round.