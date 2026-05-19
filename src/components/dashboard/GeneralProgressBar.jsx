export default function GeneralProgressBar({ percentage, className = "h-2" }) {

  const cleanPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-primary transition-all duration-300" 
        style={{ width: `${cleanPercentage}%` }}
      />
    </div>
  );
}