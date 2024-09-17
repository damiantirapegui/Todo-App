import { createTodo } from "../../../Services/API";
import { useState } from "react";
import "./../TodoInput/TodoInput.css";

export function TodoInput({ onAddTodo }) {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleAddButton = async () => {
    if (input.trim()) {
      const newTodo = { text: input };
      const createdTodo = await createTodo(newTodo);
      console.log("Created todo:", createdTodo);
      onAddTodo(createdTodo);
      setInput("");
      setShow(false);
    }
  };

  return (
    <div className="input-container">
      <input
        className="input"
        type="text"
        value={input}
        onChange={handleInput}
      />
      {show && (
        <button
          className="button button__active"
          type="button"
          onClick={handleAddButton}
        >
          +
        </button>
      )}
    </div>
  );
}
