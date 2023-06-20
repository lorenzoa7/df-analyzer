import tw from 'tailwind-styled-components'

export const PageContainer = tw.div`
    flex
    justify-center
    h-screen
    w-screen
`

export const PageContent = tw.div`
    flex 
    flex-col
    h-full
    items-center 
`

export const Title = tw.h1`
    mt-4
    text-3xl
    font-semibold
    uppercase
`

export const MainContainer = tw.div`
    flex
    flex-col
    items-center
    w-[calc(100vw-25vw)]
    bg-stone-800
    p-5
    h-full
    my-5
    rounded
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

export const LoadButton = tw.button`
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

export const TitleLabel = tw.h2`
    font-semibold
    text-stone-200
    text-xl
`

export const VerticalSeparator = tw.div`
   bg-stone-500
   h-full
   w-1
   mx-4
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

export const Header = tw.header`
    flex 
    flex-col 
    gap-1 
    w-full 
    h-32 
    justify-center 
    items-center
`

export const Main = tw.main`
    flex 
    w-full 
    h-full 
    justify-center 
    items-center 
    gap-10 
    m-5 
    p-5
`

export const Section = tw.section`
    flex 
    flex-col 
    w-full 
    h-full 
    gap-4 
    pb-5
`

export const Footer = tw.footer`

`

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
    rounded-xl
    text-2xl
    font-bold
    duration-300

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
