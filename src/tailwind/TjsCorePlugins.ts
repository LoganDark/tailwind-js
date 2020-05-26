import {Map}                     from 'typescript'
import {IModule}                 from '../things'
import {TjsBoxSizingModule}      from './modules/TjsBoxSizingModule'
import {TjsClearModule}          from './modules/TjsClearModule'
import {TjsContainerModule}      from './modules/TjsContainerModule'
import {TjsDisplayModule}        from './modules/TjsDisplayModule'
import {TjsFloatModule}          from './modules/TjsFloatModule'
import {TjsObjectFitModule}      from './modules/TjsObjectFitModule'
import {TjsObjectPositionModule} from './modules/TjsObjectPositionModule'
import {TjsOverflowModule}       from './modules/TjsOverflowModule'
import {TjsPositionModule}       from './modules/TjsPositionModule'
import {TjsPreflightModule}      from './modules/TjsPreflightModule'
import {TjsCorePluginName}       from './TjsConfig'
import {TjsUpgradedConfig}       from './TjsUpgradedConfig'

export const tjsCorePlugins = new Map<TjsCorePluginName, (config: TjsUpgradedConfig) => IModule>()

tjsCorePlugins.set('preflight', config => new TjsPreflightModule(config))
tjsCorePlugins.set('container', config => new TjsContainerModule(config))
tjsCorePlugins.set('boxSizing', config => new TjsBoxSizingModule(config))
tjsCorePlugins.set('display', config => new TjsDisplayModule(config))
tjsCorePlugins.set('float', config => new TjsFloatModule(config))
tjsCorePlugins.set('clear', config => new TjsClearModule(config))
tjsCorePlugins.set('objectFit', config => new TjsObjectFitModule(config))
tjsCorePlugins.set('objectPosition', config => new TjsObjectPositionModule(config))
tjsCorePlugins.set('overflow', config => new TjsOverflowModule(config))
tjsCorePlugins.set('position', config => new TjsPositionModule(config))