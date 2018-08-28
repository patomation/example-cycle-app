import run from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import OldCity from './old-city'

run(OldCity as any, {
  DOM: makeDOMDriver('body')
})
