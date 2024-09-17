// import { useState } from "react";
import { Header } from "./components/Header/Header";
import { TodoList } from "./components/Header/TodoList/Todolist";
import "./App.css";
// import { TodoInput } from "./components/Header/TodoInput/TodoInput";

function App() {
  // const [todos, setTodos] = useState([]);

  return (
    <>
      <div className="border">
        <Header />
        <TodoList />
      </div>
    </>
  );
}

export default App;
