import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const AddMoviePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        year: '',
        description: '',
        genre: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const notyf = new Notyf();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Ensure year is sent as a number
        const formattedData = {
            ...formData,
            year: Number(formData.year) // Convert year to a number
        };

        try {
            const token = localStorage.getItem("token"); // Fetch token

            const response = await fetch("https://movieapp-api-lms1.onrender.com/movies/addMovie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Ensure token is included
                },
                body: JSON.stringify(formattedData)
            });

            const responseData = await response.json();
            console.log("Server Response:", responseData); // Debugging

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to add movie");
            }

            notyf.success("Movie added successfully!");
            setFormData({ title: '', director: '', year: '', description: '', genre: '' });
            setTimeout(() => navigate("/movies"), 2000); // Redirect after 2 seconds
        } catch (err) {
            console.error("Error:", err);
            setError(err.message);
            notyf.error("Failed to add movie");
        }
    };

    return (
        <Container>
            <h2 className="text-center my-4">Add Movie</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Director</Form.Label>
                    <Form.Control type="text" name="director" value={formData.director} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Year</Form.Label>
                    <Form.Control type="number" name="year" value={formData.year} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Add Movie</Button>
            </Form>
        </Container>
    );
};

export default AddMoviePage;
