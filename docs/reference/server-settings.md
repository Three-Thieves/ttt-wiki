---
title: Host Settings and ConVars
icon: material/tune
---

# :material-tune: Host Settings and ConVars
## Changing ConVars and Settings

If you're starting a lobby, settings can be configured from the main menu before creating it by clicking **Lobby Rules**. From there, you can choose between most core gameplay settings, manage map-vote sources, and save reusable rule presets.

???+ tip "Viewing current settings"
    Players can view any settings that are set to non-default values in the pause menu by clicking Lobby Info (or Server Info, if on a dedicated server).
    <div class="media-row">
        <img alt="lobbyinfo" class="img-frame" loading="lazy" src="../img/lobbyinfo.png" />
    </div>

## :material-map-search: Lobby Map Selection

A lobby host makes two separate map choices before starting the game: the map the lobby launches on and the maps that can appear in later votes.

<div class="grid cards" markdown>

-   __[:material-map-marker:{ .lg .middle } Starting Map](#starting-map)__

    ---
    The one map loaded when the lobby starts

-   __[:material-vote:{ .lg .middle } Vote Rules](#vote-rules)__

    ---
    The source pools used for later map votes

-   __[:material-playlist-plus:{ .lg .middle } Custom Maps](#custom-maps)__

    ---
    Specific package idents added to the vote candidates

</div>

### Starting Map

Click the map preview on the Create Lobby screen to open **Choose Starting Map**. Selecting a map here changes only the map used to launch the lobby. It does not limit later votes to that map's source pool.

The **Official**, **Verified**, **Compatible**, size, and search controls in this browser are browse filters. They decide which maps are shown while choosing the starting map; they do not change the lobby's map-vote rules.

### Vote Rules

Use **Lobby Rules → Map Vote** to choose the actual source pools used for later votes. The **Vote Rules** button in the starting-map browser opens these settings directly.

The normal source pools are **Official**, **Verified**, and **Compatible**. They can be combined with specific maps from the custom list. If every normal source pool is disabled, votes use only the selected custom maps.

### Custom Maps

Use **Manage Custom Maps** under the Map Vote rules to add individual map packages. You can enter either form:

```text
org.map
https://sbox.game/org/map
```

The browser also links to [all map packages on sbox.game](https://sbox.game/ugc/map) so you can browse outside the game and paste a package link or ident. The package must exist, be an unarchived map, and not be blocked by TTT.

Custom maps are added to the eligible vote candidates alongside any enabled source pools. They are not guaranteed to appear on every ballot. Maps that do not target TTT can still be added explicitly; if one has no weapon or pickup spawns, TTT will attempt to [generate weapon placements automatically](../mapping/basics/spawns.md#weapon-spawns).

???+ info "Rule presets and the starting map"
    Named rule presets save the custom map list, but they do not save which map should be used as the next lobby's starting map.

    When a preset is created or updated, the current starting map is added to its custom vote candidates. Starting a lobby does the same. Changing the starting map later does not silently remove the previous map from the custom list.


Most rule settings are native s&box ConVars. Saved ConVars are stored in `config/convar/game.json`. Each value appears under a `convar.` key:

```json
"convar.ttt_rtv_enabled": {
  "Value": "False",
  "Timeout": 1781214253,
  "DeleteAt": 0
}
```
Only edit `Value` if editing the `game.json` file directly. Do not edit `Timeout` or `DeleteAt`.

The key in `game.json` includes the `convar.` prefix. The console command does not.

| In `game.json` | In server console |
| --- | --- |
| `convar.ttt_rtv_enabled` | `ttt_rtv_enabled false` |

???+ tip "Running the command in console is easiest"
    Setting a ConVar from the server console applies it through the game and lets the engine write any saved value back to `game.json`. If you edit `game.json` by hand, stop the server first and preserve valid JSON.
---
## Host Settings

### :material-timer-lock: When do changes apply?

| Applies | Meaning |
| --- | --- |
| Live | The running game will read or apply the change immediately. |
| Next round | The value will change once the next round starts. |
| Round end | The value matters when round-end logic runs. |
| New votes | New map votes read the value when they are created. |
| New player | The value applies when a new player component is created. |
| Dedicated only | Dedicated server console or dedicated lifecycle behavior. |

---
### :material-clock: Time

<div class="host-settings-table host-command-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Haste Mode</span><code>ttt_haste_mode</code> | `True` | `True` / `False` | Next round | Enables haste mode. The public timer starts shorter and hidden time is added as players die. |
| <span class="host-setting-title">Haste Start Time</span><code>ttt_haste_starting_minutes</code> | `5` | `1` to `30` | Next round | Public round timer duration before haste overtime starts. |
| <span class="host-setting-title">Haste Time Per Death</span><code>ttt_haste_minutes_per_death</code> | `0.5` | `0` to `5` | Next round | Minutes added to the hidden round limit each time a player dies. `0.5` is 30 seconds. |
| <span class="host-setting-title">Max Rounds</span><code>ttt_max_rounds</code> | `6` | `1` to `20` | Next round | Number of rounds before the match ends and a map vote begins. |
| <span class="host-setting-title">Round Time</span><code>ttt_round_time_minutes</code> | `5` | `5` to `60` | Next round | Round duration when haste mode is off. |

</div>

---
### :material-account: Roles

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Traitor Percentage</span><code>ttt_traitor_pct</code> | `0.25` | `0.05` to `1` | Next round | Fraction of round players assigned as traitors. |
| <span class="host-setting-title">Max Traitors</span><code>ttt_traitor_max</code> | `32` | `1` to `64` | Next round | Maximum number of traitors that can be assigned. |
| <span class="host-setting-title">Detective Percentage</span><code>ttt_detective_pct</code> | `0.13` | `0` to `1` | Next round | Fraction of round players assigned as detectives when enough players are present. |
| <span class="host-setting-title">Max Detectives</span><code>ttt_detective_max</code> | `32` | `0` to `64` | Next round | Maximum number of detectives that can be assigned. |
| <span class="host-setting-title">Detective Min Players</span><code>ttt_detective_min_players</code> | `8` | `0` to `64` | Next round | Minimum round player count before detectives can be assigned. |

</div>

---
### :material-eye: Visuals

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Player Cosmetics</span><code>ttt_allow_player_cosmetics</code> | `True` | `True` / `False` | Next round | Allows players to use their s&box head, face, and neck cosmetics. |
| <span class="host-setting-title">Full Body Cosmetics</span><code>ttt_allow_player_full_body_cosmetics</code> | `False` | `True` / `False` | Next round | Allows players to use their full s&box clothing loadout. Only matters when player cosmetics are enabled. |

</div>

---
### :material-scale-unbalanced: Karma

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Karma</span><code>ttt_karma</code> | `True` | `True` / `False` | Next round | Enables karma penalties, rewards, and low-karma damage scaling. |
| <span class="host-setting-title">Auto-kick</span><code>ttt_karma_low_autokick</code> | `False` | `True` / `False` | Round end | Bans non-staff players below the low-karma threshold for 30 minutes at round end. |
| <span class="host-setting-title">Auto-Kick Threshold</span><code>ttt_karma_kick_threshold</code> | `300` | `0` to `1100` | Round end | Karma value below which low-karma auto-kick applies. |
| <span class="host-setting-title">Starting Karma</span><code>ttt_karma_starting</code> | `1000` | `0` to `1100` | New player | Karma assigned to newly-created player components. |
| <span class="host-setting-title">Damage Threshold</span><code>ttt_karma_damage_threshold</code> | `800` | `0` to `1100` | Live damage checks | Karma value below which outgoing damage is reduced. |
| <span class="host-setting-title">Friendly Damage Penalty</span><code>ttt_karma_kill_penalty</code> | `30` | `0` to `100` | Round end | Friendly damage penalty scale before internal karma math. |
| <span class="host-setting-title">Round Recovery</span><code>ttt_karma_round_increment</code> | `15` | `0` to `100` | Round end | Karma restored at round end when the player teamkilled nobody. |
| <span class="host-setting-title">Teamkill Recovery</span><code>ttt_karma_round_heal_on_teamkill</code> | `10` | `0` to `100` | Round end | Karma restored at round end when the player killed a teammate. |
| <span class="host-setting-title">Enemy Kill Bonus</span><code>ttt_karma_enemybonus</code> | `10` | `0` to `100` | Round end | Karma awarded for killing an enemy role. |

</div>

---
### :material-volume-high: Voice

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Proximity Voice</span><code>ttt_proximity_voice_enabled</code> | `False` | `True` / `False` | Live | Uses distance-limited voice for normal alive-player voice. Team voice and dead/alive filtering are separate. |
| <span class="host-setting-title">Proximity Voice Range</span><code>ttt_proximity_voice_range</code> | `800` | `200` to `5000` | Live | Voice range in world units when proximity voice is enabled. |

</div>

---
### :material-eye-minus-outline: Spectator

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Prop Possession</span><code>ttt_spectator_prop_possession_enabled</code> | `True` | `True` / `False` | Live | Allows spectators to possess and push props while in freecam. |

</div>

---
### :material-run: Movement

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Bunny Hopping</span><code>bhop</code> | `False` | `True` / `False` | Live | Allows players to chain well-timed jumps on landing to build momentum. |
| <span class="host-setting-title">Auto Bunny Hop</span><code>bhop_auto</code> | `True` | `True` / `False` | Live | Allows holding jump to keep jumping while bunny hopping is enabled. Only matters when `bhop` is enabled. |

</div>

---
### :material-treasure-chest: Loot

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Scaled Weapon Spawns</span><code>t.pickup.random_weapon_budget</code> | `True` | `True` / `False` | Next round | Scales random map weapon spawns by eligible player count. Only affects random weapon spawns. |
| <span class="host-setting-title">Minimum Random Weapons</span><code>t.pickup.random_weapon_budget_min</code> | `20` | `0` to `200` | Next round | Minimum random map weapons to spawn before player-count scaling. |
| <span class="host-setting-title">Weapons Per Player</span><code>t.pickup.random_weapon_budget_per_player</code> | `4.5` | `0` to `8` | Next round | Random map weapon target added per eligible player. |
| <span class="host-setting-title">Primary Weapon Ratio</span><code class="host-convar-wrap">t.pickup.random_weapon_budget_primary_fraction</code> | `0.6` | `0` to `1` | Next round | Preferred share of budgeted random weapons that should be primaries. |

</div>

---
### :material-map-check: Map Vote

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Rock the Vote</span><code>ttt_rtv_enabled</code> | `True` | `True` / `False` | Live | Allows players to start Rock the Vote map-change votes. Votekick and admin-forced map votes are unaffected. |
| <span class="host-setting-title">Vote Options</span><code>ttt_mapvote_option_count</code> | `10` | `1` to `12` | New votes | Maximum number of maps shown in a map vote. |
| <span class="host-setting-title">Map Pools</span><code>ttt_mapvote_pool</code> | `Official;Verified` | See below | New votes | Map source pools used for generated map vote options. |
| <span class="host-setting-title">Custom Maps</span><code>MapVote.AlwaysInclude</code> | empty | Package idents | New votes | Specific map packages added to the eligible vote candidates. This is a lobby setting and dedicated-server config field, not a ConVar. |
| <span class="host-setting-title">Player Count Filter</span><code>ttt_mapvote_filter_by_players</code> | `False` | `True` / `False` | New votes | Prefers pool maps whose authored size range fits the current lobby size. Explicit custom maps remain eligible. |
| <span class="host-setting-title">Show Map Tags</span><code>ttt_mapvote_show_tags</code> | `True` | `True` / `False` | New votes | Shows approved map package tags on map vote cards. |

</div>

**More map/vote commands are listed below in [Map and Vote Commands](#map-and-vote-commands)**.

???+ tip "Map Vote Pools"
    `ttt_mapvote_pool` accepts `Official`, `Verified`, and `AllCompatible`. Use semicolons, commas, plus signs, or newlines to combine pools. `All` and `Any` are accepted shortcuts for all currently playable source pools.

    The lobby UI calls `MapVote.AlwaysInclude` **Custom Maps**. These maps join the eligible candidate set; they are not pinned to every ballot. Leave `ttt_mapvote_pool` empty to use only the custom list.

    The `t.server.mapvote.*` mutation commands write `server_settings.json`, apply to the next generated map vote, and reject changes while a map vote is already active.

    `MapVote.AlwaysInclude` and `MapVote.NeverShow` are not ConVars. They live in `server_settings.json` because they are package-ident lists of specific maps to include or block (see [Server Hosting](../server-hosting/index.md#settings-config)).

---
### :material-magnify: Forensics

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Killer DNA Range</span><code>ttt_killer_dna_range</code> | `550` | `0` to `3000` | Next round | Maximum attacker distance that can leave DNA on a body. |
| <span class="host-setting-title">Killer DNA Base Time</span><code>ttt_killer_dna_basetime</code> | `100` | `0` to `600` | Next round | Starting DNA lifetime before distance-based decay is applied. |
| <span class="host-setting-title">Require Identified Body</span><code>ttt_killer_dna_require_identified_body</code> | `True` | `True` / `False` | Live | Requires a corpse to be identified before its DNA can be collected. |

</div>

!!!warning "We don't suggest changing Forensics values"
    These convars are hidden by default and are still somewhat WIP. Changes won't be visible to players in your lobby or server and they might cause unexpected behavior- you have been warned!

---
### :material-shield-account: Moderation

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Auto-AFK</span><code>ttt_auto_afk</code> | `True` | `True` / `False` | Live | Automatically marks idle alive players as AFK after 2.5 minutes of inactivity. |

</div>

---
### Dedicated Lifecycle

These dedicated-server ConVars are not part of the lobby rules screen, but they are useful to operators.

<div class="host-settings-table" markdown>

| Setting | Default | Range | Applies | Description |
| --- | --- | --- | --- | --- |
| <span class="host-setting-title">Empty Server Reset</span><code>t.dedicated.empty_reset</code> | `True` | `True` / `False` | Dedicated only | Reloads an empty dedicated server back to its boot map after everyone leaves. |
| <span class="host-setting-title">Empty Reset Delay</span><code>t.dedicated.empty_reset.delay</code> | `600` | `0` or higher | Dedicated only | Delay in seconds before the empty-server reset runs. |

</div>

---
## :material-map-check: Map and Vote Commands


<div class="host-settings-table host-command-table" markdown>

| Command | Description |
| --- | --- |
| <span class="host-setting-title">Rock The Vote</span><code>rtv</code> | Starts a Rock the Vote map-change vote if `ttt_rtv_enabled` is true. Players can also type `/rtv` or `!rtv` in chat. |
| <span class="host-setting-title">Votekick</span><code>votekick PLAYER</code> | Queues a public votekick. Players can also type `/votekick` or `!votekick` in chat. |
| <span class="host-setting-title">Force Map Vote</span><code>ttt_forcemapvote</code> | Admin/host command that starts or schedules the map-vote flow. It is not blocked by `ttt_rtv_enabled`. |
| <span class="host-setting-title">Change Level</span><code>changelevel MAPIDENT</code> | Host-console command that changes to a map ident. Use carefully during live operation. |
| <span class="host-setting-title">Map</span><code>map MAPIDENT</code> | Alias for `changelevel`. |
| <span class="host-setting-title">Scene</span><code>scene SCENEFILE</code> | Host-console scene change command for scene files. Use map idents for normal server operation. |
| <span class="host-setting-title">Official Maps</span><code>t.maps.official</code> | Dedicated-server-console-only command that prints the official map source list. |
| <span class="host-setting-title">Verified Maps</span><code>t.maps.verified</code> | Dedicated-server-console-only command that prints the verified map source list. |
| <span class="host-setting-title">Compatible Maps</span><code>t.maps.compatible</code> | Dedicated-server-console-only command that discovers and prints compatible unverified map packages. This can take longer than the static source-list commands. |
| <span class="host-setting-title">Print Map Vote Settings</span><code>t.server.mapvote.print</code> | Dedicated-server-console-only command that prints current map vote source settings from `server_settings.json`. |
| <span class="host-setting-title">Set Map Vote Pool</span><code>t.server.mapvote.pool.set Official,Verified</code> | Dedicated-server-console-only command that updates `MapVote.Pool` in `server_settings.json`. |
| <span class="host-setting-title">Add AlwaysInclude</span><code>t.server.mapvote.alwaysinclude.add org.map</code> | Adds a map ident to `MapVote.AlwaysInclude`. |
| <span class="host-setting-title">Remove AlwaysInclude</span><code>t.server.mapvote.alwaysinclude.remove org.map</code> | Removes a map ident from `MapVote.AlwaysInclude`. |
| <span class="host-setting-title">Add NeverShow</span><code>t.server.mapvote.nevershow.add org.map</code> | Adds a map ident to `MapVote.NeverShow`. |
| <span class="host-setting-title">Remove NeverShow</span><code>t.server.mapvote.nevershow.remove org.map</code> | Removes a map ident from `MapVote.NeverShow`. |

</div>

The `t.server.mapvote.*` mutation commands write `server_settings.json`, apply to the next generated map vote, and reject changes while a map vote is already active.

Scheduled direct map changes are available through [Mod Menu → Tools → Map Tools](moderation.md#map-tools). There is currently no console-command equivalent for scheduling a direct change at the end of the round or map.

---

## Troubleshooting

If settings are not applying:

- Make sure `server_settings.json` is in the correct game ident's data folder.
- Make sure saved ConVars are edited under `config/convar/game.json` or your host's ConVar panel.
- Restart the dedicated server after editing files by hand.
- Check that your JSON is valid.
- In `game.json`, edit only `Value`.
- Check the server console for `[server.settings]`, `[lobby.settings] applied`, and `[server.launch]` messages.

???+ info "Example Success Messages"
    Successful load:
    `[server.settings] loaded path=server_settings.json schema=3 lobby=True map_pool=Official;Verified always_include=0 never_show=0`

    Applied settings:
    `[lobby.settings] applied source=dedicated launch_map=thieves.rooftops native_map=thieves.rooftops public, 6 rounds, 5m, prep 20s, haste 5m +0.5m/death, open catalog, official + verified pool, 10 vote maps`
