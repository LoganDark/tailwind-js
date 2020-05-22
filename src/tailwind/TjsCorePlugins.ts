import {Map}                from 'typescript'
import {IModule}            from '../things'
import {TjsContainerModule} from './modules/TjsContainerModule'
import {TjsPreflightModule} from './modules/TjsPreflightModule'
import {TjsCorePlugin}      from './TjsConfig'

export const TjsCorePlugins = new Map<TjsCorePlugin, (TjsConfig) => IModule>()

TjsCorePlugins.set('preflight', config => new TjsPreflightModule(config))
TjsCorePlugins.set('container', config => new TjsContainerModule(config))