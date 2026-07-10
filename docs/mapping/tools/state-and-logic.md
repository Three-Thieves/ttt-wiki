---
title: State and Logic
icon: material/source-branch
---

# :material-source-branch: State and Logic

State and logic tools help other map tools do useful work. They do not usually create a whole feature by themselves; they turn objects on and off, count events, and turn several small signals into one larger map behavior.

## Tools On This Page

<div class="grid cards" markdown>

-   __[:material-toggle-switch:{ .lg .middle } Enable Targets](#enable-targets)__

    ---

    Toggle or turn components and GameObjects on or off through map I/O

-   __[:material-counter:{ .lg .middle } Logic Counters](#logic-counters)__

    ---

    Count inputs and fire an output when a target count is reached

</div>

---

## :material-toggle-switch: Enable Targets { #enable-targets }

`TTT Enable Target` controls whether another component or GameObject is enabled. Use it for lights, sounds, particles, visual indicators, trap pieces, and simple object visibility.

### Setup

1. Add `TTT Enable Target` to a nearby helper object or the object being controlled.
2. Choose `Target Kind`.
3. Assign `Target Component` or `Target Object`.
4. Choose `Activate Mode`.
5. Wire buttons, triggers, role testers, or logic outputs to this enable target.

### Target Kinds

| Target kind | Use |
| --- | --- |
| `Component` | Best for lights, particle emitters, sound emitters, and other individual components. Try to use this one, it is more reliable and less easy to make a mistake with. |
| `GameObject` | Enables or disables the whole object tree. Leave `Target Object` empty to target the object we're on right now. |

!!! warning "Do not disable the receiver by accident"
    If an enable target disables the GameObject that contains the `TTT Enable Target` component, future signals won't reach it until another object re-enables it or the round resets. For reusable lights and effects, targeting a specific component is usually safer. 

    Due to how widely applicable this is, it hasn't been end-to-end tested. If you run into issues, reach out to `@fatsumo` on our [Discord](https://discord.gg/threethieves)!

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Start` / `Open` | Enables the target. |
| `Stop` / `Close` | Disables the target. |
| `Activate` | Uses `Activate Mode`: enable, toggle, or timed enable. |
| `Toggle` | Flips the current enabled state. |
| `Enter` / `Occupied` | Enables the target. Useful with trigger outputs. |
| `Exit` / `Empty` | Disables the target. Useful with trigger outputs. |

| Output | Use |
| --- | --- |
| `Targets On Enabled` | Fires when the target is enabled. |
| `Targets On Disabled` | Fires when the target is disabled. |

### Common Patterns

| Pattern | Wiring |
| --- | --- |
| Traitor tester results | Tester output to enable target with `Start`; opposite result output with `Stop`. |
| Trigger a sound | Trigger occupied output to enable target with `Start`; empty output with `Stop`. |
| Button toggles a light | Button output to enable target with `Toggle`, or leave blank if `Activate Mode` is `Toggle`. |

---

## :material-counter: Logic Counters { #logic-counters }

`TTT Logic Counter` counts map I/O events sent to it, then fires an output at a specified number received. Use it when several actions should be completed before a door opens, an object is spawned, easter eggs... So on and so forth.

### Setup

1. Add `TTT Logic Counter` to a helper GameObject.
2. Set `Start Count` and `Target Count`.
3. Wire events that should count up to the counter.
4. Wire `Targets On Reached` to whatever should happen when the count reaches the target.
5. Use `Reset On Reached`, `Fire Once`, or `Reset` inputs if the counter should be reusable.

### Useful Options

| Option | Use |
| --- | --- |
| `Start Count` | Count restored on round reset. Usually 0. |
| `Target Count` | The count needed before `Targets On Reached` fires. |
| `Increment Amount` | Amount added by normal activation-style inputs. |
| `Decrement Amount` | Amount removed by decrement-style inputs. |
| `Reset On Reached` | Resets to `Start Count` immediately after firing reached outputs. |
| `Fire Once` | Prevents repeated reached outputs until the counter is reset. |
| `Starts Locked` | Ignores count-changing inputs until it receives `Unlock`. |

### Inputs And Outputs

| Input | Behavior |
| --- | --- |
| `Activate` / `Press` / `Enter` / `Occupied` | Adds `Increment Amount`. |
| `Increment` / `Add` / `Count` | Adds `Increment Amount`, or a numeric `Payload` when provided. |
| `Decrement` / `Subtract` | Removes `Decrement Amount`, or a numeric `Payload` when provided. |
| `Set` | Sets the count to the numeric `Payload`. |
| `Reset` | Restores `Start Count`. |
| `Lock` / `Unlock` | Prevents or allows count-changing inputs. |

| Output | Use |
| --- | --- |
| `Targets On Reached` | Fires when the count crosses from below `Target Count` to at least `Target Count`. Payload is the current count. |
| `Targets On Changed` | Fires whenever the count changes. Payload is the current count. |

!!! tip "Keep names legible"
    Name the counter after what it is waiting for. Counters are easy to wire and annoying to debug if every helper object is called `JoeBlunt`.

## :material-check-circle: Testing Checklist

- Test the starting count after a round reset.
- Test whether the counter can fire more than once.
- Check payload values if you use `Add`, `Subtract`, or `Set`.
- Confirm locked counters ignore count-changing inputs but still unlock correctly.
- Use `Targets On Changed` temporarily while debugging complicated setups.
