import React, { createContext, ReactNode, useContext, useState } from "react";

interface Props {
  floor: any;
  handleWall: any;
  wall: any;
  handleFloor: any;
  vanity:any,
  handleVanity:any
}

const Context = createContext<any>(undefined);
const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [floor, setFloor] = useState(1);
  const [wall, setWall] = useState(1);
  const [vanity,setVanity]=useState(1)
  const handleFloor = (id: any) => {
    setFloor(id);
  };
  const handleWall = (id: any) => {
    setWall(id);
  };
   const handleVanity = (id: any) => {
     setVanity(id);
   };

  const values: Props = {
    floor,
    handleFloor,
    wall,
    handleWall,
    vanity,
    handleVanity
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};

export const useMyContext = () => {
  const context: Props = useContext(Context);
  return context;
};

export default MyProvider;
