import { useEffect, useState } from 'react';
import './App.css';
import SingleTodo from './Components/SingleTodo';
import { v4 as uuidv4} from 'uuid';
import TodoTitle from './Components/TodoTitle';
import EndTitle from './Components/EndTitle';

function App() {
  const [activeStatus, setActiveStatus] = useState("To Do");
  const [todoList, setToDoList] = useState([
    { id: uuidv4(), name: "Write Essay", status: "To Do" },
    { id: uuidv4(), name: "One Hour CSS Course Online", status: "To Do" },
    { id: uuidv4(), name: "Buy One Way Tickets to San Fransico", status: "Done" },
    { id: uuidv4(), name: "Go to Gym", status: "To Do" },
    { id: uuidv4(), name: "In Trash", status: "Trash" },
  ]);
  const [showPopup, setShowPopup] = useState(false);

  const changeStatus = (status) => {
    setActiveStatus(status);
  };

  const changeToDone = (id) => {
    const itemToDone = todoList.find((item) => item.id === id);
    itemToDone.status = "Done";
    const newTodoList = todoList.map((item) => (item.id === id ? itemToDone : item));
    setToDoList(newTodoList);
  };

  const changeToTrash = (id) => {
    const itemToTrash = todoList.find((item) => item.id === id);
    itemToTrash.status = "Trash";
    const newTodoList = todoList.map((item) =>
      item.id === id ? itemToTrash : item
    );
    setToDoList(newTodoList);
  };

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        name: newTask,
        status: 'To Do',
      };
      setToDoList([...todoList, newTodo]);
      setNewTask('');
    }
  };

  const filteredTodos = todoList.filter((item) => item.status === activeStatus);

  return (
    <div className="App">
      <TodoTitle />
      <div className="buttonWrapper">
        <button className="button" onClick={() => changeStatus("To Do")}>
          <p>ToDo</p>
        </button>
        <button className="button" onClick={() => changeStatus("Done")}>
          <p>Done</p>
        </button>
        <button className="button" onClick={() => changeStatus("Trash")}>
          <p>Trash</p>
        </button>
      </div>
      <h5 className="titleStatus">{activeStatus}</h5>
      <p className="border-bottom"></p>

      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add task</button>

      {filteredTodos.map((item, _i) => (
        <SingleTodo
          key={_i}
          item={item}
          changeToDone={changeToDone}
          changeToTrash={changeToTrash}
        />
      ))}

      <EndTitle />
    </div>
  );
}

export default App;
