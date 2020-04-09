import React, { useEffect, useState } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepository(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: "https://github.com/Rocketseat/umbriel",
      title: `Umbriel ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });

    const project = response.data;

    setRepository([...repository, project]);
  }

  async function handleRemoveRepository(id) {
    try{
      await api.delete(`repositories/${id}`)

      setRepository(repository.filter(repo => repo.id != id));
    }catch(e) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(rep => (
          <li key={rep.id}>
            {rep.title}

            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
