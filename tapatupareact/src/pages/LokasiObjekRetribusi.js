import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { Table, Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';

const LokasiObjekRetribusi = () => {
  const [lokasiList, setLokasiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newLokasi, setNewLokasi] = useState({ lokasiObjekRetribusi: '', keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({ idLokasiObjekRetribusi: null, lokasiObjekRetribusi: '', keterangan: '' });

  useEffect(() => {
    fetchLokasiObjekRetribusi();
  }, []);

  const fetchLokasiObjekRetribusi = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/lokasi-objek-retribusi');
      setLokasiList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewLokasi({ lokasiObjekRetribusi: '', keterangan: '' });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewLokasi(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/lokasi-objek-retribusi', newLokasi);
      fetchLokasiObjekRetribusi();
      setIsAdding(false);
      setNewLokasi({ lokasiObjekRetribusi: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditingItem({ ...item });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/lokasi-objek-retribusi/${editingItem.idLokasiObjekRetribusi}`, editingItem);
      fetchLokasiObjekRetribusi();
      setIsEditing(false);
      setEditingItem({ idLokasiObjekRetribusi: null, lokasiObjekRetribusi: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/lokasi-objek-retribusi/${id}`);
        fetchLokasiObjekRetribusi();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading data lokasi objek retribusi...</span>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-primary">Manajemen Lokasi Objek Retribusi</h2>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </Alert>
      )}

      <Button variant="success" className="mb-3" onClick={handleAddClick}>
        Tambah Lokasi
      </Button>

      {isAdding && (
        <Form onSubmit={handleAddSubmit} className="mb-4 border p-3 rounded bg-light">
          <h5>Tambah Lokasi Baru</h5>
          <Form.Group className="mb-3" controlId="lokasiObjekRetribusi">
            <Form.Label>Lokasi Objek Retribusi</Form.Label>
            <Form.Control
              type="text"
              name="lokasiObjekRetribusi"
              value={newLokasi.lokasiObjekRetribusi}
              onChange={handleAddInputChange}
              required
              placeholder="Masukkan lokasi objek retribusi"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="keterangan">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              value={newLokasi.keterangan}
              onChange={handleAddInputChange}
              placeholder="Masukkan keterangan (opsional)"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Simpan
          </Button>
          <Button variant="secondary" onClick={handleCancelAdd}>
            Batal
          </Button>
        </Form>
      )}

      {isEditing && (
        <Form onSubmit={handleEditSubmit} className="mb-4 border p-3 rounded bg-light">
          <h5>Edit Lokasi</h5>
          <Form.Group className="mb-3" controlId="editLokasiObjekRetribusi">
            <Form.Label>Lokasi Objek Retribusi</Form.Label>
            <Form.Control
              type="text"
              name="lokasiObjekRetribusi"
              value={editingItem.lokasiObjekRetribusi}
              onChange={handleEditInputChange}
              required
              placeholder="Masukkan lokasi objek retribusi"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="editKeterangan">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              value={editingItem.keterangan}
              onChange={handleEditInputChange}
              placeholder="Masukkan keterangan (opsional)"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Simpan Perubahan
          </Button>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Batal
          </Button>
        </Form>
      )}

      <Table striped bordered hover responsive>
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Lokasi Objek Retribusi</th>
            <th>Keterangan</th>
            <th>Create At</th>
            <th>Update At</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {lokasiList.map(lokasi => (
            <tr key={lokasi.idLokasiObjekRetribusi}>
              <td>{lokasi.idLokasiObjekRetribusi}</td>
              <td>{lokasi.lokasiObjekRetribusi}</td>
              <td>{lokasi.keterangan}</td>
              <td>{new Date(lokasi.created_at).toLocaleString()}</td>
              <td>{new Date(lokasi.updated_at).toLocaleString()}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditClick(lokasi)}
                >
                  <PencilSquare /> Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(lokasi.idLokasiObjekRetribusi)}
                >
                  <Trash /> Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LokasiObjekRetribusi;
