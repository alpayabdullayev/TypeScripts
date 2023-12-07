import React from "react";
import { todos } from "../type/type";

type Props = {
  todosArray: todos[];
  setTodosArray: React.Dispatch<React.SetStateAction<todos[]>>;
  deleteMesage:(id:number)=>void;
  handleEdit: (todo: todos) => void;
};

const Message: React.FC<Props> = ({ todosArray, setTodosArray,deleteMesage,handleEdit }) => {
  return (
    <div>
      {todosArray.map((item) => (
        <div>
          <h1>{item.id}</h1>
          <p>{item.text}</p>
          <button onClick={()=>deleteMesage(item.id)}>delete</button>
          <button onClick={() => handleEdit(item)}>edit</button>
        </div>
      ))}
    </div>
  );
};

export default Message;
