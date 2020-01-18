import run from '@cycle/run'
import { makeDOMDriver, MainDOMSource, VNode, div, button, span, input } from '@cycle/dom'
import xs, { Stream } from 'xstream'
import { timeDriver } from '@cycle/time'

type Periodic = (arg0: number) => Stream<number>

interface TickAction {
  kind: 'tick'
}
interface SetBarCountAction {
  kind: 'setBarCount'
  value: number
}
interface TogglePlaybackAction {
  kind: 'togglePlayback'
}

interface SetBpmAction {
  kind: 'setBpm'
  value: number
}

// This is a union type
type Action =
  TickAction |
  SetBarCountAction |
  TogglePlaybackAction |
  SetBpmAction

interface State {
  isPlaying: boolean
  barCount: number
  bpm: number
  step: number
  tick: number
}

interface Sources {
  DOM: MainDOMSource
  Time: {
    periodic: Periodic
  }
}

interface Sinks {
  DOM: Stream<VNode>
}

const initialState: State = {
  isPlaying: false,
  barCount: 1,
  bpm: 120,
  step: 0,
  tick: 0
}

const bpmToMs = (bpm: number): number => 60 / bpm * 1000

const tickInterval = 10
run(
  ({ DOM, Time }: Sources) => {
    const tickAction$: Stream<TickAction> = Time.periodic(tickInterval) // tick every 500ms
      .map(() => ({ kind: 'tick' as 'tick' }))

    const setBarCountAction$: Stream<SetBarCountAction> = DOM
      .select('.bar')
      .events('input')
      .map(e => ({
        kind: 'setBarCount',
        value: parseInt((e.target as HTMLInputElement).value)
      }))

    const togglePlayback$: Stream<TogglePlaybackAction> = DOM
      .select('.play')
      .events('click')
      .mapTo({ kind: 'togglePlayback' })

    const setBpmAction$: Stream<SetBpmAction> = DOM
      .select('.bpm')
      .events('input')
      .map(e => ({
        kind: 'setBpm',
        value: parseInt((e.target as HTMLInputElement).value)
      }))

    const action$: Stream<Action> = xs.merge(
      tickAction$,
      setBarCountAction$,
      togglePlayback$,
      setBpmAction$
    )
    const state$: Stream<State> = action$
      .fold((state, action) => {
        switch (action.kind) {
          case 'tick':
            state.tick += tickInterval
            if (!state.isPlaying) break
            state.step = Math.floor(state.tick / bpmToMs(state.bpm))
            // wetherStep?
            // console.log(state.tick % bpmToMs(state.bpm))
            // if (bpmToMs(state.bpm) % state.tick === 0) {
            // console.log('step?')

            // state.step = state.step < ((state.barCount * 4) - 1)
            //   ? state.step + 1
            //   : 0
            // }

            break
          case 'setBarCount':
            state.barCount = action.value
            state.step = state.step < ((action.value * 4) - 1) ? state.step + 1 : 0
            break
          case 'togglePlayback':
            state.isPlaying = !state.isPlaying
            break
          case 'setBpm':
            state.bpm = action.value
            break
          default:
            break
        }
        return state
      }, initialState)

    const vnode$ = state$
      .map(({ step, tick, isPlaying, bpm, barCount }): VNode =>
        div([
          div(
            {
              style: {
                diplay: 'flex'
              }
            }, [
              button(
                '.play', {
                  style: {
                    background: isPlaying ? 'purple' : 'gray'
                  }
                },
                [
                  isPlaying ? 'stop' : 'play'
                ]),
              span([`step ${step}`]),
              span([`tick ${tick}`]),
              input(
                '.bpm', {
                  attrs: {
                    type: 'number',
                    value: bpm
                  }
                }),
              input(
                '.bar', {
                  attrs: {
                    type: 'number',
                    value: barCount
                  }
                })
            ]),

          div({
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          },
          new Array(barCount * 4).fill(0).map((_, index) =>
            div(
              {
                style: {
                  // background: tick ===  index
                  //   ? 'gold'
                  //   : 'gray',
                  background: index % 4 === 0 ? 'gold' : 'gray',
                  color: 'white',
                  height: '20px',
                  width: '20px',
                  margin: '1px',
                  ...(step === index
                    ? { filter: 'brightness(50%)' }
                    : null)
                }
              },
              [''])
          )
          )

        ])
      )

    return {
      DOM: vnode$
    }
  }, {
    DOM: makeDOMDriver('body'),
    Time: timeDriver
  })
