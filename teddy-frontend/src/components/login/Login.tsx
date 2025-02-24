import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import './login.css'

const Login: React.FC = () => {
  const [nome, setNome] = useState('');
  const navigate = useNavigate(); // Inicialize useNavigate

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (nome.trim() !== '') {
      // Redireciona para a tela de listagem, passando o nome como parâmetro na URL
      navigate(`/listagem?nome=${nome}`);
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <div className="login-container">
  <div className="login-content"> {/* Elemento para centralizar o conteúdo */}
    <h3>olá, seja Bem-vindo!</h3>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  </div>
</div>
  );
};

export default Login;