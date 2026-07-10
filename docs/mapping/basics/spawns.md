---
title: Spawns
icon: material/map-marker-plus
---

# :material-map-marker-plus: Spawns

TTT maps need player spawn points, and that is technically all that is needed for play. Surely you'll want to do more than just that, though...

!!! info "No Weapons?"
    If TTT doesn't find **any** weapon or pickup spawns on a map, it will automatically generate them when loading. This makes the gamemode compatible with most maps as long as they have spawn points, but you should place weapon spawns if you're making a map for TTT specifically.

<div class="grid cards" markdown>

-   __[:fontawesome-solid-person-arrow-down-to-line:{ .lg .middle } Player Spawns](#player-spawns)__

-   __[:fontawesome-solid-gun:{ .lg .middle } Weapon Spawns](#weapon-spawns)__

</div>

---

## :fontawesome-solid-person-arrow-down-to-line: Player Spawns { #player-spawns }

<div class="workflow-tabs" markdown>

=== ":fontawesome-solid-hammer: Hammer"
    Place `info_player_start` entities where you want your spawns. Players spawn at the marker and face the direction shown by its preview.

=== ":material-movie-open-star: Scene"
    Add a `SpawnPoint` component where players may spawn. Players spawn at the marker and face the direction shown by its preview.

</div>

!!! tip "How many?"
    Aim for **at least 32 spawn points** on the map, as long as the size reasonably supports that many players. It's highly recommended to place plenty; too many is no issue, too few is a problem. More spawns reduce the chance of higher population servers avoiding your map in rotation.

---

## :fontawesome-solid-gun: Weapon Spawns { #weapon-spawns }

TTT offers both **random** and **specific** weapon/ammo/grenade spawns. Random weapon behavior varies depending on [Loot settings](../../reference/server-settings.md#loot), so which you'll want will depend on your needs.

=== "Random Weapons"
    The most flexible option. Random weapon spawns are the only type of spawn that are adjusted depending on TTT's "Loot" options that are available to both server and lobby hosts. These options can adjust weapon spawning by type (Primary or secondary) and by current player count if the host chooses, so they make your map generally more compatible with different rules and preferences. However, if you're intentionally limiting weapon availability or variety for your map, they're not a good fit.

=== "Specific Weapons"
    If you place a specific weapon or pickup spawner, it will not be touched by any host settings and will spawn in whatever you selected every round. This is a good option if your map has specific needs, or if you want a certain weapon in a certain location- for example, a sniper spawn at a high vantage point, or a shotgun in an enclosed space.

???+ warning "Selection & Placement"
    === "Selection"
        <div class="media-row">
        <img alt="weaponspawns" class="img-frame img-compact" loading="lazy" src="../img/weaponspawns.png" />
        <p>You can select them by either adding their component to an empty GameObject or by choosing one of the spawners from the Create menu under TerrorTown. <strong>Note that you should place spawners, not the direct weapon objects in the categories above them, when making a map.</strong> Placing a weapon directly doesn't incorporate it into the repeated round spawning logic, so be warned.</p>
        </div>

    === "Placement"
        <div class="media-row">
        <img alt="randomwep" class="img-frame img-compact" loading="lazy" src="../img/random-weapon.png" />
        <p>Because of their varying sizes, weapons and ammo will spawn with different orientations in-game. The spawners have a bounding box indicating the total area that encompasses all of the different combinations that are possible. <strong>Make sure this box isn't clipping into any geometry</strong>, otherwise the weapon may spawn stuck in the wall or fall through the floor.</p>
        </div>

!!! tip "How many?"
    For most maps, a rough guideline to aim for is between **60 to 100 weapon placements** or more, especially if you are using a lot of random weapon spawners. That may seem like a lot, but if 32+ players want a primary and secondary of their choice, it starts adding up. It's up to you whether or not you want to serve that general need, but be aware that it might push people away from wanting to play your map repeatedly. Adjust up or down for unusually small, large, vertical, or sparse maps. It's generally better to place too many than place too few, just like player spawns.

