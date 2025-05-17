import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { PencilSquare, Trash } from 'react-bootstrap-icons'; // di-comment dulu kalau belum install icon
// import '../CSS/JenisJangkaWaktu.css'; // Tidak perlu kalau semua styling Bootstrap

const JenisJangkaWaktu = () => {
  const [jenisJangkaWaktuList, setJenisJangkaWaktuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newJenisJangkaWaktu, setNewJenisJangkaWaktu] = useState({ jenisJangkaWaktu: '', keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({ idJenisJangkaWaktu: null, jenisJangkaWaktu: '', keterangan: '' });

  useEffect(() => {
    fetchJenisJangkaWaktu();
  }, []);

  const fetchJenisJangkaWaktu = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/jenis-jangka-waktu');
      setJenisJangkaWaktuList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewJenisJangkaWaktu({ jenisJangkaWaktu: '', keterangan: '' });
  };

  const handleCancelAdd = () => setIsAdding(false);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewJenisJangkaWaktu(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/jenis-jangka-waktu', newJenisJangkaWaktu);
      fetchJenisJangkaWaktu();
      setIsAdding(false);
      setNewJenisJangkaWaktu({ jenisJangkaWaktu: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    }
  };

  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditingItem({ ...item });
  };

  const handleCancelEdit = () => setIsEditing(false);

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingItem(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/jenis-jangka-waktu/${editingItem.idJenisJangkaWaktu}`, editingItem);
      fetchJenisJangkaWaktu();
      setIsEditing(false);
      setEditingItem({ idJenisJangkaWaktu: null, jenisJangkaWaktu: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jenis jangka waktu ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/jenis-jangka-waktu/${id}`);
        fetchJenisJangkaWaktu();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading data jenis jangka waktu...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">Manajemen Jenis Jangka Waktu</h2>
      <button className="btn btn-primary mb-3" onClick={handleAddClick}>Tambah Jenis Jangka Waktu</button>

      {isAdding && (
        <div className="card mb-4 p-3 bg-light">
          <h3>Tambah Jenis Jangka Waktu Baru</h3>
          <form onSubmit={handleAddSubmit}>
            <div className="mb-3">
              <label htmlFor="jenisJangkaWaktu" className="form-label fw-bold">Jenis Jangka Waktu</label>
              <input
                type="text"
                id="jenisJangkaWaktu"
                name="jenisJangkaWaktu"
                value={newJenisJangkaWaktu.jenisJangkaWaktu}
                onChange={handleAddInputChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label fw-bold">Keterangan</label>
              <textarea
                id="keterangan"
                name="keterangan"
                value={newJenisJangkaWaktu.keterangan}
                onChange={handleAddInputChange}
                className="form-control"
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn-success me-2">Simpan</button>
            <button type="button" className="btn btn-danger" onClick={handleCancelAdd}>Batal</button>
          </form>
        </div>
      )}

      {isEditing && (
        <div className="card mb-4 p-3 bg-light">
          <h3>Edit Jenis Jangka Waktu</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="mb-3">
              <label htmlFor="jenisJangkaWaktuEdit" className="form-label fw-bold">Jenis Jangka Waktu</label>
              <input
                type="text"
                id="jenisJangkaWaktuEdit"
                name="jenisJangkaWaktu"
                value={editingItem.jenisJangkaWaktu}
                onChange={handleEditInputChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="keteranganEdit" className="form-label fw-bold">Keterangan</label>
              <textarea
                id="keteranganEdit"
                name="keterangan"
                value={editingItem.keterangan}
                onChange={handleEditInputChange}
                className="form-control"
                rows={3}
              />
            </div>
            <button type="submit" className="btn btn-success me-2">Simpan Perubahan</button>
            <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>Batal</button>
          </form>
        </div>
      )}

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Jenis Jangka Waktu</th>
            <th>Keterangan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {jenisJangkaWaktuList.map(item => (
            <tr key={item.idJenisJangkaWaktu}>
              <td>{item.idJenisJangkaWaktu}</td>
              <td>{item.jenisJangkaWaktu}</td>
              <td>{item.keterangan}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteClick(item.idJenisJangkaWaktu)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JenisJangkaWaktu;
