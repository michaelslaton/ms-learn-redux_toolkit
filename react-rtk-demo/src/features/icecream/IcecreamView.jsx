import { useSelector } from "react-redux";

export const IcecreamView = () => {
  const numOfIcecreams = useSelector((state)=> state.icecream.numOfIcecreams);
  
  return (
    <div>
      <h2>Number of Icecreams - {numOfIcecreams}</h2>
      <button>Order Icecream</button>
      <button>Restock Icecreams</button>
    </div>
  )
}