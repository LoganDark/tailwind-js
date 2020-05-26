export type RecursivePartial<T> = T extends Object ? {
	[P in keyof T]?: RecursivePartial<T[P]>
} : T

export type TjsScreenRangeWithMin = {min: string, max?: string}
export type TjsScreenRangeWithMax = {min?: string, max: string}
export type TjsScreenRangeWithRaw = {raw: string}
export type TjsScreenRange = string | TjsScreenRangeWithMin | TjsScreenRangeWithMax | TjsScreenRangeWithRaw
export type TjsScreenBreakpoint = TjsScreenRange | TjsScreenRange[]

export interface TjsScreens {
	[name: string]: TjsScreenBreakpoint
}

export interface TjsTheme {
	screens: TjsScreens
}

export interface TjsContainerModuleConfig {
	center: boolean,
	padding: string | {[bp: string]: string}
}

export interface TjsCorePluginConfigs {
	container: TjsContainerModuleConfig
}

export type TjsCorePluginName = 'preflight' | 'container' | 'boxSizing' | 'display' | 'float' | 'clear' | 'objectFit' | 'objectPosition' | 'overflow' | 'position'

export type TjsCorePlugins = {
	[plugin in TjsCorePluginName]: boolean
}

export interface TjsConfig {
	theme: TjsTheme & TjsCorePluginConfigs,
	corePlugins: TjsCorePlugins
}

export const defaultTjsConfig: TjsConfig = {
	theme      : {
		screens  : {
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			dark: {'raw': '(prefers-color-scheme: dark)'}
			// => @media (prefers-color-scheme: dark) { ... }
		},
		container: {
			center : false,
			padding: ''
		}
	},
	corePlugins: {
		preflight     : true,
		container     : true,
		boxSizing     : true,
		display       : true,
		float         : true,
		clear         : true,
		objectFit     : true,
		objectPosition: true,
		overflow      : true,
		position      : true
	}
}