import tw from 'tailwind-styled-components'

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
