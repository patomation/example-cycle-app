import { Stream } from 'xstream'
import { VNode, img, div, DOMSource } from '@cycle/dom'

interface Coords {
  x: number,
  y: number
}

interface Sources {
  DOM: DOMSource
}

interface Sinks {
  DOM: Stream<VNode>
}

const whetherInMoat = ({ x, y }: Coords) => x > 305 && x < 607 && y > 185 && y < 480

export default ({ DOM }: Sources): Sinks => {
  const mapCoords$: Stream<Coords> = DOM
    .select('.map')
    .events('mousemove')
    .map(({ pageX, pageY, target }: MouseEvent) => {
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
    .map((isInMoat) => div([
      img(
        '.map',
        {
          attrs: {
            src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
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
