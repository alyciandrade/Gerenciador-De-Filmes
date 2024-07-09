import React, {useState, useEffect} from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import logoCineList from './assets/logo.png';


function App() {

   const baseUrl="https://localhost:7165/api/filmes";

   const [data, setData]=useState([]);
   const [modalAdicionar, setModalAdicionar]=useState(false);
   const [modalEditar, setModalEditar]=useState(false);

   const [filmeSelecionado, setFilmeSelecionado]=useState({
    id: '',
    nome:'',
    nota:''
   })
   
   const selecionarFilme = (filme, opcao) => {
    setFilmeSelecionado(filme);
    (opcao === "Editar") &&
    abrirFecharModalEditar()
   }

   const abrirFecharModalAdicionar=()=>{
    setModalAdicionar(!modalAdicionar);
   }

   const abrirFecharModalEditar=() =>{
    setModalEditar(!modalEditar);
   }

   const handleChange = e=>{
    const {name,value} = e.target;
    setFilmeSelecionado({
      ...filmeSelecionado,[name]:value
    });
    console.log(filmeSelecionado);
   }

   const pedidoGet = async()=>{
      await axios.get(baseUrl)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      }).catch(error=>{
        console.log(error);
      })
   }

   const pedidoPost=async()=>{
    delete filmeSelecionado.id;
    filmeSelecionado.nota=parseInt(filmeSelecionado.nota);
    await axios.post(baseUrl, filmeSelecionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirFecharModalAdicionar();
    }).catch(error=>{
      console.log(error);
    })
   }

   const pedidoPut=async()=>{
    filmeSelecionado.nota=parseInt(filmeSelecionado.nota);
    await axios.put(baseUrl+"/"+filmeSelecionado.id, filmeSelecionado)
    .then(response=>{
      var resposta=response.data;
      var dadosAuxiliar=data;
      dadosAuxiliar.map(filme=>{
        if(filme.id===filmeSelecionado.id){
          filme.nome=resposta.nome;
          filme.nota=resposta.nota;
        }
      });
      abrirFecharModalEditar();
    }).catch(error=>{
      console.log(error);
    })
   }

   useEffect(()=>{
    pedidoGet();
  })

  return (
    <div className="filme-container">
      <br/>
      
        <div className='topo'>
          <img src={logoCineList} alt="logo" />
          <h2>Gerencie os filmes que assistiu</h2>
        </div>

      <header>
        <button className= "btn btn-success" onClick={()=>abrirFecharModalAdicionar()}>Adicionar Filme</button>
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
                <button className="btn btn-primary" onClick={()=>selecionarFilme(filme, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>selecionarFilme(filme, "Excluir")}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <Modal isOpen={modalAdicionar}>

        <ModalHeader>Adicionar Filme</ModalHeader>

        <ModalBody>

          <div className='form-group'>
            <label>Nome:</label>
            <br />
            <input type="text" className='form-control' name="nome" onChange={handleChange} />
            <br />
            <label>Nota:</label>
            <br />
            <input type="text" className='form-control' name="nota" onChange={handleChange}/>
            <br />
          </div>
        </ModalBody>

        <ModalFooter>
          <button className='btn btn-primary' onClick={()=>pedidoPost()} >Adicionar</button>{" "}
          <button className='btn btn-danger' onClick={()=>abrirFecharModalAdicionar()} >Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen= {modalEditar}>
        <ModalHeader>Editar Filme</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID: </label>
            <input type="text" className='form-control' readOnly
             value={filmeSelecionado && filmeSelecionado.id}/>
            <br />
            <label>Nome: </label><br />
            <input type="text" className='form-control' name="nome" onChange={handleChange} /><br
            value={filmeSelecionado && filmeSelecionado.nome}/><br />
            <label>Nota: </label><br />
            <input type="text" className='form-control' name="nota" onChange={handleChange} /><br 
             value={filmeSelecionado && filmeSelecionado.nota}/><br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary'onClick={()=>pedidoPut()} >Editar</button>{"  "}
          <button className='btn btn-primary'onClick={()=>abrirFecharModalEditar()} >Cancelar</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
