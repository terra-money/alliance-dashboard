'use client';

export default function Card({
  name,
  children,
  ...props
}: {
  name: string,
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={`${props.className} custom_card mt-12`}>
      <div className="flex justify-between mb-6 pr-4 pl-4">
        <h1 className="text-3xl font-medium">{name}</h1>
      </div>
      <div className={'pr-4 pl-4 pb-3 pt-3 max-h-80 overflow-auto'}>
        {children}
      </div>
    </div>
  )
}