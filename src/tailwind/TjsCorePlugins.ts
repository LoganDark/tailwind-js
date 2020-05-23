import {Map}                from 'typescript'
import {IModule}            from '../things'
import {TjsBoxSizingModule} from './modules/TjsBoxSizingModule'
import {TjsContainerModule} from './modules/TjsContainerModule'
import {TjsDisplayModule}   from './modules/TjsDisplayModule'
import {TjsPreflightModule} from './modules/TjsPreflightModule'
import {TjsCorePlugin}      from './TjsConfig'

export const tjsCorePlugins = new Map<TjsCorePlugin, (TjsConfig) => IModule>()

tjsCorePlugins.set('preflight', config => new TjsPreflightModule(config))
tjsCorePlugins.set('container', config => new TjsContainerModule(config))
tjsCorePlugins.set('boxSizing', config => new TjsBoxSizingModule(config))
tjsCorePlugins.set('display', config => new TjsDisplayModule(config))