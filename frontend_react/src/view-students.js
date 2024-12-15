import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table, Modal, Spinner } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Add icons for buttons

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
    dept: "",
    age: ""
  });
  const [isFormOpen, setFormOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    const baseURL = "http://localhost:8082/getStudents";
    try {
      const response = await axios.get(baseURL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    const deleteURL = `http://localhost:8082/deleteStudent/${id}`;
    setIsDeleting(true);
    try {
      await axios.delete(deleteURL);
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({ ...selectedStudent, [name]: value });
  };

  const updateStudent = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost:8082/updateStudent";
    setLoading(true);
    try {
      await axios.post(baseURL, selectedStudent);
      setFormOpen(false);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Students List</h1>

      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.dept}</td>
                <td>
                  <Button variant="warning" onClick={() => handleUpdate(student)}><FaEdit /></Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteStudent(student.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Spinner as="span" animation="border" size="sm" /> : <FaTrashAlt />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={isFormOpen} onHide={() => setFormOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateStudent}>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                name="id"
                value={selectedStudent.id}
                onChange={handleChange}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={selectedStudent.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                placeholder="Department"
                name="dept"
                value={selectedStudent.dept}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                name="age"
                value={selectedStudent.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewStudents;
