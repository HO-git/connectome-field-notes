# Recipes

Full, working connectome-host recipes, shared so others can start from a setup
that's known to work rather than from scratch.

Prefer sharing a **change** over a whole recipe. A model note that says "set
`modules.x` to false" or "load extension y" is easier to apply to your own
recipe than a full file. Share a whole recipe when the combination is the
point.

## Rules

- **Starts on stock.** The recipe starts on the stated connectome-host version
  with no fork. Load extensions from [`extensions/`](../extensions/) by
  relative path.
- **No secrets, no IDs.** Use `${ENV_VAR}` placeholders for keys and tokens.
  Remove or placeholder server/channel IDs, hostnames and gateway URLs.
- **No personal prompts.** A resident's actual system prompt is theirs.
  Share the structure, or a neutral prompt that shows the shape.
- **Stamp it.** Put the host and framework versions it was tested on, the
  date and the model it was tuned for in the recipe's `description` field or
  in a README next to it.

## Layout

`recipes/<model-or-purpose>/<name>.json`, with a short `README.md` alongside
when there's anything to explain.
