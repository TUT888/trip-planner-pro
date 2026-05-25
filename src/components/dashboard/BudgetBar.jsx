//chỗ này là nền xám, nhận mấy cái màu+% rồi load dô
export const BudgetBar = ({segments}) => {
  return (
    <div className="w-full">
      <div className="bg-gray-200 w-full h-7 rounded-lg flex overflow-hidden">
        {segments.map((seg,i)=>(
               <div
                key={i}
                className={`${seg.color} h-full transition-all duration-300`}
                style={{ width: seg.width  }}
                title={`${seg.name}: ${seg.width}`}
                />
        ))}
      </div>
    </div>
  )
}


