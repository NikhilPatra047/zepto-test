"use client"

import { names } from "@/data/namesList";
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface PROVIDER {
  children: ReactNode
}

interface CONTEXT {
  list: string[]
  chipList: string[] 
  filterList: (name: string) => void
  searchList: (text: string) => void
  addName: (name: string) => void 
  removeLastName: (el: string) => void
  removeName: (name: string) => void
}

const chipListContext = createContext<CONTEXT | null>(null);

const ChipListContextProvider: FC<PROVIDER> = ({ children }) => {
  const [chipList, setChipList] = useState<string[]>([]);
  const [list, setList] = useState<string[]>(names);

  const filterList = (name: string) => {
    const newList = names.filter((name: string) => {
      const isNameInChipList = chipList.find((nameInList: string) => nameInList.toLowerCase() === name.toLowerCase());
      if(!isNameInChipList) {
        return name;
      }
    });

    const newFilteredList = newList.filter((nameInList: string) => nameInList !== name);
    setList(newFilteredList);
  };

  const searchList = (text: string) => {
    const newList = names.filter((name: string) => {
      const isNameInChipList = chipList.find((nameInList: string) => nameInList.toLowerCase() === name.toLowerCase());
      if(!isNameInChipList) {
        return name;
      }
    });

    const newFilteredList = newList.filter((nameInList: string) => {
      const nameToLowerCase = nameInList.toLowerCase(); 
      const textToLowerCase = text.toLowerCase(); 
      return nameToLowerCase.includes(textToLowerCase);
    });

    setList(newFilteredList);
  }

  const addName = (name: string) => {
    setChipList((prevItemList: string[]) => {
      const newItemList = [...prevItemList, name];
      return newItemList;
    });
    filterList(name);
  };

  const removeName = (name: string) => {
    setChipList((prevList: string[]) => {
      return prevList.filter((nameInList: string) => nameInList !== name);
    });
    if(name !== undefined) {
      setList((prevList: string[]) => {
        return [name, ...prevList];
      }); 
    }
  };

  const removeLastName = (el: string) => {
      setChipList((prevList: string[]) => {
        return prevList.filter((nameInList: string) => nameInList !== el);
      });
      if(el !== undefined) {
        setList((prevList: string[]) => {
          return [el, ...prevList];
        }); 
      }
  };

  return (
    <chipListContext.Provider value={{chipList, list, filterList, addName, searchList, removeLastName, removeName}}>
      { children }
    </chipListContext.Provider>
  );
}

const useChipListContext = () => {
  return useContext(chipListContext);
}

export { useChipListContext, ChipListContextProvider };
