import {useState} from 'react';

export default function Alunno({alunno, loadAlunni}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [inModifica, setInModifica] = useState(false);
    const [inConfermaC, setInConfermaC] = useState(false);
    const [inConfermaM, setInConfermaM] = useState(false);

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");

    function gestisciCambioNome(e){
        setNome(e.target.value);
    }
    
    function gestisciCambioCognome(e){
        setCognome(e.target.value);
    }
    async function cancellaAlunno(){
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        loadAlunni();
        setInCancellazione(false);
    }
    async function modificaAlunno(){
        setInModifica(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome, cognome: cognome }),
    });
    }
    function richiediConfermaC(){
        setInConfermaC(true);
    }
    function annullaC(){
        setInConfermaC(false);
    }
    function richiediConfermaM(){
        setInConfermaM(true);
    }
    function annullaM(){
        setInConfermaM(false);
    }
    return(
        <div>
            {alunno.id} - {alunno.nome} {alunno.cognome} -
            { inCancellazione ?
                <> in cancellazione... </>
            :
                <>
                    { inConfermaC ?
                        <>Sei sicuro? 
                            <button onClick={cancellaAlunno}>si</button>
                            <button onClick={annullaC}>no</button>
                        </>
                        :
                        <button onClick={richiediConfermaC}>Cancella </button>
                    }
                </>
            }
            { inModifica ?
                <> in modifica... </>
            :
                <>
                    { inConfermaM ?
                        <>
                            <div>Nome:    <input type="text" onChange={gestisciCambioNome} value={nome}  placeholder="inserisci il nome"></input></div>
                            <div>Cognome: <input type="text" onChange={gestisciCambioCognome} value={cognome} placeholder="inserisci il cognome"></input></div>

                            <button onClick={modificaAlunno}>modifica</button>
                            <button onClick={annullaM}>annulla</button>
                        </>
                        :
                        <button onClick={richiediConfermaM}>Modifica </button>
                    }
                </>
            }
            <hr />
        </div>
    );
}