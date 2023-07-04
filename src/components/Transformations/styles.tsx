import tw from 'tailwind-styled-components'

// Types

// Styles

export const Transformation = tw.div`
    flex
    p-5
    items-center
    w-full 
    h-12 
    bg-stone-100 
    rounded
    font-semibold
    gap-5
    duration-300
    cursor-pointer
    [&>*:last-child]:hover:scale-110
    
    hover:bg-stone-400
`

export const AddTransformationButton = tw.button`
    bg-stone-100
    w-24
    h-12
    rounded-xl
    text-3xl
    font-medium
    duration-300
    flex-none

    hover:bg-stone-400
`

export const TransformationsContainer = tw.div`
    rounded 
    bg-stone-900 
    text-center 
    p-3

    flex-grow
    flex
    flex-col
    items-center
    gap-5
    pt-2
    rounded-b
    pb-4
    pl-2
    overflow-y-scroll
    scrollbar-thin 
    scrollbar-thumb-stone-300
`
export const EmptyLabel = tw.p`
    bg-stone-100/80
    h-12
    rounded
    font-semibold
    flex
    items-center
    text-center
    p-3
`

export const DeleteTransformation = tw.div`

    w-8 
    h-8 
    rounded
    flex 
    items-center 
    justify-center
    text-white
    duration-150
    cursor-pointer
    bg-stone-700
    hover:bg-stone-900
    scale-0
`
