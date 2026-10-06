# example-pinboard

A minimal extension showing the mechanics: one module, one tool, and
persistent state. It is a template to copy, not a tested fix for any model.

The agent gets one tool, `pinboard--board`, with three actions:

- `list` shows the pins
- `pin` adds one (`text`)
- `unpin` removes one by its number (`number`)

Pins are kept in the module's state in the agent's Chronicle, so they survive
restarts. The board holds `maxPins` entries (default 10) of up to 500
characters each.

## Use it

Add this to your recipe, with `path` relative to the recipe file:

```json
"extensions": {
  "pinboard": {
    "kind": "module",
    "path": "../connectome-field-notes/extensions/example-pinboard/index.ts",
    "config": { "maxPins": 10 }
  }
}
```

## Tested

| | |
|---|---|
| connectome-host | 0.9.0 (main @ `dec7658`) |
| agent-framework | 0.21.0 |
| Date | 2026-10-06 |
| How | Booted the host with the `mock` provider: the extension loaded and `pinboard--board` was in the request's tool list. Then drove every action through the host's own `loadRecipe` → `loadExtensions` → factory path, including state surviving a module restart. Not yet run with a real model. |

## Files

- [`index.ts`](index.ts): the whole extension. It imports only types from
  `@animalabs/agent-framework` and declares the small piece of the host's
  extension API it uses, so it has no runtime dependencies.
