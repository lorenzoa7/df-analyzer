import tw from 'tailwind-styled-components'

// Types

type EmptyLabelProps = {
  $light?: boolean
}

type TransformationItemProps = {
  $selected?: boolean
}

type PreviewProps = {
  $preview?: boolean
}

// Styles

export const Form = tw.form`
    flex
    flex-col
    w-full
    gap-5
`

export const Label = tw.p`
    font-bold
`

export const Input = tw.input`
    p-2
    bg-stone-100
    ring-1
    ring-stone-600
    rounded
`

export const InputGroup = tw.div<PreviewProps>`

    ${(props) => (props.$preview ? 'contrast-75 pointer-events-none' : '')}

    flex
    flex-col
    gap-2
`

export const InputAttributeList = tw.div`
    flex 
    flex-col 
    items-center
    gap-3
    w-full 
    h-64
    rounded 
    bg-stone-300 
    text-center 
    p-3 
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-700
`

export const InputAttribute = tw.div<PreviewProps>`

    ${(props) => (props.$preview ? 'pointer-events-none' : '')}

    flex
    p-5
    items-center
    w-full 
    text-white
    h-12 
    bg-stone-600 
    rounded
    font-semibold
    gap-5
    duration-300
    cursor-pointer 
    [&>*:last-child]:hover:scale-110 
    
    hover:bg-stone-900
`

export const AddAttributeButton = tw.button`
    bg-stone-600
    w-24
    h-12
    rounded-xl
    text-2xl
    text-white
    font-bold
    duration-300

    hover:bg-stone-900
`
export const AddButtonContainer = tw.div`
    w-full 
    h-12
`
export const EmptyLabel = tw.p<EmptyLabelProps>`

    ${(props) =>
      props.$light
        ? 'bg-stone-100/80 text-black'
        : 'bg-stone-600/80 text-white'}

    h-12
    rounded
    font-semibold
    flex
    items-center
    text-center
    p-3
`
export const DeleteAttribute = tw.div`
    w-8 
    h-8 
    rounded
    flex 
    items-center 
    justify-center
    text-black
    duration-150
    cursor-pointer
    bg-stone-200
    hover:bg-stone-400
    scale-0
`

export const Container = tw.div`
    flex
    items-center
    justify-center
    w-full
    gap-3
    p-5
`
export const TransformationListContainer = tw.div`
    flex
    flex-col
    items-center
    gap-3
    w-2/4
    p-3
    h-96
    bg-stone-900
    text-white
    rounded
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-300
`
export const TransformationItem = tw.div<TransformationItemProps>`

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
