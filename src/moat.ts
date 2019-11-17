import { Stream } from 'xstream'
import { VNode, img, div, MainDOMSource } from '@cycle/dom'

interface Coordinates {
  x: number
  y: number
}

interface Sources {
  DOM: MainDOMSource
}

interface Sinks {
  DOM: Stream<VNode>
}

const whetherInMoat = ({ x, y }: Coordinates): boolean => x > 305 && x < 607 && y > 185 && y < 480

export default ({ DOM }: Sources): Sinks => {
  const mapCoords$: Stream<Coordinates> = DOM
    .select('.map')
    .events('mousemove')
    .map(({ pageX, pageY, target }: MouseEvent): Coordinates => {
      const map = target as HTMLImageElement
      return {
        x: pageX - map.offsetLeft,
        y: pageY - map.offsetTop
      }
    })

  const isInMoat$ = mapCoords$
    .map(whetherInMoat)

  const vnode$ = isInMoat$
    .startWith(false)
    .map((isInMoat): VNode => div([
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
