# TODO

For your convenience, a complete archive on the Wayback Machine has been made,
including all documentation pages. You should use this as a reference when
contributing to TJS, and NOT the latest version.

Archive: <https://web.archive.org/web/20200527061643/https://tailwindcss.com/docs/installation/>

Here's also a reference to the default configuration for that version of
Tailwind, which does NOT include Inter as part of its font stack:

Default config: <https://github.com/tailwindcss/tailwindcss/blob/fbd155d2dd6c619dfb8eb356a04e0e4c14cb9a23/stubs/defaultConfig.stub.js>

This is the version of Tailwind that TJS is currently targeting. Any new
features should not be added until everything from 1.4.5 is implemented. Once
that's done, newer features will be added.

Done:
- The entire Layout section
- Spacing section
- Sizing section

Partially done:
- Preflight (doesn't support custom font stack, yet, waiting on Font Family)

To do:
- Flexbox section
- Grid section
- ~~Spacing section~~
- ~~Sizing section~~
- Typography section
- Backgrounds section
- Borders section
- Tables section
- Effects section
- Transitions section
- Transforms section
- Interactivity section
- SVG section
- Screen Readers section

Also:
- Screen size breakpoints (md: prefix and others)
- Pseudo-class variants (hover: prefix and others)
- Groups (group class and group-...: prefixes)

Configuration is aiming to be a superset of the Tailwind config, i.e. everything
that Tailwind currently documents, TJS will accept. Note that this doesn't
include UNDOCUMENTED features, like the ability to specify `min-width` instead
of `min` in screen breakpoints. That may be added in the future, but for now I'm
focusing on documented features.

All work is mainly going to be done in the tailwind subdirectory, since the rest
of the code is pretty much done. test.html will be updated to be better in the
future, but for now you can just visit the page and use inspect element to
change classes on elements and watch them appear magically.