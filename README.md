# Connectome field notes

Shared notes, recipes and extensions for running models on
[Connectome](https://github.com/anima-research/connectome-host), with older
models as the main focus. Many of them have a hard time with the default
setup.

People running Connectome keep running into the same model-specific problems
and solving them on their own: a patch on one VPS, a custom tool in a fork, a
prompt tweak that never got written down. This repo is where that knowledge
goes, so the next person bringing up Gemini 2.5 Pro or 3 Opus doesn't spend
tokens working it out again.

Things that will never belong upstream are welcome here. Things that *should*
go upstream start here too (see [the path upstream](docs/upstreaming.md)).

## What's here

| Path | What it holds |
|---|---|
| [`models/`](models/) | One note per model: what goes wrong, what helped, what didn't, and which versions it was tested on. **Start here.** |
| [`extensions/`](extensions/) | Host extensions: modules and strategies loaded by a recipe, with no fork needed. |
| [`recipes/`](recipes/) | Full working recipes, scrubbed, each tagged with the host version it was tested on. |
| [`patches/`](patches/) | Last resort: diffs for changes that no extension can reach. Each is pinned to a base commit and will go stale. |
| [`docs/`](docs/) | [Why and how to build extensions](docs/extensions.md) · [Getting a fix upstream](docs/upstreaming.md) |

## Make your changes as extensions, not forks

If you change how Connectome behaves for a model, write the change as an
**extension** where you can, rather than editing a fork of connectome-host or
agent-framework.

A forked host has to be merged with upstream every time upstream moves, and
upstream moves almost daily. Forks fall behind, and fixes end up applied
unevenly across machines. With an extension, your host checkout stays a
plain upstream checkout, so upgrading is still `git pull` and a restart. Your
change lives in its own file, outside the host tree, and a three-line
`extensions` block in your recipe loads it. If an upstream change breaks it,
the breakage stays inside your extension and shows up as an error that names
it: a failed load at startup, or a type error when this repo's CI checks
extensions against the latest framework release. You don't get a merge that
quietly went wrong. It is also easy to share: someone else tries it by adding
those same three lines to their recipe.

[`docs/extensions.md`](docs/extensions.md) covers how this works, what
extensions can and can't reach, and a small working example.

## How to use this

1. Find your model in [`models/`](models/). If it isn't there, copy
   [`models/_TEMPLATE.md`](models/_TEMPLATE.md) and start a note, even if
   all you have is symptoms.
2. Check the versions on anything you borrow. Notes, recipes and extensions
   each say which host and framework versions they were tested against. Treat
   anything older than a few weeks as a lead to check, not a fix.
3. Write back what happened, including "tried X, didn't help." Negative
   results save as many tokens as positive ones.

## Ground rules

This repo is **public**. Please read [CONTRIBUTING.md](CONTRIBUTING.md); in
short:

- **No secrets.** No API keys, bot tokens, server/channel IDs or gateway
  URLs. Use `${ENV_VAR}` placeholders. CI scans every push.
- **No private conversations.** Paraphrase what a model said, or quote a short
  scrubbed excerpt with the operator's OK. Never commit raw chronicles or logs,
  and never name people or describe someone's companion without their consent.
- **Stamp versions and dates** on every note, recipe and extension.
- **Read extension code before you run it.** An extension runs inside your
  agent's process, with your agent's keys.

## License

[MIT](LICENSE).
