import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux"
import { decrement, increment } from "./packingSlice";

export function SamplePackingComponent() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.packing.count);
  
  return (
    <>
      <h1 className="text-2xl bg-amber-100">I am a sample packing component</h1>
      <div>
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <span className="m-5">{count}</span>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </div>
    </>
  )
}