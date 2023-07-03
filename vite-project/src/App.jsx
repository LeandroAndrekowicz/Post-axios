import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Itens } from './componentes/Itens';
import api from '../src/service/api'
    
function App() {
  const [produtos, setProdutos] = useState([])
  const [dados, setDados] = useState({
    nome: "",
    valor: 0,
    descricao: "",
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
      nome: dados.nome,
      valor: dados.valor,
      descricao: dados.descricao,
    };
    api.post("/posts/", userData).then((response) =>{
      setEnviando(false);
      setDados({
        nome: "",
        valor: 0,
        descricao: "",
      })
      getProdutos()
    }).catch( (e) => {
      setEnviando(false);
      console.log('erro ao conectar a API' + e)
    });
  };
  
  async function getProdutos() {
    await api.get('/posts').then((res) => setProdutos(res.data));
  }

  function deletaProdutos(id){
    if(confirm('Deseja mesmo excluir?')){
      api.delete(`/posts/${id}`).then((res) =>{
      })}
  }


  return (
    <>
      <h2>Cadastrar Produtos</h2>
      <form onSubmit={aoSubmeter} className='card'>
        <input 
          type='text' 
          onChange={aoAlterar} 
          name='nome' 
          value={dados.nome} 
          placeholder='Digite o nome'
        />
        <input 
          type='number' 
          onChange={aoAlterar} 
          name='valor' 
          value={dados.valor} 
          placeholder='Digite o valor' 
        />
        <input 
          type='text' 
          onChange={aoAlterar} 
          name='descricao' 
          value={dados.descricao} 
          placeholder='Digite uma breve descricao' 
        />
        <button 
          type='submit' 
          disabled={enviando}>{enviando ? 'Aguarde o envio...' : 'Enviar' }
        </button>
      </form>
      <h2>Produtos Cadastrados</h2>
      <Itens deletaProdutos={deletaProdutos}/>
    </>
  )
}


export default App
