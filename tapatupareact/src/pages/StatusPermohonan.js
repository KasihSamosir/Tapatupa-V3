import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const StatusPermohonan = () => {
  const [statusPermohonanList, setStatusPermohonanList] = useState([]);
  const [jenisStatusList, setJenisStatusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newStatusPermohonan, setNewStatusPermohonan] = useState({ idJenisStatus: '', namaStatus: '', keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({ idStatus: null, idJenisStatus: '', namaStatus: '', keterangan: '' });
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchStatusPermohonan();
    fetchJenisStatus();
  }, []);

  const fetchStatusPermohonan = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/status-permohonan`);
      setStatusPermohonanList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchJenisStatus = async () => {
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/jenis-status`);
      setJenisStatusList(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewStatusPermohonan({ idJenisStatus: '', namaStatus: '', keterangan: '' });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewStatusPermohonan(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/status-permohonan`, newStatusPermohonan);
      fetchStatusPermohonan();
      setIsAdding(false);
      setNewStatusPermohonan({ idJenisStatus: '', namaStatus: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    } finally {
      setSubmitLoading(false);
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
    setEditingItem(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await axios.put(`${API_BASE_URL}/status-permohonan/${editingItem.idStatus}`, editingItem);
      fetchStatusPermohonan();
      setIsEditing(false);
      setEditingItem({ idStatus: null, idJenisStatus: '', namaStatus: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus status permohonan ini?')) {
      setError(null);
      try {
        await axios.delete(`${API_BASE_URL}/status-permohonan/${id}`);
        fetchStatusPermohonan();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <div className="text-center my-5">Loading data status permohonan...</div>;
  }

  if (error) {
    return <div className="alert alert-danger my-3">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manajemen Status Permohonan</h2>
      <button className="btn btn-success mb-3" onClick={handleAddClick}>
        Tambah Status Permohonan
      </button>

      {isAdding && (
        <div className="card mb-4 p-3 border-secondary">
          <h3 className="mb-3">Tambah Status Permohonan Baru</h3>
          <form onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <label htmlFor="idJenisStatus" className="form-label">
                Jenis Status
              </label>
              <select
                id="idJenisStatus"
                name="idJenisStatus"
                className="form-select"
                value={newStatusPermohonan.idJenisStatus}
                onChange={handleAddInputChange}
                required
              >
                <option value="">Pilih Jenis Status</option>
                {jenisStatusList.map((jenis) => (
                  <option key={jenis.idJenisStatus} value={jenis.idJenisStatus}>
                    {jenis.jenisStatus}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="namaStatus" className="form-label">
                Nama Status
              </label>
              <input
                type="text"
                id="namaStatus"
                name="namaStatus"
                className="form-control"
                value={newStatusPermohonan.namaStatus}
                onChange={handleAddInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <textarea
                id="keterangan"
                name="keterangan"
                className="form-control"
                value={newStatusPermohonan.keterangan}
                onChange={handleAddInputChange}
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2" disabled={submitLoading}>
              {submitLoading ? 'Menyimpan...' : 'Simpan'}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleCancelAdd} disabled={submitLoading}>
              Batal
            </button>
            {error && isAdding && (
              <div className="alert alert-danger mt-3">
                {error?.message || 'Terjadi kesalahan saat menambah data.'}
              </div>
            )}
          </form>
        </div>
      )}

      {isEditing && (
        <div className="card mb-4 p-3 border-secondary">
          <h3 className="mb-3">Edit Status Permohonan</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label htmlFor="idJenisStatus" className="form-label">
                Jenis Status
              </label>
              <select
                id="idJenisStatus"
                name="idJenisStatus"
                className="form-select"
                value={editingItem.idJenisStatus}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Pilih Jenis Status</option>
                {jenisStatusList.map((jenis) => (
                  <option key={jenis.idJenisStatus} value={jenis.idJenisStatus}>
                    {jenis.jenisStatus}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="namaStatus" className="form-label">
                Nama Status
              </label>
              <input
                type="text"
                id="namaStatus"
                name="namaStatus"
                className="form-control"
                value={editingItem.namaStatus}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <textarea
                id="keterangan"
                name="keterangan"
                className="form-control"
                value={editingItem.keterangan}
                onChange={handleEditInputChange}
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn-primary me-2" disabled={submitLoading}>
              {submitLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleCancelEdit} disabled={submitLoading}>
              Batal
            </button>
            {error && isEditing && (
              <div className="alert alert-danger mt-3">
                {error?.message || 'Terjadi kesalahan saat menyimpan perubahan.'}
              </div>
            )}
          </form>
        </div>
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Jenis Status</th>
            <th>Nama Status</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {statusPermohonanList.map((item) => (
            <tr key={item.idStatus}>
              <td>{item.idStatus}</td>
              <td>{item.jenis_status?.jenisStatus || '-'}</td>
              <td>{item.namaStatus}</td>
              <td>{item.keterangan}</td>
              <td>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEditClick(item)}>
                  <PencilSquare /> Edit
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item.idStatus)}>
                  <Trash /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusPermohonan;
