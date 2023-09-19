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
    gap-3
`

export const LineList = tw.ul`
    bg-zinc-100
    w-full
    h-full
    flex
    flex-col
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-700
    rounded
`

export const CodeLine = tw.li<CodeLineProps>`

    ${(props) => (props.$even ? 'bg-zinc-300' : 'bg-zinc-100')}

    flex
    items-center
    w-full
    px-4
    group
    py-2
`

export const LineNumber = tw.span`
    w-8
    text-zinc-500
`

export const CodeText = tw.span`
    ml-2
    w-full
`
export const AddTaskButton = tw.div`
    w-6
    h-6
    rounded
    flex 
    items-center 
    justify-center
    text-white
    duration-150
    cursor-pointer
    bg-stone-700
    hover:bg-stone-900
`
