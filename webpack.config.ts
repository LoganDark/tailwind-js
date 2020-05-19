import * as path        from 'path'
import {WebpackOptions} from 'webpack/declarations/WebpackOptions'

const config: WebpackOptions = {
	entry : path.resolve(__dirname, 'src/main.ts'),
	output: {
		filename: 'main.js',
		path    : path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use : 'ts-loader'
			}
		]
	}
}

module.exports = config