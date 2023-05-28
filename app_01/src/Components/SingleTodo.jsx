import trashImg from "./1.png"
import { useState } from 'react';

export default function SingleTodo({
   item,
   _i,
   changeToDone,
   changeToTrash
 }) {
   const [visible, setVisible] = useState(false);
   const [isChecked, setIsChecked] = useState(item.status === "Done");
 
   const onClick = () => {
     setVisible(!visible);
   };
 
   const onCheckboxChange = () => {
     setIsChecked(!isChecked);
     if (!isChecked) {
       if (item.status === "To Do") {
         changeToDone(item.id);
       }
     }
   };
 
   return (
     <div>
       <p>
         <img className="onClick" onClick={onClick} src={trashImg} />
         {item.status !== "In Trash" && (
           <input
             className="checkbox"
             type="checkbox"
             checked={isChecked}
             onChange={onCheckboxChange}
           />
         )}
         <span className={item.status === "Done" ? "completed" : ""}>
           {item.name}
         </span>
       </p>
 
       {visible && item.status !== "Done" && (
  <button className="movetoTrash" onClick={() => changeToTrash(item.id)}>
    Move to Trash
  </button>
)}

{visible && item.status === "Done" && (
  <button className="movetoTrash" onClick={() => changeToTrash(item.id)}>
    Move to Trash
  </button>
)}
     </div>
   );
 }