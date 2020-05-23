import {Map}                from 'typescript'
import {IModule}            from '../things'
import {TjsContainerModule} from './modules/TjsContainerModule'
import {TjsPreflightModule} from './modules/TjsPreflightModule'
import {TjsCorePlugin}      from './TjsConfig'

export const tjsCorePlugins = new Map<TjsCorePlugin, (TjsConfig) => IModule>()

tjsCorePlugins.set('preflight', config => new TjsPreflightModule(config))
tjsCorePlugins.set('container', config => new TjsContainerModule(config))