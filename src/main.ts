import {DomClassObserver}   from './dom/DomClassObserver'
import {DomStyleMaintainer} from './dom/DomStyleMaintainer'
import {TjsGenerator}       from './tailwind/TjsGenerator'

/*
const gen = new TjsGenerator()
gen.genClass('container')
console.log(gen.toCssText())
*/

// step 1: make a TJS generator
const gen = new TjsGenerator()
// step 2: pipe classes into it
const observer = new DomClassObserver()
observer.pipe(gen)
observer.attach(document.getRootNode())
// step 3: make it into a style element
const maintainer = new DomStyleMaintainer(gen)
// step 4: insert style into dom
document.head.appendChild(maintainer.getElement())

setTimeout(() => {
	gen.on('cssChanged', () => console.log('CSS changed!'))

	const div = document.createElement('div')
	div.className = 'container'

	console.log('OK, appending element to the DOM...')
	document.body.appendChild(div)
}, 1000)