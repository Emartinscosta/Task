import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./services/tasks";
import { Form, Button, Container, Row, Col, Navbar, Nav } from "react-bootstrap";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });


  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    await createTask(newTask);
    const tasks = await getTasks();
    setTasks(tasks);
    setNewTask({ title: "", description: "", date: "" }); // Limpar os campos
  };

  const handleUpdateTask = async (task) => {
    const updatedTitle = prompt("Novo título:", task.title);
    const updatedDescription = prompt("Nova descrição:", task.description);
    await updateTask(task.id, {
      title: updatedTitle,
      description: updatedDescription,
    });
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    const tasks = await getTasks();
    setTasks(tasks);
  };

  return (
    <Container className="mt-5">
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Nav className="ms-auto">
            
          </Nav>
        </Container>
      </Navbar>
      <h1 className="mb-4 text-center"><strong>Gerenciador de Tarefas</strong></h1>
      <Form>
        <Form.Group controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Digite o título da tarefa"
          />
        </Form.Group>
        <br /><Form.Group controlId="formDescription" className="mt-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Digite a descrição da tarefa"
          />
        </Form.Group>
        <br /><Form.Group controlId="formDate" className="mt-3">
          <Form.Label>Data</Form.Label>
          <Form.Control
            type="date"
            value={newTask.date}
            onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          />
        </Form.Group>
        <br /><Button variant="primary" className="mt-3" onClick={handleCreateTask}>
          Adicionar Tarefa
        </Button>
      </Form>
      <Row className="mt-5">
        <Col>
          <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
