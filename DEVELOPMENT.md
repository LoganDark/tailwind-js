# Developing on Tailwind-JS

Right now, all TJS needs is some more Tailwind modules. See `TODO.md`
for a list of he modules that it needs.

## Creating a new module

In order to make a new module, first try to find a module that's similar
to clone. If you can't find one, that's fine and you can always make one
from scratch, but it's always nice to take a look at how things are
already implemented to find out how you should implement the next thing.

Add your new module into the `src/tailwind/modules` directory. Modules
are typically named using Tailwind's naming scheme (the scheme you can
find in the `corePlugins` object in the config).

In order to add it as a core plugin (have `TjsGenerator` automatically
load it), you will need to do a few things:

- Edit `TjsCorePluginName` to include the name of your new module.
- In the default config's `corePlugins` object, add your new module at
  the bottom. 
- In `src/tailwind/TjsCorePlugins.ts`, at the bottom, add a map entry
  for your new module at the bottom.
- If you want to add a config for your module, like for example
  `container` or `inset`, add it to `TjsCorePluginConfigs` and add a
  default version to the default config.

Your module should now be loaded once you build the project (via
`npm run build`) and open `test.html`. Test out if your new classes are
present, and if so, yay!