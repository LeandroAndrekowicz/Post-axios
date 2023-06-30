import { useState } from 'react'
import './App.css'
import axios from 'axios'
    
function App() {
  const [dados, setDados] = useState({
    title: "",
    author: ""
  });
  const [enviando, setEnviando] = useState(false);

  const aoAlterar = (e) =>{
    setDados({
      ...dados, 
      [e.target.name]: e.target.value
    });
  };

  const aoSubmeter = (e) =>{
    e.preventDefault();
    setEnviando(true);
    const userData = {
      title: dados.title,
      author: dados.author
    };
    axios.post("http://localhost:3000/posts", userData).then((response) =>{
      setEnviando(false);
      console.log(response.status, response.data);
    }).catch( (e) => {
      setEnviando(false);
      console.log('erro ao conectar a API' + e)
    });
  };

  return (
    <>
      <form onSubmit={aoSubmeter}>
        <input type='text' onChange={aoAlterar} name='title' value={dados.title} placeholder='Digite o titulo'/>
        <input type='text' onChange={aoAlterar} name='author' value={dados.author} placeholder='Digite o autor' />
        <button type='submit' disabled={enviando}>{enviando ? 'Aguarde o envio...' : 'Enviar' }</button>
      </form>
    </>
  )
}

export default App
