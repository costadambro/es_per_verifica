import './App.css';
import Alunno from './Alunno.js';
import { useState, useEffect } from 'react';


function App() {
  const [alunni, setAlunni] = useState([]);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");


  useEffect(() => {
    loadAlunni();
  }, [])

  async function loadAlunni() {
    setInCaricamento(true);
    const response = await fetch(`http://localhost:8080/alunni`, { method: "GET" });
    const a = await response.json();
    setAlunni(a);
    setInCaricamento(false);
  };

  async function salvaAlunno() {
    await fetch(`http://localhost:8080/alunni`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    loadAlunni();
    setShowForm(false);
  }

  function gestisciCambioNome(e) {
    setNome(e.target.value);
  }

  function gestisciCambioCognome(e) {
    setCognome(e.target.value);
  }


  return (
    <div className="App">
      <button onClick={loadAlunni}>Carica alunni</button>
      <hr />
      {
        inCaricamento ?
          <div>In caricamento... </div>
          :
          alunni.map((alunno) => (
            <Alunno alunno={alunno} loadAlunni={loadAlunni} key={alunno.id} />
          ))
      }
      <button onClick={() => setShowForm(true)}>Inserisci nuovo alunno</button>

      {showForm &&
        <div>
          <h1>Form di inserimento</h1>

          <div>Nome:    <input type="text" onChange={gestisciCambioNome} value={nome} placeholder="inserisci il nome"></input></div>

          <div>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="inserisci il cognome"></input></div>

          <button onClick={salvaAlunno}>Salva</button>
          <button onClick={() => setShowForm(false)}>Annulla</button>

          <div>{nome} {cognome}</div>

        </div>
      }

    </div>
  );
}

export default App;




