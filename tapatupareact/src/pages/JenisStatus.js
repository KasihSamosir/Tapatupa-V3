import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const JenisStatus = () => {
  const [jenisStatusList, setJenisStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newJenisStatus, setNewJenisStatus] = useState({ jenisStatus: '', keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({ idJenisStatus: null, jenisStatus: '', keterangan: '' });

  useEffect(() => {
    fetchJenisStatus();
  }, []);

  const fetchJenisStatus = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/jenis-status');
      setJenisStatusList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError({ message: err.message });
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setError(null);
    setNewJenisStatus({ jenisStatus: '', keterangan: '' });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
    setError(null);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewJenisStatus(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/jenis-status', newJenisStatus);
      fetchJenisStatus();
      setIsAdding(false);
      setNewJenisStatus({ jenisStatus: '', keterangan: '' });
      setError(null);
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat();
        setError({ message: messages.join(', ') });
      } else {
        setError({ message: err.message });
      }
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setError(null);
    setEditingItem({ ...item });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem(prevState => ({ ...prevState, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/jenis-status/${editingItem.idJenisStatus}`, editingItem);
      fetchJenisStatus();
      setIsEditing(false);
      setEditingItem({ idJenisStatus: null, jenisStatus: '', keterangan: '' });
      setError(null);
    } catch (err) {
      if (err.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors).flat();
        setError({ message: messages.join(', ') });
      } else {
        setError({ message: err.message });
      }
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jenis status ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/jenis-status/${id}`);
        fetchJenisStatus();
        setError(null);
      } catch (err) {
        setError({ message: err.message });
      }
    }
  };

  if (loading) {
    return <div className="container py-5 text-center">Loading data jenis status...</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Manajemen Jenis Status</h2>
      <button className="btn btn-success mb-3" onClick={handleAddClick}>Tambah Jenis Status</button>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error.message}
        </div>
      )}

      {isAdding && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5 className="mb-3">Tambah Jenis Status Baru</h5>
          <form onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <label htmlFor="jenisStatus" className="form-label">Jenis Status</label>
              <input
                type="text"
                id="jenisStatus"
                name="jenisStatus"
                value={newJenisStatus.jenisStatus}
                onChange={handleAddInputChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">Keterangan</label>
              <textarea
                id="keterangan"
                name="keterangan"
                value={newJenisStatus.keterangan}
                onChange={handleAddInputChange}
                className="form-control"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Simpan</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>Batal</button>
          </form>
        </div>
      )}

      {isEditing && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5 className="mb-3">Edit Jenis Status</h5>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label htmlFor="jenisStatus" className="form-label">Jenis Status</label>
              <input
                type="text"
                id="jenisStatus"
                name="jenisStatus"
                value={editingItem.jenisStatus}
                onChange={handleEditInputChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">Keterangan</label>
              <textarea
                id="keterangan"
                name="keterangan"
                value={editingItem.keterangan}
                onChange={handleEditInputChange}
                className="form-control"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Simpan Perubahan</button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Batal</button>
          </form>
        </div>
      )}

      <table className="table table-striped table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Jenis Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jenisStatusList.map(item => (
            <tr key={item.idJenisStatus}>
              <td>{item.idJenisStatus}</td>
              <td>{item.jenisStatus}</td>
              <td>{item.keterangan}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEditClick(item)}
                  aria-label={`Edit jenis status ${item.jenisStatus}`}
                >
                  <PencilSquare className="me-1" /> Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteClick(item.idJenisStatus)}
                  aria-label={`Hapus jenis status ${item.jenisStatus}`}
                >
                  <Trash className="me-1" /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JenisStatus;
