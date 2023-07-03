import React from 'react'
import dados from '../../../db.json'
import '../Itens/Itens.css'


export const Itens = ({deletaProdutos}) => {

   return (
    <>
        <table>
            <tbody>
                <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </tbody>
                {dados.posts.map(valores =>{
                    return(
                        <tbody key={valores.id}>
                            <tr key={valores.id}>
                                <td className='linha'>{valores.nome}</td>
                                <td className='linha'>R$ {valores.valor}</td>
                                <td className='linha'>{valores.descricao}</td>
                                <td>
                                    <button 
                                        className='excluir' 
                                        onClick={() => deletaProdutos(valores['id'])}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
                
        </table>
    </>
  )

}
