import tw from 'tailwind-styled-components'

// Types

type IOListProps = {
  type?: string
}

// Styles

export const Form = tw.form`
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

export const IOList = tw.div<IOListProps>`

    ${(props) => (props.type === 'output' && 'h-[28rem]') || 'h-64'}

    flex 
    flex-col 
    gap-3
    w-full 
    rounded 
    bg-stone-300 
    text-center 
    p-3 
    items-center
`

export const IOPlaceholder = tw.div`
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

export const AddIOButton = tw.button`
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
