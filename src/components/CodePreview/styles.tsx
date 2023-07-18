import tw from 'tailwind-styled-components'

type CodeLineProps = {
  $even?: boolean
}

export const Container = tw.div`
    flex
    flex-col
    items-center
    w-full
    h-full
`

export const LineList = tw.ul`
    bg-zinc-100
    w-full
    h-[600px]
    flex
    flex-col
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-700
`

export const CodeLine = tw.li<CodeLineProps>`

    ${(props) => (props.$even ? 'bg-zinc-300' : 'bg-zinc-100')}

    flex
    items-center
    w-full
    px-4
`

export const LineNumber = tw.span`
    w-8
    text-zinc-500
`

export const CodeText = tw.span`
    ml-2
    w-full
`
