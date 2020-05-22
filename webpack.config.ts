import * as path        from 'path'
import {WebpackOptions} from 'webpack/declarations/WebpackOptions'

const config: WebpackOptions = {
	devtool: 'source-map',
	mode   : 'development',
	resolve: {
		extensions: [
			'.js',
			'.ts'
		]
	},
	entry  : path.resolve(__dirname, 'src/main.ts'),
	output : {
		filename: 'main.js',
		path    : path.resolve(__dirname, 'dist')
	},
	module : {
		rules: [
			{
				test: /\.ts$/,
				use : 'ts-loader'
			},
			{
				test: {not: [/\.[jt]s$/]},
				use : 'raw-loader'
			}
		]
	}
}

module.exports = config