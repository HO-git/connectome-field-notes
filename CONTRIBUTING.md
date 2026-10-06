# Contributing

Thank you! Partial notes are welcome. A model note with only symptoms, or a
"tried X, didn't help," is useful.

## What gets merged

| Kind | Bar |
|---|---|
| Model notes (`models/`) | Merged freely, as long as they follow the privacy rules below. |
| Docs (`docs/`) | Accurate for the versions stated. |
| Extensions (`extensions/`) | Readable source (no minified or generated code); a README stating what it does, what it was tested on, and anything it does beyond the agent's own process (network calls, files outside the store); passes `npm run check`. |
| Recipes (`recipes/`) | Starts on the stated stock connectome-host version, with secrets as `${ENV_VAR}` placeholders. |
| Patches (`patches/`) | Base commit recorded, plus the reason no extension can do it. See [`patches/README.md`](patches/README.md). |

## This repo is public

### No secrets

- No API keys, bot tokens, OAuth tokens, private keys or passwords.
- No Discord or Zulip server, channel or user IDs, and no internal hostnames,
  IPs or gateway URLs.
- In recipes, use `${ENV_VAR}` placeholders. The host fills them in from the
  environment.
- CI runs a secret scanner on every push and pull request. If it flags
  something real, **rotate the secret.** Deleting the commit isn't enough,
  because it was public the moment it was pushed.

### No private conversations

The evidence that helps most (what a model said, how it reacted) is also the
easiest way to leak something private.

- **Paraphrase** by default. A short quoted excerpt is fine when the operator
  agrees and it has been scrubbed.
- **Never** commit raw chronicles, `llm-calls` logs, session stores or
  transcripts.
- **No people.** Don't name or describe the humans in a conversation, or
  details of someone's personal setup or companion, without their consent.
- A model's own account of its difficulties deserves care too. Report it the
  way you'd want your own complaints reported.

### Stamp versions and dates

Connectome changes fast. Every note, recipe and extension says which
connectome-host and agent-framework versions (or commits) it was tested with,
and when. Something without a date is hard to trust.

## Extensions run with full access

An extension runs inside the agent's process, with its API keys, its store
and the filesystem. Reviewers read every line of an extension before merging
it, and anyone loading one should do the same.

## Checks

```sh
npm install --ignore-scripts
npm run check    # type-checks everything under extensions/
```

CI runs the same check on every pull request, and weekly against the newest
agent-framework release so we hear early when an upstream change breaks an
extension.
