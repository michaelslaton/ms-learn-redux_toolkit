// import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { ordered, restocked } from "./icecreamSlice";
import { useState } from 'react';

export const IcecreamView = () => {
  const [value, setValue] = useState(1);
  const numOfIcecreams = useAppSelector((state)=> state.icecream.numOfIcecreams);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Number of Icecreams - {numOfIcecreams}</h2>
      <button onClick={()=>dispatch(ordered())}>Order Icecream</button>
      <input type='number' value={value} onChange={(e)=>setValue(parseInt(e.target.value))}/>
      <button onClick={()=>dispatch(restocked(value))}>Restock Icecreams</button>
    </div>
  )
};