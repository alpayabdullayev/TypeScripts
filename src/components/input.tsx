import React from 'react'

type Props={
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    addMessage:()=> void
}




const Input:React.FC<Props> = ({todo,setTodo,addMessage}) => {
    const handleAddmesage = () =>{
        addMessage()
        setTodo("")
    }
  return (
    <div>
      <input type="text" value={todo} onChange={(e)=>setTodo(e.target.value)} />
      <button onClick={handleAddmesage}>add</button>
    </div>
  )
}

export default Input
