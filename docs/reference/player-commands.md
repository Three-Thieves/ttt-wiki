---
title: Player Commands
icon: material/console-line
---

# :material-console-line: Player Commands

These are commands that any player can use, as long as the server settings permit the feature. Admin and moderation commands are covered on the [Moderation](moderation.md) page.

Chat commands can be typed with either `!` or `/`.

## Chat Commands

| Command | What it does | Notes |
| --- | --- | --- |
| `!rtv` / `/rtv` | Starts a Rock the Vote map-change vote when RTV is enabled. | If a round is active, a passed RTV waits for round end before the map vote opens. |
| `!yes` / `/yes` | Votes yes on an active popup vote. | Used by RTV and votekick popup votes. |
| `!no` / `/no` | Votes no on an active popup vote. | Used by RTV and votekick popup votes. |
| `!votekick PLAYER` / `/votekick PLAYER` | Queues a public votekick for the named player. | Votekicks run outside active round play. A passed votekick applies a 30-minute host ban. |
| `!afk` / `/afk` | Toggles your AFK state. | AFK players sit out future rounds until they return. |
| `!help` / `/help` | Shows in-game command help. | Includes staff commands only if you have permission to use them. |
| `!ping` / `/ping` | Shows a simple ping response. | Hosts see `0`; clients see approximate latency. |

!!! note "Votekick behavior"
    Votekick is separate from Rock the Vote. Disabling `ttt_rtv_enabled` disables player-started map-change votes, but it does not disable votekick. Hosts and admins cannot be votekicked.

## Console Commands

| Command | What it does | Notes |
| --- | --- | --- |
| `kill` | Eliminates your own player character. | Only works while you are alive during an active round. |
| `rtv` | Starts a Rock the Vote map-change vote. | Same behavior as `!rtv`. |
| `votekick PLAYER` | Queues a public votekick for the named player. | Same behavior as `!votekick`. |

!!! tip "For hosts and admins"
    Server settings, map-vote tools, role commands, and bans are split into [Server Settings and Public ConVars](server-settings.md) and [Moderation](moderation.md).
