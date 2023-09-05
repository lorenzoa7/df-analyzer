import tw from 'tailwind-styled-components'

export const LoadButton = tw.button`
    h-14
    relative
    mt-5 
    bg-none
    text-stone-200
    border-2
    border-stone-200
    uppercase
    font-bold
    w-32 
    py-3
    px-5
    transition-colors
    duration-300
    hover:text-black
    z-10
    shadow-lg
    
    before:absolute
    before:left-0
    before:top-0
    before:w-full
    before:h-full
    before:bg-stone-200
    before:-z-10
    before:transition-transform
    before:duration-500
    before:origin-left
    before:ease-in-out
    before:scale-x-0
    hover:before:scale-x-100

    before:active:shadow-2xl
`
