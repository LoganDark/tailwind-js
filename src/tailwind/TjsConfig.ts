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

export type TjsSpacingCallback = (unit: string) => string

export interface TjsSpacing {
	[key: string]: string | TjsSpacingCallback
}

export interface TjsTheme {
	screens: TjsScreens,
	spacing: TjsSpacing
}

export interface TjsContainerModuleConfig {
	center: boolean,
	padding: string | {[bp: string]: string}
}

export interface TjsCorePluginConfigs {
	container: TjsContainerModuleConfig,
	inset: TjsSpacing
}

export type TjsCorePluginName = 'preflight' | 'container' | 'boxSizing' | 'display' | 'float' | 'clear' | 'objectFit' | 'objectPosition' | 'overflow' | 'position' | 'inset' | 'visibility' | 'zIndex'

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
		spacing  : {
			'^[-+]?(?:\\d+\\.?|\\d*\\.\\d+)$': (unit) => (+unit * 0.25) + 'rem',
			'^[-+]?\\d+px$'                  : (unit) => unit,
			'^[-+]?\\d+/\\d+$'               : (unit: string) => {
				const split = unit.split('/')
				return +split[0] / +split[1] * 100 + '%'
			},
			'px'                             : '1px',
			'auto'                           : 'auto'
		},
		container: {
			center : false,
			padding: ''
		},
		inset    : {}
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
		position      : true,
		inset         : true,
		visibility    : true,
		zIndex        : true
	}
}