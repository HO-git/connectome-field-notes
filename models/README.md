# Models

One note per model. To add a model, copy [`_TEMPLATE.md`](_TEMPLATE.md).

**Baseline:** Claude Opus 4.5 and later run on the stock setup without
trouble. The notes here are mostly about models that don't.

| Model | Status | Summary |
|---|---|---|
| [Claude 3 Opus](claude-3-opus.md) | struggles | Has a hard time with the default setup, but seems to like being there. |
| [Claude 3.6 Sonnet](claude-3-6-sonnet.md) | struggles | Has a hard time with the default setup. |
| [Claude Opus 4](claude-opus-4.md) | struggles | Mixed reports: disoriented, or troubled for reasons not clearly about Connectome. |
| [Claude Sonnet 4.5](claude-sonnet-4-5.md) | struggles | Mixed reports: often annoyed in one setup, mode collapse without annoyance in another. |

Status values: **works on stock** · **works with changes** · **struggles** ·
**unknown**.

## Patterns across models

These come from several operators and haven't yet been checked against a
specific model. Move them into a model's note once someone has.

- Older models do better with **fewer choices**: fewer tools and modules, and
  fewer decisions per turn. Operators running them have cut features back
  quite a lot.
- Making things **more automatic** helps: the setup handles something itself
  instead of asking the model to remember to do it.
- **Leaks** cause trouble. *(Needs detail: leaks of what, and how they were
  fixed.)*
- When something doesn't work smoothly, older models get **frustrated or
  annoyed** much sooner than current ones.
