---
title: Player Specs
icon: material/walk
---

# :material-walk: Player Specs

## :material-camera-control: Controller Values

These are the defaults for TTT's player controller. All distances are in world units.

| Value | Default | Notes |
| --- | ---: | --- |
| Run speed | 220 units/s | Players run by default. |
| Walk speed | 120 units/s | Walk speed. |
| Crouch speed | 66 units/s | Applies while crouching on the ground. |
| Swim speed scale | 0.8x | At run speed this is about 176 units/s. |
| Jump power | 268.328 | With 800 gravity, this targets a 45-unit vertical jump. |
| Gravity | 800 units/s^2 | Physics gravity. Don't worry too much about this one. |
| Step height | 18 units | Small ledges up to this height can be stepped up while grounded. |
| Standing collider | 28 x 28 x 72 | Radius 14, height 72. |
| Crouched collider | 28 x 28 x 36 | Crouch lowers the player height by 36 units once fully ducked. |
| Eye height | 64 units | Fully crouched eye height is about 28 units. |
| Max walkable slope | about 45.6 degrees | Steeper surfaces stop counting as ground. |

Also noteworthy are interaction distances:

| Value | Default | Notes |
| --- | ---: | --- |
| Direct use distance | 130 units | Used for pressing buttons, doors, health stations, picking up weapons/ammo and similar `IPressable` objects. |
| Body inspection range | 255 units | Corpse inspection uses its own range check. |

!!! note "Build with a little margin"
    Jump height, fall distance and general height/width of the player are good mapper-facing targets, but exact results can shift slightly with slopes, moving platforms, surface friction, props, water, ladders, and fixed-step timing. Between those and human error, avoid making traversal across your map depend on the absolute maximum or minimum values.

---
## :material-jump-rope: Jumping

Our jump height is based on the jump power and base gravity. All you need to care about is that our player's max jump height with zero interference or other input is **exactly 45 units**. However, in a live environment with a fixed-step movement loop and human error, the practical peak is a little lower. It's best to treat **about 40 units** as a good baseline for jumping. Crouch-jumping can hit up to **80 units** if timed well.

For mapping, these are useful targets:

| Situation | Practical value | Notes |
| --- | ---: | --- |
| Normal vertical jump | about 42-45 units | Required ledges should stay below this. |
| Comfortable required jump-up | about 40 units | Safer for real play than the theoretical max. |
| Full jump + mid-air crouch | about 70-80 units of foot clearance | The crouch transition can raise the player's feet by up to 36 units while airborne, but this depends on input timing. |
| Comfortable required crouch-jump ledge | about 60-70 units | Safer than relying on the exact crouch timing. |
| Same-height running jump gap | about 148 units | Assumes 220 units/s horizontal speed and no speed boost. |
| Comfortable required running gap | about 120-130 units | Leaves room for imperfect takeoff, landing, and player input. |

Crouching before a jump does not increase or decrease jump power. It gives the same vertical lift with a shorter collider, but the player starts from crouch speed if they were moving while ducked. Jumping while crouched can allow the player to get into areas that are above the step height, but shorter than the player's standing height (vents, crawlspace, balcony ledges with low head clearance, etc). 

Holding crouch after jumping is the useful "crouch jump" case. The controller smoothly shrinks from 72 units tall to about 36 units tall and moves the player's feet upward during that shrink. That is why a crouch jump can clear a taller ledge than a normal jump, even though the jump power itself is unchanged.

---
## :fontawesome-solid-person-falling-burst: Fall Damage

Fall damage is based on downward impact speed, not directly on distance. TTT's defaults are:

| Value | Default |
| --- | ---: |
| Safe fall speed | 615 units/s |
| Lethal fall speed | 820 units/s |
| Minimum tracked drop | 16 units |
| Minimum airborne time | 0.08 seconds |
| Maximum self fall damage | 100 |

With 800 gravity, a straight standing drop from rest starts dealing damage at roughly **236 units** and reaches 100 damage at roughly **420 units**.

Damage scales linearly between those speeds. If you're concerned about unintentional fall damage in areas of your map, you'll realistically just need to test it out. Try walking off, jumping off, and any other situations that seem like they may be commonplace in the area and see it if feels reasonable. 

A collider with the `nofalldamage` tag prevents fall damage for players landing on it or overlapping it. The player does not need to be fully inside the volume; a thin tagged trigger at the landing surface is enough as long as it is slightly above the surface they land on.

Fall damage is reset or ignored in a few naturally-occurring cases:

- While swimming; water is a safe place to land.
- While on a ladder, or shortly after leaving one. If a player catches onto a ladder, they effectively cancel whatever fall damage they would have received otherwise.
- Immediately after respawn or teleport.
- Goomba stomping (see below).

---

## :material-snowshoeing: Stomping

If a player lands on another living player during a fall that would deal fall damage, the landing can become stomp damage instead.

The victim takes up to **2x the fall damage**, capped at **100**. The victim takes that damage instead of the falling player, who safely lands and often kills them. This is a rarely-seen feature, but something to keep in mind when making areas with a lot of height and not much width.

---
## :material-transit-connection-variant: Other Movement

Players aren't limited to running and jumping. More on authoring different ways to traverse the map [in the Movement section](movement.md).

