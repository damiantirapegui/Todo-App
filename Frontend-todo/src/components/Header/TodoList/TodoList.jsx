// import React from "react";
import { useState, useEffect } from "react";
import { fetchTodos } from "../../../Services/API";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { TodoInput } from "../TodoInput/TodoInput";
import "./../TodoList/TodoList.css";

export function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        const fetchedTodos = await fetchTodos();
        const sortedTodos = fetchedTodos.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setTodos(sortedTodos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadTodos();
  }, []);

  const refreshAddTodo = (newTodo) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      return updatedTodos;
    });
  };

  const handleDeleteTodo = (taskID) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== taskID));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <TodoInput onAddTodo={refreshAddTodo} />
      <ul className="list-container">
        {todos.map((todo) => (
          <li className="list" key={todo.id}>
            {todo.text}{" "}
            <DeleteButton TaskID={todo.id} onDelete={handleDeleteTodo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
