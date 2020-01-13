import run from '@cycle/run'
import { makeDOMDriver, MainDOMSource, VNode, div, button } from '@cycle/dom'
import Moat from './moat'
import xs, { Stream } from 'xstream'
import { timeDriver } from '@cycle/time'

type Periodic = (arg0: number) => Stream<number>

interface Sources {
  DOM: MainDOMSource,
  Time: {
    periodic: Periodic
  }
}

interface Sinks {
  DOM: Stream<VNode>
}

run(
  ({ DOM, Time }: Sources) => {
    
    const playButton$: Stream<MouseEvent> = DOM
      .select('.play')
      .events('click')

    let toggle = false

    const isPLaying$: Stream<boolean> = playButton$
      .map( () => {
        toggle = !toggle
        return toggle 
      })

    
    const tick$ = Time.periodic(500) //tick every 100ms
      .fold(acc =>
        toggle === true
          ? acc < 10 ? acc + 1 : 0 //reset tick counter after 60 ticks
          : 0 // If not playing return 0 for each tick
      , 0) 
    
    
    const state$ = xs.combine(
      tick$,
      isPLaying$.startWith(false)
    )
    
    

    const vnode$ = state$
    .map(([tick, isPLaying]): VNode =>
      div([
        button(
          '.play', {
            style:{
              background: isPLaying ? 'purple' : 'gray'
            }},
            [
              isPLaying ? 'stop' : 'play'
            ]),
        
        div(['tick ' + tick]),

        div({
          style:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }
        },[
          div({style:{background: tick ===  0 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  1 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  2 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  3 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  4 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  5 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  6 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  7 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  8 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick ===  9 ? 'gold' : 'gray', color: 'white'}},['0']),
          div({style:{background: tick === 10 ? 'gold' : 'gray', color: 'white'}},['0']),
        ])
      
      ])
    )

    return {
      DOM: vnode$
    }
  },{
    DOM: makeDOMDriver('body'),
    Time: timeDriver
})
