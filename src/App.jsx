import './App.css'
import ToDo from './ToDo.jsx'
import DiariesList from './DiariesList';
import './styles.css';


function App() {
  const todos = [
    { id: 1, task: "Iemācīties React", completed: false },
    { id: 2, task: "Iemācīties Laravel", completed: true },
    { id: 3, task: "Nopirkt pienu", completed: false },
  ];
  return (
    <>
      <h1>Veicamie uzdevumi</h1>
  
      {todos.map((todo) => {
      return <ToDo key={todo.id} {...todo} />;
      })}

      <div className="App">
      {/* ...citi komponenti vai saturs... */}
      <h2>Veicamie uzdevumi</h2>
      {/* DiariesList komponente */}
      <DiariesList />
    </div>
    </>
  );
}

export default App
