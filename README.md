# Tailwind-JS
Tailwind-JS aims to be a reimplementation of the
[Tailwind spec](https://tailwindcss.com/docs/installation) where classes are
generated on-demand rather than all at once.

This has many advantages:
- You **no longer get ridiculously large CSS files** by default. You only get
  the classes you actually use!
- These stylesheets can be **dynamically generated in the browser as they are
  discovered**, meaning the development experience is no longer limited by silly
  things like whether or not you included `py-17` in the development build.
  (Hint: You probably didn't, but Tailwind-JS can see `py-17` and know what to
  do!)
- **Builds can be faster** because you aren't generating tons of CSS and
  then trimming it down. You are only generating what you need!
- Want a 2 pixel wide border? No need to define it manually, just **use
  `border-2px` and Tailwind-JS will handle it all for you**!
- You can **include Tailwind-JS in a playground like Codepen or JSFiddle** and
  not worry about the CDN build changing... because your classes are what
  generate the CSS!

Right now, it's in an early stage of development. But things are looking
quite promising, and all there is to do is implement all of Tailwind's
modules, and then probably some build plugins and other miscellaneous
tools.