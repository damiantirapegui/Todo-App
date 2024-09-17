import { deleteTodo } from "../../../Services/API";
import "./../DeleteButton/DeleteButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function DeleteButton({ TaskID, onDelete }) {
  const handleDeleteButton = async () => {
    try {
      await deleteTodo(TaskID);
      onDelete(TaskID);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div>
      <button
        className="delete-button"
        type="button"
        onClick={() => handleDeleteButton(TaskID)}
      >
        <FontAwesomeIcon icon={faTrash} style={{ color: "#e01f1f" }} />
      </button>
    </div>
  );
}
