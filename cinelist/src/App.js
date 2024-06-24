import React, {useState, useEffect} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCineList from './assets/logo.png';
import { useEffect } from 'react';

function App() {

   const baseUrl="https://localhost:7165/api/Filmes";

   const [data, setData]=useState([]);

   const pedidoGet = async()=>{
      await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
   }

   useEffect(()=>{
    pedidoGet();
  })

  return (
    <div className="App">
      <br/>
      <h3>CineList</h3>
      <h2>Gerencie os filmes que assistiu</h2>

      <header>
        <img src={logoCineList} alt="logo" />
        <button className= "btn btn-success">Adicionar Filme</button>
      </header>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Nota</th>
          </tr>
        </thead>

        <tbody>
          {data.map(filme=>(
            <tr key={filme.id}>
              <td>{filme.id}</td>
              <td>{filme.nome}</td>
              <td>{filme.nota}</td>
              <td>
                <button className="btn btn-primary">Editar</button> {"  "}
                <button className="btn btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default App;
