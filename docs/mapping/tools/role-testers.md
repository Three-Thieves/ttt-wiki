---
title: Role Testers
icon: material/badge-account
---

# :material-badge-account: Role Testers

Role testers are trigger volumes that check the role of players inside them. The classic use is a traitor tester: a player steps into a booth, a button activates the tester, and the map turns on the result lights.

## Tester Pieces

<div class="grid cards" markdown>

-   __[:material-badge-account:{ .lg .middle } TTT Trigger Role Tester](#ttt-trigger-role-tester)__

    ---

    The trigger volume that checks occupants against a configured role

-   __[:material-lightbulb-on:{ .lg .middle } Result indicators](#result-indicators)__

    ---

    Lights, doors, sounds, or effects driven by passed and failed results

-   __[:material-cursor-default-click:{ .lg .middle } Buttons](#buttons)__

    ---

    Player controls that activate, toggle, lock, or reset the tester

-   __[:material-package-variant:{ .lg .middle } Included prefab](#included-prefab)__

    ---

    A simple bundled traitor tester you can use as a reference or starting point

</div>

---

## :material-badge-account: TTT Trigger Role Tester

!!! info ""
    `TTT Trigger Role Tester` checks the current occupants of its trigger volume against `Match Role`. If at least one occupant matches, it fires `Targets On Passed`. If at least one occupant does not match, it fires `Targets On Failed`.

### Setup

1. Create the tester booth, chamber, platform, or marked standing area.
2. Add a `GameObject` for the tester volume.
3. Add `TTT Trigger Role Tester`.
4. Resize the trigger `BoxCollider` so it covers the area where players should stand.
5. Set `Match Role`. For a normal traitor tester, leave it as `Traitor`.
6. Set `Starts Active` and `Activate Mode` for how the tester should be used.
7. Wire a button, trigger, or other sender to activate the tester.
8. Wire `Targets On Passed` and `Targets On Failed` to result indicators.

!!! warning "Keep the test area controlled"
    A role tester can evaluate more than one occupant. If a matching player and a non-matching player are inside at the same time, it can fire both passed and failed outputs. Classic tester rooms should force one player into the test volume at a time.

### Match Settings

| Option | Use |
| --- | --- |
| `Match Role` | The exact role/team that counts as a match. Default is `Traitor`. |
| `Require Alive` | Only living players count as matches. Leave this enabled for normal testers. |
| `Contact Include` / `Include` / `Exclude` | Occupant filters inherited from trigger volumes. Leave the defaults alone unless you are deliberately building a special tester. |

## :material-power: Activation

Role testers are trigger-style tools. They only evaluate while active, or when an input makes them active.

| Option | Use |
| --- | --- |
| `Starts Active` | Starts active on round start or reset. Useful for always-on scanners. Disable it for a button-operated tester. |
| `Starts Locked` | Starts locked until another tool sends `Unlock`. |
| `Activate Mode` | Controls what `Activate` does: enable, toggle, or activate for a timed duration. |
| `Activate Duration Seconds` | Duration for timed activation. |

### Inputs

| Input | Behavior |
| --- | --- |
| `Start` / `Open` | Turns the tester active. |
| `Stop` / `Close` | Turns the tester inactive. |
| `Activate` | Uses `Activate Mode`. |
| `Toggle` | Flips between active and inactive. |
| `Lock` / `Unlock` | Prevents or allows future activation. |

For most authored testers, prefer `Start`, `Stop`, `Activate`, and `Toggle`.

## :material-lightbulb-on: Result Indicators

`Targets On Passed` and `Targets On Failed` are result outputs. For a normal traitor tester with `Match Role` set to `Traitor`:

| Output | Meaning |
| --- | --- |
| `Targets On Passed` | A traitor was detected. |
| `Targets On Failed` | A non-traitor was detected. |

!!!warning "Why is an Innocent showing up as failing?"
    The output names are from the tester's point of view: passed means "matched the configured role," not "innocent passed the test."

### Clean Indicator Wiring

A simple two-light tester usually uses `TTT Enable Target` receivers on the indicator lights.

| Event | Target | Input |
| --- | --- | --- |
| `Targets On Passed` | Traitor/red indicator | `Start` |
| `Targets On Passed` | Innocent/green indicator | `Stop` |
| `Targets On Failed` | Innocent/green indicator | `Start` |
| `Targets On Failed` | Traitor/red indicator | `Stop` |
| `Targets On Empty` | Both indicators | `Stop` |
| `Targets On Deactivated` | Both indicators | `Stop` |

!!! tip "Be explicit with indicator inputs"
    Tester result outputs send `Pass` and `Fail` internally. Most indicator receivers do not need to know those words, so set the map link `Input` to `Start` or `Stop` when wiring lights, sounds, doors, or effects.

## :material-cursor-default-click: Buttons

### One-Shot Tester

Use this when pressing a button should check whoever is currently inside the booth.

1. Set the role tester `Starts Active` to off.
2. Set `Activate Mode` to `Timed`.
3. Add a `TTT Button` near the tester.
4. Wire the button's main output to the role tester with input `Activate`.
5. Wire result outputs to the indicators.

### Toggle Tester

Use this when a button should turn the tester on and off.

1. Set the role tester `Starts Active` to off.
2. Set the button `Mode` to `Toggle`.
3. Wire `Targets On Toggled On` to the tester with input `Start`.
4. Wire `Targets On Toggled Off` to the tester with input `Stop`.
5. Wire `Targets On Deactivated` or the button's off output to clear the indicators.

## :material-source-branch: Outputs

| Output | Use |
| --- | --- |
| `Targets On Passed` | Fires when an evaluation finds at least one occupant matching `Match Role`. |
| `Targets On Failed` | Fires when an evaluation finds at least one occupant not matching `Match Role`. |
| `Targets On Entered` / `Targets On Exited` | Fires when a valid occupant enters or exits while active. |
| `Targets On Occupied` / `Targets On Empty` | Fires when the trigger becomes occupied or when the last valid occupant leaves. |
| `Targets On Activated` / `Targets On Deactivated` | Fires when the tester starts or stops being active. |
| `Targets On Locked` / `Targets On Unlocked` | Fires when the tester is locked or unlocked. |

## :material-package-variant: Included Prefab

The project includes a simple traitor tester prefab at `prefabs/objects/tools/traitortester.prefab`. It is useful as a starting point or wiring reference, especially if you want to see a complete tester volume, button, and indicator setup together.

Treat it as an example, not a rule. For a real map, check the trigger size, button placement, indicator reset behavior, and whether the tester room can be abused by multiple players standing inside at once.

## :material-check-circle: Testing Checklist

- Test with a traitor, an innocent, and a detective when possible.
- Confirm `Targets On Passed` and `Targets On Failed` mean what your lights imply.
- Make sure result indicators clear when the player leaves or the tester turns off.
- Test what happens if two players enter the volume at the same time.
- Run a round reset and confirm the tester starts active, inactive, locked, and cleared exactly as intended.
