import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import './List.css';

interface Cliente {
  nome: string;
  salario: number;
  valorEmpresa: number;
}

const Listagem: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([
    { nome: 'Eduardo', salario: 3500, valorEmpresa: 120000 },
    { nome: 'Maria', salario: 2500, valorEmpresa: 80000 },
    { nome: 'João', salario: 4000, valorEmpresa: 150000 },
    { nome: 'Ana', salario: 3000, valorEmpresa: 100000 },
    { nome: 'Pedro', salario: 5000, valorEmpresa: 200000 },
    { nome: 'Lucas', salario: 2800, valorEmpresa: 90000 },
    { nome: 'Sofia', salario: 3200, valorEmpresa: 110000 },
    { nome: 'Gabriel', salario: 4500, valorEmpresa: 180000 },
    { nome: 'Isabela', salario: 2900, valorEmpresa: 95000 },
    { nome: 'Matheus', salario: 3800, valorEmpresa: 130000 },
  ]);
  const [clientesPorPagina, setClientesPorPagina] = useState(4);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedClienteIndex, setEditedClienteIndex] = useState<number | null>(null);
  const [editedNome, setEditedNome] = useState('');
  const [editedSalario, setEditedSalario] = useState(0);
  const [editedValorEmpresa, setEditedValorEmpresa] = useState(0);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [clienteToDeleteIndex, setClienteToDeleteIndex] = useState<number | null>(null);

  const handleClientesPorPaginaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setClientesPorPagina(parseInt(event.target.value));
    setPaginaAtual(1);
  };

  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);
  const indiceUltimoCliente = paginaAtual * clientesPorPagina;
  const indicePrimeiroCliente = indiceUltimoCliente - clientesPorPagina;
  const clientesExibidos = clientes.slice(indicePrimeiroCliente, indiceUltimoCliente);

  const handleProximaPagina = () => {
    if (paginaAtual < totalPaginas) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const openModal = (index: number) => {
    setEditedClienteIndex(index);
    setEditedNome(clientes[index].nome);
    setEditedSalario(clientes[index].salario);
    setEditedValorEmpresa(clientes[index].valorEmpresa);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditedClienteIndex(null);
  };

  const handleUpdateCliente = () => {
    if (editedClienteIndex !== null) {
      const updatedClientes = clientes.map((cliente, i) => {
        if (i === editedClienteIndex) {
          return { nome: editedNome, salario: editedSalario, valorEmpresa: editedValorEmpresa };
        }
        return cliente;
      });
      setClientes(updatedClientes);
      closeModal();
    }
  };

  const openDeleteModal = (index: number) => {
    setClienteToDeleteIndex(index);
    setDeleteModalIsOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setClienteToDeleteIndex(null);
  };

  const handleDeleteCliente = () => {
    if (clienteToDeleteIndex !== null) {
      const updatedClientes = clientes.filter((_, i) => i !== clienteToDeleteIndex);
      setClientes(updatedClientes);
      closeDeleteModal();
    }
  };

  return (
    <div className="listagem-container">
      <h1>Lista de Clientes</h1>
      <div className="cards-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ textAlign: 'left' }}>{clientes.length} clientes nesta página</h4>
          <div style={{ textAlign: 'right' }}>
            <label htmlFor="clientesPorPagina">Clientes por página:</label>
            <select id="clientesPorPagina" value={clientesPorPagina} onChange={handleClientesPorPaginaChange}>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {clientesExibidos.map((cliente, index) => (
            <div key={index} className="card-cliente">
              <h3>{cliente.nome}</h3>
              <div className="info">
                <p>Salário: R$ {cliente.salario.toFixed(2)}</p>
                <p>Valor da Empresa: R$ {cliente.valorEmpresa.toFixed(2)}</p>
              </div>
              <div className="actions">
                <div className="action-left">
                  <FaPlus className="icon" />
                </div>
                <div className="action-center">
                  <FaEdit className="icon" onClick={() => openModal(indicePrimeiroCliente + index)} />
                </div>
                <div className="action-right">
                  <FaTrash className="icon" onClick={() => openDeleteModal(indicePrimeiroCliente + index)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <button onClick={handlePaginaAnterior} disabled={paginaAtual === 1}>Anterior</button>
          <span style={{ margin: '0 10px' }}>Página {paginaAtual} de {totalPaginas}</span>
          <button onClick={handleProximaPagina} disabled={paginaAtual === totalPaginas}>Próxima</button>
        </div>
      </div>

      {modalIsOpen && (
        <div className="modal">
          <h3>Editar Cliente</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdateCliente(); }}>
            <div className="form-group">
              <input type="text" id="nome" value={editedNome} onChange={(e) => setEditedNome(e.target.value)} placeholder="Nome" />
            </div>
            <div className="form-group">
              <input type="number" id="salario" value={editedSalario} onChange={(e) => setEditedSalario(parseFloat(e.target.value))} placeholder="Salário" />
            </div>
            <div className="form-group">
              <input type="number" id="valorEmpresa" value={editedValorEmpresa} onChange={(e) => setEditedValorEmpresa(parseFloat(e.target.value))} placeholder="Valor da Empresa" />
            </div>
            <div className="modal-buttons">
              <button type="button" onClick={closeModal}>Cancelar</button>
              <button type="submit">Salvar</button>
            </div>
          </form>
        </div>
      )}

      {deleteModalIsOpen && (
        <div className="modal">
          <h3>Confirmar Exclusão</h3>
          <p>Tem certeza de que deseja excluir este cliente?</p>
          <div className="modal-buttons">
            <button type="button" onClick={closeDeleteModal}>Cancelar</button>
            <button type="button" onClick={handleDeleteCliente}>Excluir</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listagem;