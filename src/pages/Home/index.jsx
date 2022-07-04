import './style.css'
import React, { useState, useEffect } from 'react'

import { Card } from '../../components/Card'

function Home() {

  /*
  1°Elemento - Conteúdo em si (onde está armazenado)
  2°Elemento - Função que atualiza a variável
  */

  const [studentName, setStudentName] = useState()
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent]) //Os três pontinhos despeja todos os valores dentro do vetor
  }

  useEffect(() => {
    //É executado automaticamente assim que a interface for renderizada
    // fetch('https://api.github.com/users/FelipeMel0')
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data)
    //   setUser({
    //     name: data.login,
    //     avatar: data.avatar_url
    //   })
    // })

    //Utilizando async 

    async function fetchData() {
      const response = await fetch('https://api.github.com/users/FelipeMel0')
      const data = await response.json()

      setUser({
        name: data.login,
        avatar: data.avatar_url
      })

    }
    
    fetchData()
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input
        onChange={e => setStudentName(e.target.value)}
        type="text"
        placeholder='Digite um nome...' />
      <button type='button' onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => (
          <Card
            key={Date.now() + Math.random()}
            name={student.name}
            time={student.time} />
        ))
      }

    </div>
  )
}

export default Home
