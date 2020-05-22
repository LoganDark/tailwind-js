import {TjsGenerator} from './tailwind/TjsGenerator'

const gen = new TjsGenerator()
gen.genClass('container')
console.log(gen.toCssText())