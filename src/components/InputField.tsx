"use client"

import { useEffect, useRef, useState } from "react"; 
import { names } from "../data/namesList";
import Chip from "./Chip";
import { useChipListContext } from "@/context";

export default function InputField() {
  const focusRef = useRef<HTMLInputElement>(null);
  const listItemRef = useRef<HTMLDivElement[]>([]);
  
  const [isItemOnFocus, setIsItemOnFocus] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const { chipList, list, addName, searchList, removeLastName } = useChipListContext()!;

  useEffect(() => {
    focusRef.current!.focus();
  }, []); 

  const setInputText = (text: string) => {
    setText(text);
    setIsItemOnFocus(false);
  };

  const addNameToChipList = (name: string) => {
    setInputText("");
    addName(name);
  }

  const handleKeyPress = (event: any) => {
    if(event.key === 'Backspace' && isItemOnFocus === true) {
      const elToBeDeleted = chipList[chipList.length - 1];
      removeLastName(elToBeDeleted);
    } else if(event.key === 'Backspace') {
      const index = chipList.length - 1; 
      listItemRef.current[index]?.focus();
      setIsItemOnFocus(true);
    }
  };

  return (
    <div className="border-b-2 border-blue-500 p-4 flex flex-row flex-wrap gap-2">
      {
        chipList.map((chip: string, index: number) => {
          return (
              <div ref={(el: HTMLDivElement) => listItemRef.current[index] = el}>
                <Chip name={chip} style={`${isItemOnFocus === true && index === chipList.length - 1? 'border-red-500 border-2': ''}`}
                />
              </div>
          );
        })
      }
      <div className="flex justify-end">
        <input onChange={(e) => {
          setInputText(e.target.value);
          searchList(e.target.value);
        }} value={text} onKeyDown={(e) => text.length === 0 && handleKeyPress(e)} ref={focusRef} type='text' className="outline-none border-b-2 border-blue-500" />
        {
          (<div className={`absolute bg-white border-black border-2 max-h-[200px] w-[180px] overflow-scroll ${chipList.length === 0? 'mt-10': 'mt-14'}`}>
              {
                list.length !== 0
                ? list.map((name: string) => {
                  return <p onClick={() => {
                    addNameToChipList(name);
                    setIsItemOnFocus(false);
                    focusRef.current!.focus();
                  }} className="p-2 cursor-default hover:bg-gray-300">{name}</p>
                })
                : <p className="p-2">{'No names in the list.'}</p>
              }
            </div>)
        }
      </div>
    </div>
  );
}