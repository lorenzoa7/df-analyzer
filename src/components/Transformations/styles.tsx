import tw from 'tailwind-styled-components'

export const TransformationPlaceholder = tw.div`
    flex
    p-5
    items-center
    w-full 
    h-12 
    bg-stone-100 
    rounded
    font-semibold
    uppercase
    gap-5
    duration-300
    cursor-pointer
    
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
export const Label = tw.p`
    bg-stone-100/80
    h-12
    rounded
    font-semibold
    uppercase
    flex
    items-center
    text-center
    p-3
`
