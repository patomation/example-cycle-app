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

const isInMoat = ({ x, y }: Coords) => x > 305 && x < 607 && y > 185 && y < 480

export default ({ DOM }: Sources): Sinks => {
  const mapCoords$ = DOM
    .select('.map')
    .events('mousemove')
    .map(({ pageX, pageY, target }: MouseEvent) => {
      const map = target as HTMLImageElement
      return {
        x: pageX - map.offsetLeft,
        y: pageY - map.offsetTop
      } as Coords | null
    })
    .startWith(null)
  
  const vnode$ = mapCoords$ 
    .map((coords) => div([
      img(
        '.map',
        {
          attrs: {
            src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
            alt: 'Chiang Mai map',
            width: '800px'
          },
          style: {
            filter: coords !== null && isInMoat(coords) ? 'invert(.8)' : 'none'
          }
        }
      )
    ]))
  return {
    DOM: vnode$
  }
}
