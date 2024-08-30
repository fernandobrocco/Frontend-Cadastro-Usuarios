import { useEffect, useState, useRef } from 'react'
import './style.css'
import api from "../../services/api"

function Home() {
  const [users, setUsers] = useState([])

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  async function getUsers(){
    const usersFromApi = await api.get('/usuarios')
    setUsers(usersFromApi.data)
  }

  async function createUsers(){
    await api.post('/usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id){
    await api.delete(`/usuarios/${id}`)

  }

  useEffect(() => {
    getUsers()
  }, [])


  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' placeholder='Digite seu nome...' ref={inputName} />
        <input name='idade' type='number' placeholder='Digite sua idade...' ref={inputAge}/>
        <input name='email' type='email' placeholder='Digite seu email...' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span> </p>
            <p>Idade: <span>{user.age}</span> </p>
            <p>Email: <span>{user.email}</span> </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src="https://svgshare.com/i/16qg.svg" alt="" />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home