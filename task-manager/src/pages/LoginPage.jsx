import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login, loginWithGoogle } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
            navigate("/");
        } catch (error) {
            setError("Falha ao fazer login");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError("Falha ao fazer login com Google");
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register("email")} required />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" {...register("password")} required />
            </Form.Group>
            {error && <p>{error}</p>}
            <br /><Button type="submit">Login</Button>
            <Button onClick={handleGoogleLogin} variant="danger">Login com Google</Button>
        </Form>
    );
}

export default LoginPage;
