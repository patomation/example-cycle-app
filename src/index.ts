import run from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import Moat from './moat'

run(Moat, {
  DOM: makeDOMDriver('body')
})
