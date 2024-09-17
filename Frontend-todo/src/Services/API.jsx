const API_URL = import.meta.env.VITE_API_URL;

export async function fetchTodos() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching todos", error);
    throw error;
  }
}

export async function createTodo(newTodo) {
  try {
    const response = await fetch(`${API_URL}/createTodos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating task", error);
    throw error;
  }
}

export async function deleteTodo(taskID) {
  try {
    const response = await fetch(`${API_URL}/delete/${taskID}`, {
      method: "DELETE",
    });
    if (!response) {
      throw new Error("Failed to delete task");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting task", error);
    throw error;
  }
}
