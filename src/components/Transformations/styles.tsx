import tw from "tailwind-styled-components"

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
    text-2xl
    font-bold
    duration-300
    text-center


    hover:bg-stone-400
`

export const TransformationsList = tw.div`
    flex 
    flex-col 
    gap-5 
    w-full 
    h-full 
    rounded 
    bg-stone-900 
    text-center 
    p-3 
    items-center
`
