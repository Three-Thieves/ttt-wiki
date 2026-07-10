---
title: Explosives
icon: material/barrel
---

# :material-barrel: Explosives

Explosives are for barrels, traps, breakable bombs, and map-authored blast points. Use an explosive prop when the object itself should explode. Use an explosion target when a button, trigger, or other map event should create an explosion at a fixed point.

## Which Explosive Tool To Use

<div class="grid cards" markdown>

-   __[:material-barrel:{ .lg .middle } Explosive Props](#explosive-props)__

    ---

    A prop that can explode from damage or map I/O

-   __[:fontawesome-solid-bomb:{ .lg .middle } Explosion Targets](#explosion-targets)__

    ---

    A fixed explosion point activated by buttons, traps, or logic

-   __[:material-fire:{ .lg .middle } Generic Barrels](#generic-barrels)__

    ---

    Familiar barrel placement with standard TTT behavior

</div>

---

## :material-barrel: Explosive Props { #explosive-props }

There are a couple of different ways to make your prop explosive.

=== "Model Data"
    Simplest, most restrictive. Check the `Explosive` field on the model's `prop_data` and set the value. Be very wary when authoring it this way, we trust all of the data here- Force Scale, Radius and Damage are all up to you. You can take a peek at some references below to get an idea of what gameplay balancing looks like here.

=== "Explosive Prop Component"
    Most robust, a little more complex if meddled with a lot. `TTT Explosive Prop` allows for damage-activated explosives (like barrels or gas canisters) as well as I/O-activated explosives (like a traitor button on a bomb). There are a lot of options as far as damage, range and even effects- leaving most of it alone will use default TTT values.

=== "Generic Barrel Placement"
    If you would like, placing the Facepunch explosive barrel will automatically set them up the way they are on Three Thieves maps. These can't be adjusted behaviorally- they'll be the exact same damage, health, and radius every time. This is restrictive in some ways, but there are benefits to using them: 

    1. They're recognizably the explosive barrel from many other maps, so players know exactly what's going on when they see them. The more someone has played, the more they are intimately aware of their exact range and damage- so they can can interact with those dynamic and dangerous areas of your map with that tactical knowledge. 
    2. They're easy to use. Just place 'em and you're done.

### Setup

1. Create or place the prop that should explode.
2. Make sure it is a real TTT prop with collision and health.
3. Add `TTT Explosive Prop`.
4. Choose `Activation Mode`.
5. Leave damage, radius, force, and effect overrides alone unless the map needs different behavior.
6. Wire map I/O to the prop only if it should be activated by a button, trigger, or logic event.

### Useful Options

| Option | Use |
| --- | --- |
| `Activation Mode` | `DamageOrSignal` explodes when destroyed or signaled. `SignalOnly` ignores damage and waits for map I/O. |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `Health Override` | Overrides the prop's health. Leave at `-1` to use prop/model health. |
| `Damage Override` | Overrides explosion damage. Leave at `-1` to use the default. |
| `Radius Override` | Overrides explosion radius. Leave at `-1` to use the default. |
| `Force Scale Override` | Overrides explosion push force. Leave at `-1` to use the default. |
| `Affect Players` / `Affect Props` / `Affect Glass` | Controls what the explosion can damage or push. |
| `Attribute Activator As Attacker` | Lets player-activated explosive traps credit the activating player. |
| `Play Effects` | Plays explosion visuals and sound when it explodes. |

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Activate` / `Start` / `Press` / `Toggle` | Attempts to explode the prop. |
| `Lock` / `Unlock` | Prevents or allows future signal activation. |
| `Reset` | Restores the prop's explosive state for the round/reset flow. |

| Output | Use |
| --- | --- |
| `Targets On Exploded` | Fires after the prop explodes. |
| `Targets On Locked` / `Targets On Unlocked` | Fires when the explosive prop is locked or unlocked. |

---

## :fontawesome-solid-bomb: Explosion Targets { #explosion-targets }

`TTT Explosion Target` creates an explosion at the GameObject's position when activated. It is best for traitor traps, scripted blast events, map hazards, and effects where there is no physical explosive prop to damage first.

### Setup

1. Create an empty `GameObject` where the explosion should happen.
2. Add `TTT Explosion Target`.
3. Set `Radius`, `Base Damage`, and `Force Scale` if the defaults are not right.
4. Decide whether it should be `One Shot`, locked, or cooldown-limited.
5. Wire a button, role button, trigger, or logic output to activate it.

### Useful Options

| Option | Use |
| --- | --- |
| `Starts Locked` | Starts locked until it receives `Unlock`. |
| `One Shot` | Allows only one explosion per round/reset. |
| `Cooldown Seconds` | Minimum time between accepted activations. |
| `Radius` | Explosion radius in world units. |
| `Base Damage` | Damage before falloff, wall handling, and target modifiers. |
| `Force Scale` | Push force applied to affected targets. |
| `Occlusion Mode` | Controls whether walls block or reduce damage. |
| `Falloff Mode` | Controls how damage falls off from the center. |
| `Affect Players` / `Affect Props` / `Affect Glass` | Controls what the explosion can damage or push. |
| `Attribute Activator As Attacker` | Lets player-activated traps credit the activating player. |
| `Effect Prefab` / `Explosion Sound` | Optional custom visuals or sound. |

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Activate` / `Start` / `Press` / `Toggle` | Attempts to create the explosion. |
| `Lock` / `Unlock` | Prevents or allows future activation. |
| `Reset` | Clears one-shot and cooldown state. |

| Output | Use |
| --- | --- |
| `Targets On Exploded` | Fires after this target creates an explosion. |
| `Targets On Locked` / `Targets On Unlocked` | Fires when the target is locked or unlocked. |

---

## :material-fire: Generic Barrels { #generic-barrels }

Generic explosive barrels are the best choice when you want a familiar, readable map hazard with standard TTT behavior. 

Place [this Facepunch explosive barrel](https://sbox.game/facepunch/oildrumexplosive) on your Hammer map as a `prop_physics` and we'll configure the rest. 

!!! tip "Use standard barrels when readability matters"
    Players learn map hazards by sight. A custom bomb can be great for a traitor trap, but a familiar barrel is easier for players to recognize and reason about during a fight.

## :material-source-branch: Common Patterns

| Pattern | Setup |
| --- | --- |
| Traitor trap explosion | `TTT Role Button` to `TTT Explosion Target` with blank input or `Activate`. |
| Shootable barrel | Prop with `TTT Explosive Prop`, `Activation Mode = DamageOrSignal`. |
| Button-detonated bomb | Prop with `TTT Explosive Prop`, `Activation Mode = SignalOnly`, button output to the prop. |
| Resettable trap with delay | Button output to `TTT Explosion Target`, using map link `Delay Seconds`. |
| Explosion breaks glass | Keep `Affect Glass` enabled and test the result from the expected distance. |

## :material-check-circle: Testing Checklist

- Test player damage, prop force, and glass damage at the expected distance.
- Check whether walls should block or reduce the explosion.
- Confirm player-activated traps are attributed the way you expect.
- Test the explosion after a round reset.
- Make sure one-shot traps do not accidentally fire more than once.
