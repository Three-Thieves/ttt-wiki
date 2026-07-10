---
title: Props
icon: material/magnet-on
---

# :material-magnet-on: Props

Authoring props is pretty simple for basic use. We handle most of the behavior needed for multiplayer on the back end. 

!!! tip "Add a few props to your map!"
    While they're not required, props are a major part of gameplay for maps that do have them. They're fun and certain traitor weapons rely on them for efficacy, like the Newton Launcher or Poltergeist. Playing with physics props is maybe the most common way people playing will enjoy themselves & burn down the clock during a round when there's no action otherwise. 

TTT offers some more custom behavior as well; props can be used to kill other players in a variety of ways, they can interact with map I/O, and more... Basics first.

<div class="grid cards" markdown>

-   __[:material-cog:{ .lg .middle } Basic Setup](#basic-setup)__

-   __[:fontawesome-solid-first-aid:{ .lg .middle } Health](#health)__

-   __[:material-weight:{ .lg .middle } Mass](#mass)__

-   __[:material-barrel:{ .lg .middle } Explosives](#explosives)__

</div>

---

## :material-cog: Basic Setup { #basic-setup }

Adding a prop is handled semi-automatically by the editor, but the resulting workflow varies depending on the type of map. The shared behavior is dragging & dropping a model in from the Asset or Cloud Browser- in both scene and Hammer, it'll be given values based on the model's data. 

<div class="workflow-tabs" markdown>

=== ":fontawesome-solid-hammer: Hammer"
    By default, Hammer will convert a model dragged on the map into a class of Entity, typically `prop_physics` or `prop_static` depending on the data. This is the typical workflow for Hammer maps and is the simplest way to add props, but there are some small drawbacks here- namely that they are **100% reliant** on their model's `prop_data` for specific gameplay-related values like their **health** or **mass**.

    By adding an empty `GameObject` and putting the native `Prop` component manually onto it, then dragging the model into that field, you can modify those values for a specific instance of a prop if you don't want to touch the model values themselves (or can't). 

=== ":material-movie-open-star: Scene"
    When dragging a model onto the map, the scene will automatically assign a `Prop`, `ModelRenderer`, `ModelCollider` and `RigidBody` component to a new `GameObject` and assign them values based on the model's `prop_data`. These can be modified on the `GameObject` and will override the model's values if they exist.

</div>

### :fontawesome-solid-first-aid: Health { #health }

For TTT, health means what you'd expect: **how much damage can this take before breaking?**

If the prop's health is set to 0 or -1, it will be considered unbreakable. Anything higher means it can break when thrown, shot, or damaged in any way. If it has break pieces it'll spawn gibs, then the object disappears and is disabled until the next round resets it. 

**Health isn't limited to physics props**. Give health to a static prop for breakable walls, bridges, or whatever else comes to mind.

!!! info ""
    A good reference point for authoring prop health is the crowbar, which does 20 damage. How many times do you want a player to have to hit it with a crowbar before it breaks? 

### :material-weight: Mass { #mass }

Mass determines whether or not the player can pick a physics prop up with the magneto stick. Currently, the different behaviors are based on these mass values:

- 0-85: Can fully hold and manipulate
- 85-110: Can only push/pull
- 110+: Too big to manipulate

!!! info "I want to pick up really heavy props on my map!"
    You can override the limit by putting the `always_throwable` tag on a prop, which allows it to always be picked up regardless of its mass. Unfortunately, aligning gameplay behavior to the widlly different mass values on props across all of the maps on s&box is not really possible. Our values are based around maps we and others made in the past and the player's mass in TTT. 

---

### :material-cube-outline: Props with other Components { #props-with-other-components }

There are a number of other ways to have props behave in TTT as well.

!!! warning ":fontawesome-solid-hammer: Hammer Workflow"
    Unfortunately, advanced behavior needs often require more than what is possible with the remains of the Entity system and prop model data. 
    <p class="emphasis">
        **Any time you need to have a `Component` on a prop for extra behavior, you can't get away with using `prop_physics` or `prop_static`**.
    </p>
    Instead, add an empty `GameObject` to the map, add the native `Prop` component to it manually, then place your desired model in the field. From there, you can add whatever other components you need onto the object.

### :material-barrel: Explosives { #explosives }

There are a couple of different ways to make your prop explosive.

=== "Model Data"
    Simplest, most restrictive. Check the `Explosive` field on the model's `prop_data` and set the value. Be very wary when authoring it this way, we trust all of the data here- Force Scale, Radius and Damage are all up to you. You can take a peek at some references in [Explosives](../tools/explosives.md) to get an idea of what gameplay balancing looks like here.

=== "Explosive Prop Component"
    Most robust, a little more complex if meddled with a lot. `ExplosivePropComponent` allows for damage-activated explosives (like barrels or gas canisters) as well as I/O-activated explosives (like a traitor button on a bomb). There are a lot of options as far as damage, range and even effects- leaving most of it alone will use default TTT values.

=== "Generic Barrel Placement"
    If you would like, placing [this Facepunch explosive barrel](https://sbox.game/facepunch/oildrumexplosive) on your Hammer map will automatically configure it with default behavior. These can't be adjusted- they'll be the exact same damage, health, and radius every time. This is restrictive in some ways, but there are benefits to using them: 

    1. They're recognizably the explosive barrel from many other maps, so players know exactly what's going on when they see them. The more someone has played, the more they are intimately aware of their exact range and damage- so they can can interact with those dynamic and dangerous areas of your map with that tactical knowledge. 
    2. They're easy to use. Just place 'em and you're done.

