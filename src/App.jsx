import './App.css';
import ToDo from './ToDo.jsx';
import DiariesList from './DiariesList';
import './styles.css';
import { useState, useEffect } from 'react';

// Funkcija, kas nolasīs uzdevumus no Local Storage
function getLocalTodos() {
  const stored = localStorage.getItem("todos");
  return stored ? JSON.parse(stored) : [];
}

function App() {
  const [todos, setTodos] = useState(getLocalTodos); // Uzdevumu stāvoklis
  const [newTask, setNewTask] = useState(""); // Jaunā uzdevuma stāvoklis

  const [diaryEntries, setDiaryEntries] = useState([]); // Dienasgrāmatas ierakstu stāvoklis
  const [newDiaryEntry, setNewDiaryEntry] = useState(""); // Jaunā dienasgrāmatas ieraksta stāvoklis

  useEffect(() => {
    // Saglabā uzdevumus Local Storage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    // Saglabā dienasgrāmatas ierakstus Local Storage
    localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));
  }, [diaryEntries]);

  function handleAdd(event) {
    event.preventDefault(); // Novērš lapas pārlādi

    if (newTask.trim() === "") return; // Neļauj pievienot tukšu uzdevumu

    const newTodo = {
      id: crypto.randomUUID(), // Ģenerē unikālu ID
      task: newTask,
      completed: false,
    };

    setTodos([...todos, newTodo]); // Pievieno jauno uzdevumu sarakstam
    setNewTask(""); // Notīra ievades lauciņu
  }

  function handleDelete(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Dzēš uzdevumu pēc ID
  }

  function handleToggle(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleEdit(id, newTask) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  }

  function handleAddDiary(event) {
    event.preventDefault(); // Novērš lapas pārlādi

    if (newDiaryEntry.trim() === "") return; // Neļauj pievienot tukšu ierakstu

    const newEntry = {
      id: crypto.randomUUID(), // Ģenerē unikālu ID
      content: newDiaryEntry,
    };

    setDiaryEntries([...diaryEntries, newEntry]); // Pievieno jauno ierakstu
    setNewDiaryEntry(""); // Notīra ievades lauciņu
  }

  function handleDeleteDiary(id) {
    setDiaryEntries((prevEntries) =>
      prevEntries.filter((entry) => entry.id !== id) // Dzēš ierakstu pēc ID
    );
  }

  return (
    <div className="app-container">
      <h1 className="app-title">Veicamie uzdevumi</h1>

      {/* Uzdevumu pievienošanas forma */}
      <form className="task-form" onSubmit={handleAdd}>
        <label className="task-label">
          Jaunais uzdevums:
          <input
            className="task-input"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />
        </label>
        <button className="task-button" type="submit">
          Pievienot
        </button>
      </form>

      <div className="task-list">
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            {...todo}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </div>

      <h1 className="app-title">Dienasgrāmatas ieraksti</h1>

      {/* Dienasgrāmatas pievienošanas forma */}
      <form className="diary-form" onSubmit={handleAddDiary}>
        <label className="diary-label">
          Jaunais ieraksts:
          <input
            className="diary-input"
            value={newDiaryEntry}
            onChange={(event) => setNewDiaryEntry(event.target.value)}
          />
        </label>
        <button className="diary-button" type="submit">
          Pievienot
        </button>
      </form>

      <div className="diary-list">
        {diaryEntries.map((entry) => (
          <div key={entry.id} className="diary-item">
            <p>{entry.content}</p>
            <button
              className="diary-delete-button"
              onClick={() => handleDeleteDiary(entry.id)}
            >
              ❌ Dzēst
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
