import { useSelector } from "react-redux"

export function SamplePackingComponent() {
  const checklist = useSelector((state) => state.packing.checklist);
  
  return (
    <div className="bg-amber-50">
      <h1 className="text-2xl">I am a placeholder component for packing checklist</h1>

      <div>
        {checklist.map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
      </div>
    </div>
  )
}