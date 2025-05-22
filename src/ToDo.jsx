import { useState } from "react";

function ToDo({ id, task, completed, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  function handleSave() {
    onEdit(id, editedTask);
    setIsEditing(false);
  }

  return (
    <article className="todo-item">
      {isEditing ? (
        <>
          <input
            className="todo-input"
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <button className="todo-save-button" onClick={handleSave}>
            💾 Saglabāt
          </button>
        </>
      ) : (
        <>
          <label className="todo-label">
            <input
              className="todo-checkbox"
              type="checkbox"
              checked={completed}
              onChange={() => onToggle(id)}
            />
            {task}
          </label>
          <button className="todo-edit-button" onClick={() => setIsEditing(true)}>
            ✏️ Rediģēt
          </button>
          <button className="todo-delete-button" onClick={() => onDelete(id)}>
            ❌ Dzēst
          </button>
        </>
      )}
    </article>
  );
}

export default ToDo;