import tw from 'tailwind-styled-components'

export const TitleLabel = tw.h2`
    font-semibold
    text-stone-200
    text-xl
`

export const DataflowTagInput = tw.input`
    p-2
    w-80
    bg-zinc-100
    rounded
    px-5
    transition-colors
    duration-300
    placeholder-slate-700

    hover:bg-zinc-200
    hover:focus:bg-zinc-200
    focus:bg-zinc-200
    outline
    outline-1
    outline-stone-800
    focus:outline-2
`
