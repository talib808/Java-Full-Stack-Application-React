import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dept: "",
    age: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8082/addStudent",
        formData
      );
      alert("Student Added Successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred while adding the student:", error);
      alert("An error occurred while adding the student.");
    }
  };

  const handleViewStudents = () => {
    navigate("/view-students");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white text-center">
              <h2>Add Student</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Student ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Department</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department"
                    name="dept"
                    value={formData.dept}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <h4
              onClick={handleViewStudents}
              style={{ cursor: "pointer", color: "blue" }}
            >
              View Students
            </h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddStudent;
