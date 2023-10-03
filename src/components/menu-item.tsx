import { ChevronRight } from 'lucide-react'

type Props = {
  children: React.ReactNode
  isActive?: boolean
  hasArrow?: boolean
}

export default function MenuItem({
  children,
  isActive = false,
  hasArrow = true,
}: Props) {
  return (
    <>
      {hasArrow && (
        <ChevronRight
          data-active={isActive}
          className="w-4 font-semibold data-[active=false]:text-slate-500/50 data-[active=true]:text-slate-600"
        />
      )}
      <span
        data-active={isActive}
        className="text-sm font-semibold data-[active=false]:text-slate-500/50 data-[active=true]:text-slate-600"
      >
        {children}
      </span>
    </>
  )
}
