
import React, { useEffect, useState } from 'react'

import './styles/style.css'

import {useForm} from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const schema= yup.object().shape({
  name:yup.string().required("O NOME É OBRIGATORIO"),
  money:yup.number().typeError('O VALOR É OBRIGATÓRIO')
  .required("Please provide plan cost.")
})
function App() {

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [data,setData]=useState([])

 


  const add=dados=>{
    axios.post("http://localhost:5000/send",dados)

    toast.success('Transação adicionada!');
  }

  const remove=dados=>{
    axios.delete(`http://localhost:5000/delete/${dados}`)
    setData(data.filter(info => info._id !== dados))
    toast.success('Transação removida!');

  }

  let total=0
  let receitas=0
  let despesas=0

    data.map((value,index)=>{
      
        total+=value.money

        if(value.money>0){
           receitas+=value.money

        }else{
          despesas+=value.money
        }

    })
    
  useEffect(()=>{

    axios.get('http://localhost:5000/verify')
    .then((response)=> {
      setData(response.data.itens)
    })
    .catch((error)=> console.log(error) )

  },[data])

  return (
    <>

      <ToastContainer
      position="top-right"
      autoClose={2000}  
      />
   

     <h2>Controle de Despesas</h2>

<div className="container">
  <h4>Saldo atual :</h4>
  
  <h1 id="balance" className="balance">R$ {total}</h1>

  <div className="inc-exp-container">
    <div>
      <h4>Receitas</h4>
      <p id="money-plus" className="money plus">+{receitas} R$</p>
    </div>

    <div>
      <h4>Despesas</h4>
      <p id="money-minus" className="money minus">{despesas} R$</p>
    </div>
  </div>

  <h3>Transações</h3>
  
  <ul id="transactions" className="transactions">
   
    {
      data.map((value,index)=>{

       if(value.money>0){
        return(
          <li class="plus" key={index}>
          {value.name} <span>${value.money}</span><button type="submit" class="delete-btn" 
          onClick={()=>{
            remove(value._id)
          }}>x</button>
        </li> 
        );
       }else{
        return(
          <li class="minus" key={index}>
          {value.name} <span>${value.money}</span><button type="submit" class="delete-btn" 
          onClick={()=>{
            remove(value._id)
          }}>x</button>
        </li> 
        );
       }

      })
    }
  </ul>
      
   
  <h3>Adicionar transação</h3>
  
  <form id="form" onSubmit={handleSubmit(add)}>
    <div className="form-control">
      <label for="text">Nome</label>
      <input  type="text" id="text" 
      placeholder="Nome da transação" 
      name='name'
      {...register('name')}
      />
      <p className="error-message">{errors.name?.message}</p>
    </div>

    <div className="form-control">
      <label for="amount">Valor <br />
        <small>(negativo - despesas, positivo - receitas)</small>
      </label>
      <input type="number" id="amount" 
      placeholder="Valor da transação"
      name='money'
      {...register('money')}
      />
      <p className="error-message">{errors.money?.message}</p>
    </div>

    

    <button className="btn">Adicionar</button>
  </form>
</div>
    
    </>
  );
}

export default App;
