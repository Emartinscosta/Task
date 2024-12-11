import React from 'react';
import { Button } from 'react-bootstrap';

function Task({ task, onUpdate, onDelete }) {
    return (
        <div className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status ? "Concluído" : "Pendente"}</p>
            <Button variant="primary" onClick={() => onUpdate(task)}>Atualizar</Button>
            <Button variant="danger" onClick={() => onDelete(task.id)}>Excluir</Button>
        </div>
    );
}

export default Task;
