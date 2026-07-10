---
title: Damage and Breakables
icon: material/alert-octagon
---

# :material-alert-octagon: Damage and Breakables

Damage tools let maps hurt players, turn props into dangerous surfaces, react when props break, and build breakable glass. Use them for hazards, traitor traps, glass rooms, breakable barriers, crushing props, and map logic that responds to destruction.

## Tools On This Page

<div class="grid cards" markdown>

-   __[:material-alert-octagon:{ .lg .middle } Trigger Hurt](#trigger-hurt)__

    ---

    A trigger volume that repeatedly damages valid targets inside it

-   __[:material-alert:{ .lg .middle } Prop Damage Surface](#prop-damage-surface)__

    ---

    A prop surface that damages players on contact

-   __[:material-source-branch:{ .lg .middle } Prop Break Output](#prop-break-output)__

    ---

    Fires map I/O when a prop breaks

-   __[:material-crop-landscape:{ .lg .middle } Breakable Glass](#breakable-glass)__

    ---

    Breakable glass panes and brush glass behavior

</div>

---

## :material-alert-octagon: Trigger Hurt { #trigger-hurt }

`TTT Trigger Hurt` damages valid occupants inside a trigger volume. Use it for kill zones, lasers, fire, acid, crushers, electrified rooms, and damage-over-time trap areas.

### Setup

1. Add a `GameObject` for the damage volume.
2. Add `TTT Trigger Hurt`.
3. Resize the trigger `BoxCollider` to cover the hazard area.
4. Set `Damage` and `Rate`.
5. Set `Starts Active`, `Starts Locked`, and `Activate Mode` if the hazard should be armed by map I/O.
6. Wire `Targets On Damaged` if another map event should happen when damage is applied.

### Useful Options

| Option | Use |
| --- | --- |
| `Include` / `Exclude` | Filters which targets can be damaged. Defaults are player-focused. |
| `Damage` | Damage per hit. |
| `Rate` | Seconds between repeated damage applications. Set to `0` to disable periodic damage. |
| `Damage Tags` | Tags forwarded into the damage pipeline for classification and corpse text. |
| `Active VFX` | Optional effect prefab that plays on the trigger volume while the hazard is active. |
| `On Damage VFX` | Optional effect prefab attached to each player when this trigger actually damages them. |
| `Starts Active` / `Starts Locked` | Controls whether the hazard starts armed and usable. |
| `Activate Mode` | Controls whether `Activate` enables, toggles, or temporarily enables the hazard. |

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Start` / `Open` | Turns the damage volume active. |
| `Stop` / `Close` | Turns the damage volume inactive. |
| `Activate` | Uses `Activate Mode`. |
| `Toggle` | Flips active/inactive state. |
| `Lock` / `Unlock` | Prevents or allows activation. |

| Output | Use |
| --- | --- |
| `Targets On Damaged` | Fires whenever the trigger applies damage to a target. |
| State outputs | Inherited trigger outputs for activated, deactivated, locked, and unlocked state. |

!!! info "Trap ownership"
    If a player activates a hurt trigger through map I/O, the damage will be considered "theirs" and counts towards kill stats.

---

## :material-alert: Prop Damage Surface { #prop-damage-surface }

`TTT Prop Damage Surface` makes a prop dangerous when players touch it. Use it for spinning blades, moving knives, electrified props, crushing set pieces, and traps where the prop itself should be the damaging object.

!!! warning ":fontawesome-solid-hammer: Requires a GameObject prop"
    In Hammer, this setup needs an empty `GameObject` with the native `Prop` component and the model assigned there. A normal `prop_physics` only uses the model's data and cannot hold this component setup. See [advanced prop behavior](../basics/props.md#props-with-other-components).

### Setup

1. Add the damaging prop and make sure it is set up as a TTT prop.
2. Add `TTT Prop Damage Surface` to the prop.
3. Assign `Damage Collider` only if the collider should be something that is not the model of the prop. Experimental!
4. Set `Damage`, `Rate`, and `Damage Tags`. Set rate to 0 for "once per contact".
5. Wire map I/O if the surface should only become dangerous while a trap is active.


### Useful Options

| Option | Use |
| --- | --- |
| `Damage Collider` | Ignore this 99% of the time. Only assign this if you explicitly don't want the model to be the damaging surface for some reason; even then, it's usually a use case for `TTT Trigger Hurt`. |
| `Include` / `Exclude` | Filters which players can be damaged. |
| `Damage` | Damage applied on contact. `0` can suppress damage from the prop without adding new damage. |
| `Rate` | Cooldown before the same player can be damaged again. `0` means once per continuous contact. |
| `Damage Tags` | Tags forwarded into the damage pipeline. Player-activated surfaces automatically add a trap tag. |
| `Active VFX` | Optional effect prefab that plays on the prop while the surface is active. |
| `On Damage VFX` | Optional effect prefab attached to each player when this surface actually damages them. |

### Inputs

`TTT Prop Damage Surface` uses the same active/locked inputs as trigger state tools: `Start`, `Stop`, `Activate`, `Toggle`, `Lock`, and `Unlock`.

!!! tip "Use this for moving damage"
    If the hazard is a moving object that players touch, `TTT Prop Damage Surface` is usually a better fit than trying to move a separate hurt trigger around with it.

---

## :material-auto-fix: Damage VFX { #damage-vfx }

`TTT Trigger Hurt` and `TTT Prop Damage Surface` can both play optional visual effects. These fields are separate from the damage amount and damage tags so maps can show a hazard without changing how the damage is classified internally. 

### Active VFX

`Active VFX` plays on the hazard while it is active. Use it for visible source effects: an electrified pool volume, a sparking machine, a burning floor, or a dangerous moving prop.

For volume hazards, author the particle prefab around its the volume's shape. A box/other shaped particle emitter is usually what you'll want, because a trigger volume (typically) does not have visible model geometry for particles to attach to. For prop surfaces, either a model emitter or a hand-positioned effect can work, depending on whether the particles should follow the prop's rendered model or sit at a specific point. 

Active effects start and stop with the tool's active state. They are not timed by `Damage` or `Rate`.

### On Damage VFX

`On Damage VFX` spawns on the player who was damaged. This is best for short victim effects such as a jolt of electricity, flash, splatter, or a bit of fire burning.

For player-attached effects, a particle prefab with a `ModelEmitter` is usually the expected setup. The model emitter lets the effect attach to the player's body instead of appearing at a fixed point in the world, but you can do either depending on your need.


!!! warning "Particle timing is authored in the prefab"
    The effect only spawns when damage is actually applied. `Rate` affects how often a repeated hazard can damage the same target, but it **does not control how long the particle lives**.
    A damage tool decides when damage happens. The particle prefab decides how long the visual effect lasts. If an On Damage effect loops forever or has no temporary cleanup, it can remain on the player indefinitely after the damage tick that spawned it. Particle lifetime, looping, and cleanup come from the prefab itself.


### Damage Tags And Built-In Effects

Damage tags still mainly describe the kind of damage. They are used for damage classification, corpse text, logs, and other gameplay behavior. Usually not particularly important and can be left alone- we handle trap attribution internally.

One tag currently also has built-in victim VFX:

| Tag | Built-in victim VFX |
| --- | --- |
| `shock` | Plays the default player jolt effect. |

We'll be adding more of these in the future (like fire), this update was just taking way too long & needed to get published, lol. You can use `On Damage VFX` when a map needs a custom victim-local effect. If the same damage also uses the `shock` tag, the custom effect and the built-in jolt can both play, if that's something you want for some reason.

Putting `fire` in `Damage Tags` classifies the damage as fire, but it does not automatically add an afterburn or attached fire effect. Those visuals come from the fire and incendiary systems.

### Example Effect Prefabs

You can find these under `Assets/`.

| Prefab | Typical use |
| --- | --- |
| `items/primary/ump/effects/playerjolt.prefab` | Short player-attached shock effect. Best as On Damage VFX or automatic `shock` damage feedback. |
| `prefabs/particles/electricvolume.prefab` | This one is good reference for trigger volumes or persistent VFX while active sort of uses. |
| `prefabs/particles/fire.prefab` | Player or prop burn effect used by fire components. Kind of scuffed. |
| `items/grenades/incendiary/effects/incendiary_fire.prefab` | World fire effect used by incendiary grenades. |

---

## :material-source-branch: Prop Break Output { #prop-break-output }

`TTT Prop Break Output` fires map I/O when its prop breaks. Use it when destroying a prop should open a door, count a destroyed objective, trigger an alarm, or advance a map event.

### Setup

1. Add it to the prop that should report breaking.
2. Wire `Targets On Broken` to the receiver.
3. Make sure the prop can actually break.
4. Test the output after a round reset.

| Output | Use |
| --- | --- |
| `Targets On Broken` | Fires once when the prop breaks. The output resets between rounds. |

---

## :material-crop-landscape: Breakable Glass { #breakable-glass }

`TTT Breakable Glass` makes a glass object damageable, breakable, and resets it to its original state between rounds. It's usually added to a model- it can be on physics props, static props, static models, etc.

### Setup

1. Create the glass object with visible geometry and collision, usually a model. 
2. Add `TTT Breakable Glass`.
3. Set `Max Health`.
4. Leave `Can Break` enabled unless the pane should behave as unbreakable glass. Usually, it's better to just set a surface property to glass for cases like that.
5. Wire `Targets On Broken` if breaking the glass should trigger map logic.

### Hammer Brush Glass

Legacy-compatible glass. This can't be modified behaviorally- it breaks after receiving 40 damage, or 2 hits with a crowbar. Set it up by adding the `glass` tag on `func_brush`. That's it!

### Useful Options

| Option | Use |
| --- | --- |
| `Max Health` | Damage needed before the pane breaks. |
| `Can Break` | If disabled, the object is still treated as glass but ignores damage. |
| `Targets On Broken` | Fires once when the pane breaks. |

### Inputs

| Input | Behavior |
| --- | --- |
| `Activate` / `Start` / `Press` / `Toggle` | Breaks the glass if it can break and is not already broken. |

## :material-check-circle: Testing Checklist

- Confirm damage amount and timing in live play, not just by reading fields.
- Test hazards as both host and client when they affect player movement or collision.
- Check whether map I/O activation should make the damage count as a trap.
- Make sure break outputs fire once and reset between rounds.
- Test glass with bullets, explosions, melee, and map I/O if those are expected to break it.
