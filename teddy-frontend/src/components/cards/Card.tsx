import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './CardCliente.css'; // Importe o CSS

interface CardClienteProps {
  nome: string;
  salario: number;
  valorEmpresa: number;
  onUpdate: (nome: string, salario: number, valorEmpresa: number) => void;
}

const CardCliente: React.FC<CardClienteProps> = ({ nome, salario, valorEmpresa, onUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedNome, setEditedNome] = useState(nome);
  const [editedSalario, setEditedSalario] = useState(salario);
  const [editedValorEmpresa, setEditedValorEmpresa] = useState(valorEmpresa);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUpdate = () => {
    onUpdate(editedNome, editedSalario, editedValorEmpresa);
    closeModal();
  };

  return (
    <div className="card-cliente">
      <h3>{nome}</h3>
      <div className="info">
        <p>Salário: R$ {salario.toFixed(2)}</p>
        <p>Valor da Empresa: R$ {valorEmpresa.toFixed(2)}</p>
      </div>
      <div className="actions">
        <div className="action-left">
          <FaPlus className="icon" />
        </div>
        <div className="action-center">
          <FaEdit className="icon" onClick={openModal} />
        </div>
        <div className="action-right">
          <FaTrash className="icon" />
        </div>
      </div>

 
    </div>
  );
};

export default CardCliente;