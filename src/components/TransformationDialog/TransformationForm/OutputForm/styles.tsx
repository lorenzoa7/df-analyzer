import tw from 'tailwind-styled-components'

export const Form = tw.div`
    flex
    flex-col
    p-5
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

export const InputGroup = tw.div`
    flex
    flex-col
    gap-2
`

export const OutputAttributeList = tw.div`
    flex 
    flex-col 
    gap-3
    w-full 
    h-64
    rounded 
    bg-stone-400 
    text-center 
    p-3 
    items-center
`

export const OutputAttribute = tw.div`
    flex
    p-5
    items-center
    w-full 
    text-white
    h-12 
    bg-stone-600 
    rounded
    font-semibold
    uppercase
    gap-5
    duration-300
    cursor-pointer
    
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
export const EmptyLabel = tw.p`
    bg-stone-600/80
    text-white
    h-12
    rounded
    font-semibold
    uppercase
    flex
    items-center
    text-center
    p-3
`
