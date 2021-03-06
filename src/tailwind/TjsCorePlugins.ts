import {Map}                     from 'typescript'
import {IModule}                 from '../things'
import {TjsBoxSizingModule}      from './modules/TjsBoxSizingModule'
import {TjsClearModule}          from './modules/TjsClearModule'
import {TjsContainerModule}      from './modules/TjsContainerModule'
import {TjsDisplayModule}        from './modules/TjsDisplayModule'
import {TjsFloatModule}          from './modules/TjsFloatModule'
import {TjsHeightModule}         from './modules/TjsHeightModule'
import {TjsInsetModule}          from './modules/TjsInsetModule'
import {TjsMarginModule}         from './modules/TjsMarginModule'
import {TjsMaxHeightModule}      from './modules/TjsMaxHeightModule'
import {TjsMaxWidthModule}       from './modules/TjsMaxWidthModule'
import {TjsMinHeightModule}      from './modules/TjsMinHeightModule'
import {TjsMinWidthModule}       from './modules/TjsMinWidthModule'
import {TjsObjectFitModule}      from './modules/TjsObjectFitModule'
import {TjsObjectPositionModule} from './modules/TjsObjectPositionModule'
import {TjsOverflowModule}       from './modules/TjsOverflowModule'
import {TjsPaddingModule}        from './modules/TjsPaddingModule'
import {TjsPositionModule}       from './modules/TjsPositionModule'
import {TjsPreflightModule}      from './modules/TjsPreflightModule'
import {TjsSpaceModule}          from './modules/TjsSpaceModule'
import {TjsVisibilityModule}     from './modules/TjsVisibilityModule'
import {TjsWidthModule}          from './modules/TjsWidthModule'
import {TjsZIndexModule}         from './modules/TjsZIndexModule'
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
tjsCorePlugins.set('inset', config => new TjsInsetModule(config))
tjsCorePlugins.set('visibility', config => new TjsVisibilityModule(config))
tjsCorePlugins.set('zIndex', config => new TjsZIndexModule(config))

tjsCorePlugins.set('padding', config => new TjsPaddingModule(config))
tjsCorePlugins.set('margin', config => new TjsMarginModule(config))
tjsCorePlugins.set('space', config => new TjsSpaceModule(config))

tjsCorePlugins.set('width', config => new TjsWidthModule(config))
tjsCorePlugins.set('minWidth', config => new TjsMinWidthModule(config))
tjsCorePlugins.set('maxWidth', config => new TjsMaxWidthModule(config))
tjsCorePlugins.set('height', config => new TjsHeightModule(config))
tjsCorePlugins.set('minHeight', config => new TjsMinHeightModule(config))
tjsCorePlugins.set('maxHeight', config => new TjsMaxHeightModule(config))