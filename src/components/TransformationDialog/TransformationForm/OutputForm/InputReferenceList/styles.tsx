import tw from 'tailwind-styled-components'

// Types

type InputItemProps = {
  $selected?: boolean
}

// Styles

export const Container = tw.div`
    flex
    flex-col
    p-5
    w-full
    gap-5
    items-center
    bg-stone-900
    rounded
`

export const Label = tw.span`
    text-lg
    text-white
    font-medium
`

export const InputsList = tw.div`
    flex
    flex-col
    items-center
    gap-3
    w-full
    p-3
    h-96
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-300
`

export const InputItem = tw.div<InputItemProps>`

    ${(props) =>
      props.$selected
        ? 'bg-stone-500 text-white'
        : 'bg-stone-100 text-black hover:bg-stone-300'}

    flex
    p-5
    items-center
    w-full 
    h-12 
    rounded
    font-semibold
    gap-5
    duration-300
    cursor-pointer
`

export const EmptyLabel = tw.span`
    bg-stone-100/80
    h-12
    rounded
    font-semibold
    flex
    items-center
    text-center
    p-3
`
