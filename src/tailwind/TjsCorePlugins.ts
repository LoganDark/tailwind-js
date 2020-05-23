import {Map}                from 'typescript'
import {IModule}            from '../things'
import {TjsBoxSizingModule} from './modules/TjsBoxSizingModule'
import {TjsContainerModule} from './modules/TjsContainerModule'
import {TjsDisplayModule}   from './modules/TjsDisplayModule'
import {TjsFloatModule}     from './modules/TjsFloatModule'
import {TjsPreflightModule} from './modules/TjsPreflightModule'
import {TjsCorePluginName}  from './TjsConfig'

export const tjsCorePlugins = new Map<TjsCorePluginName, (TjsConfig) => IModule>()

tjsCorePlugins.set('preflight', config => new TjsPreflightModule(config))
tjsCorePlugins.set('container', config => new TjsContainerModule(config))
tjsCorePlugins.set('boxSizing', config => new TjsBoxSizingModule(config))
tjsCorePlugins.set('display', config => new TjsDisplayModule(config))
tjsCorePlugins.set('float', config => new TjsFloatModule(config))