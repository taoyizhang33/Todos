import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleTodoClick(event) {
    const id = event.target.id;
    console.log(id);
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodos() {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    let newTodos = [...todos];
    newTodos = newTodos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>This is a to-do list</h1>
      <ul>
        {todos.map((todo) => (
          <div key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                id={todo.id}
                onChange={handleTodoClick}
              ></input>
              {todo.name}
            </label>
          </div>
        ))}
      </ul>
      <input ref={todoNameRef}></input>
      <button onClick={handleAddTodos}>Add</button>
      <button onClick={handleClearTodos}>Clear</button>
      <div>{todos.filter((todo) => !todo.complete).length} left to do</div>
    </div>
  );
}

export default App;
