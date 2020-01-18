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

    
    const tick$ = Time.periodic(100) //tick every 100ms
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
          },
          new Array(10).fill(0).map((_, index) => 
            div(
              {
                style:{
                  background: tick ===  index ? 'gold' : 'gray',
                  color: 'white',
                  height: '20px',
                  width: '20px'
                }
              },
              ['']),
          )
        )
      
      ])
    )

    return {
      DOM: vnode$
    }
  },{
    DOM: makeDOMDriver('body'),
    Time: timeDriver
})
