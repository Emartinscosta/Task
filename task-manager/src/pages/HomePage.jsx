import React from 'react';
import { Container } from 'react-bootstrap';
import TaskList from '../components/TaskList';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../context/AuthContext';

function HomePage() {
    const { tasks, addTask, updateTask, deleteTask } = useFirestore();
    const { logout } = useAuth();

    const handleAddTask = () => {
        const newTask = {
            title: "Nova Tarefa",
            description: "Descrição da nova tarefa",
            status: false
        };
        addTask(newTask);
    };

    return (
        <Container>
            <h1>Gerenciador de Tarefas</h1>
            <button onClick={handleAddTask}>Adicionar Tarefa</button>
            <TaskList tasks={tasks} onUpdate={updateTask} onDelete={deleteTask} />
            <button onClick={logout}>Logout</button>
        </Container>
    );
}

export default HomePage;
