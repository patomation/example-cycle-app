import xs, { Stream } from 'xstream' // Observable library L(. )(. )K
import { VNode, img, div, MainDOMSource, input, h1, span } from '@cycle/dom'
import delay from 'xstream/extra/delay'
import { fancyButton } from './button'

interface Coordinates {
  x: number
  y: number
} // bad comment

interface Sources {
  DOM: MainDOMSource
}

interface Sinks {
  DOM: Stream<VNode>
}// cool comment

const whetherInMoat = ({ x, y }: Coordinates): boolean => x > 305 && x < 607 && y > 185 && y < 480

export default ({ DOM }: Sources): Sinks => {
  const mapSource = DOM
    .select('.map')

  const inputValue$ = DOM
    .select('.myInput')
    .events('input')
    .map(e => (e.target as HTMLInputElement).value)

  const mapClick$: Stream<MouseEvent> = mapSource
    .events('click')

  const mapClickCount$: Stream<number> = mapClick$
    .fold(acc => acc + 1, 0)

  const mapCoords$: Stream<Coordinates> = mapSource
    .events('mousemove')
    .compose(delay(1000))
    .map(({ pageX, pageY, target }: MouseEvent): Coordinates => {
      const map = target as HTMLImageElement
      return {
        x: pageX - map.offsetLeft,
        y: pageY - map.offsetTop
      }
    })

  const isInMoat$ = mapCoords$
    .map(whetherInMoat)

  const state$ = xs.combine(
    isInMoat$.startWith(false),
    mapClickCount$,
    inputValue$.startWith('')
  )

  const vnode$ = state$
    .map(([isInMoat, mapClickCount, inputChange]): VNode => div(
      [
        div({
          style: {
            display: 'flex',

            // justifyItems: 'stretch',
            // alignItems: 'center',
            // textAlign: 'center'
            justifyContent: 'space-between'

          }
        },
        [
          div(
            {
              style: {
                fontSize: '200px',
                fontWeight: 'bold',
                color: 'red'
              }
            },
            [mapClickCount.toString()]),
          input(
            '.myInput'
          ),
          h1([inputChange]),
          fancyButton({ title: 'nice button dude' }),
          span(['NICE CODE BRO'])
        ]),
        img(
          '.map',
          {
            attrs: {
              src: '/map.png',
              alt: 'Chiang Mai map',
              width: '800px'
            },
            style: {
              filter: isInMoat ? 'invert(.8)' : 'none'
            }
          }
        )

      ]))
  return {
    DOM: vnode$
  }
}
