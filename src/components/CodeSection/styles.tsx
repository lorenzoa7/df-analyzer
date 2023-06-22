import tw from 'tailwind-styled-components'

export const Section = tw.section`
    flex 
    flex-col 
    w-full 
    h-full 
    gap-4 
    pb-5
`

export const TitleLabel = tw.h2`
    font-semibold
    text-stone-200
    text-xl
`

export const CodeInput = tw.textarea`
    p-2
    w-full
    h-full
    resize-none
    bg-stone-100
    rounded
    px-5
    transition-colors
    duration-300
    placeholder-slate-700

    hover:bg-stone-200
    hover:focus:bg-stone-200
    focus:bg-stone-200
    outline
    outline-2
    outline-stone-800
    focus:outline-4
`
