export function PageTitle({ title, subtitle }) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-4xl font-semibold text-gray-800 mb-1">
        {title}
      </h1>
      <p className="text-sm text-gray-500 mb-4">{subtitle}</p>
    </div>
  )
}