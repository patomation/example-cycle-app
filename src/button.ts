import { button, VNode } from '@cycle/dom'

interface Sources{
  title: string
}

export const fancyButton = ({ title }: Sources): VNode => {
  return button(
    {
      style: {
        background: 'gold',
        color: '#333',
        display: 'inline-block',
        fontFamily: 'sans-serif',
        fontSize: '1rem',
        cursor: 'pointer',
        textAlign: 'center',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        textDecoration: 'none',
        margin: '0',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        MsUserSelect: 'none',
        transition: 'background 150ms ease-in-out, color 150ms ease-in-out, transform 150ms ease'
      }
    },
    [title])
}
