type Props = {
  children: React.ReactNode
}

export default function StepButtonsRoot({ children }: Props) {
  return <div className="flex items-center justify-between">{children}</div>
}
