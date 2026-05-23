import GeneralProgressBar from "@/components/dashboard/GeneralProgressBar"

export const SummaryCard = ({title, value,  progress}) => {
  return (
    <div className="w-full h-full">
      <div className={`bg-gray-50 border-primary border-2 p-4 rounded-xl flex flex-col justify-between items-center text-center shadow-sm min-h-[145px] h-full `}>
        
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="text-3xl font-bold">{value}</div>
        </div>

        <div className="w-full space-y-1 mt-auto">
          {title && <span className='text-xs font-semibold text-gray-700 block  tracking-tight'>{title}</span>}
          
          {progress !== undefined ? (
            <div className="w-full pt-1">
              <GeneralProgressBar percentage={progress} className="h-2 w-full bg-black/10" />
              
             
            </div>
          ) : (
            <div className="w-full pt-1">
              <div className="h-2 w-full invisible" />
              
        
            </div>
          )}
        </div>

      </div>
    </div>
  )
}