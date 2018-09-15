import Moat from './moat'
import test from 'ava'
import { mockDOMSource, div, img } from '@cycle/dom'
import { mockTimeSource } from '@cycle/time'

const mockImg = {
  offsetLeft: 0,
  offsetTop: 0
}

test.cb('vnode$', (t) => {
  const Time = mockTimeSource()

  const mousemove = Time.diagram(
    '--b-c-d',
    {
      b: {
        pageX: 50,
        pageY: 50, 
        target: mockImg
      },
      c: {
        pageX: 450,
        pageY: 200,
        target: mockImg
      },
      d: {
        pageX: 400,
        pageY: 500,
        target: mockImg
      }
    }
  )

  const DOM = mockDOMSource({
    '.map': {
      mousemove: mousemove
    }
  })

  const { DOM: actualVNode$ } = Moat({ DOM })

  const expectedVNode$ = Time.diagram(
    'a-b-c-d',
    {
      a: div([
        img(
          '.map',
          {
            attrs: {
              src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
              alt: 'Chiang Mai map',
              width: '800px'
            },
            style: {
              filter: 'none'
            }
          }
        )
      ]),
      b: div([
        img(
          '.map',
          {
            attrs: {
              src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
              alt: 'Chiang Mai map',
              width: '800px'
            },
            style: {
              filter: 'none'
            }
          }
        )
      ]),
      c: div([
        img(
          '.map',
          {
            attrs: {
              src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
              alt: 'Chiang Mai map',
              width: '800px'
            },
            style: {
              filter: 'invert(.8)'
            }
          }
        )
      ]),
      d: div([
        img(
          '.map',
          {
            attrs: {
              src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chiang_Mai_map.png',
              alt: 'Chiang Mai map',
              width: '800px'
            },
            style: {
              filter: 'none'
            }
          }
        )
      ])
    }
  )

  Time.assertEqual(actualVNode$, expectedVNode$)
  Time.run(t.end)
})