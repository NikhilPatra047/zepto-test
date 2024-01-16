import { useChipListContext } from "@/context";
import { ImCross } from "react-icons/im";

interface PROPS {
  name: string 
  style: string;
}

export default function Chip(props: PROPS) {
  const { name, style } = props; 
  const { removeName } = useChipListContext()!;

  return (
    <div className={`rounded-3xl ${style} flex flex-row items-center gap-2 w-fit p-2 bg-gray-400`}>
      { name }
      <ImCross onClick={() => removeName(name)} />
    </div>
  )
}