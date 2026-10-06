# Patches

**Last resort.** Use this only for changes that no
[extension](../docs/extensions.md) or recipe setting can reach. A patch is
tied to one upstream commit and starts going stale the day it's written.

## Format

`patches/<repo>/<short-name>.patch`, made with `git format-patch` or
`git diff`, with a header like this at the top of the file (or in a README
next to it):

```
Repo:        anima-research/connectome-host
Base commit: <full sha>
Date:        YYYY-MM-DD
For:         <models, linking their notes in models/>
Why not an extension: <what the extension seam can't reach>
Upstream issue: <link, or "none yet">
```

The **upstream issue** line matters most. If you needed a patch, upstream is
missing a seam or a setting, and the issue is how that gets fixed for
everyone. See [`docs/upstreaming.md`](../docs/upstreaming.md).

A patch whose base is more than a couple of months behind upstream main, and
that nobody has refreshed, may be moved to `patches/stale/`.
