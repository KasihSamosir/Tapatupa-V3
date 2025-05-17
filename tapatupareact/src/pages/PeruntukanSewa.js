import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const PeruntukanSewa = () => {
  const [peruntukanSewaList, setPeruntukanSewaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newPeruntukanSewa, setNewPeruntukanSewa] = useState({ jenisKegiatan: '', peruntukanSewa: '', keterangan: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState({ idPeruntukanSewa: null, jenisKegiatan: '', peruntukanSewa: '', keterangan: '' });

  useEffect(() => {
    fetchPeruntukanSewa();
  }, []);

  const fetchPeruntukanSewa = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/peruntukan-sewa');
      setPeruntukanSewaList(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setNewPeruntukanSewa({ jenisKegiatan: '', peruntukanSewa: '', keterangan: '' });
  };

  const handleCancelAdd = () => setIsAdding(false);

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewPeruntukanSewa(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/peruntukan-sewa', newPeruntukanSewa);
      fetchPeruntukanSewa();
      setIsAdding(false);
      setNewPeruntukanSewa({ jenisKegiatan: '', peruntukanSewa: '', keterangan: '' });
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
      await axios.put(`http://127.0.0.1:8000/api/peruntukan-sewa/${editingItem.idPeruntukanSewa}`, editingItem);
      fetchPeruntukanSewa();
      setIsEditing(false);
      setEditingItem({ idPeruntukanSewa: null, jenisKegiatan: '', peruntukanSewa: '', keterangan: '' });
    } catch (err) {
      setError(err.response?.data?.errors || { message: err.message });
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus peruntukan sewa ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/peruntukan-sewa/${id}`);
        fetchPeruntukanSewa();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Loading data peruntukan sewa...</div>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manajemen Peruntukan Sewa</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}

      <button className="btn btn-success mb-3" onClick={handleAddClick}>Tambah Peruntukan Sewa</button>

      {isAdding && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Tambah Peruntukan Sewa Baru</h5>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-3">
                <label htmlFor="jenisKegiatan" className="form-label">Jenis Kegiatan</label>
                <input
                  type="text"
                  className="form-control"
                  id="jenisKegiatan"
                  name="jenisKegiatan"
                  value={newPeruntukanSewa.jenisKegiatan}
                  onChange={handleAddInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="peruntukanSewa" className="form-label">Peruntukan Sewa</label>
                <input
                  type="text"
                  className="form-control"
                  id="peruntukanSewa"
                  name="peruntukanSewa"
                  value={newPeruntukanSewa.peruntukanSewa}
                  onChange={handleAddInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keterangan" className="form-label">Keterangan</label>
                <textarea
                  className="form-control"
                  id="keterangan"
                  name="keterangan"
                  value={newPeruntukanSewa.keterangan}
                  onChange={handleAddInputChange}
                  rows={3}
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">Simpan</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancelAdd}>Batal</button>
            </form>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Edit Peruntukan Sewa</h5>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-3">
                <label htmlFor="jenisKegiatanEdit" className="form-label">Jenis Kegiatan</label>
                <input
                  type="text"
                  className="form-control"
                  id="jenisKegiatanEdit"
                  name="jenisKegiatan"
                  value={editingItem.jenisKegiatan}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="peruntukanSewaEdit" className="form-label">Peruntukan Sewa</label>
                <input
                  type="text"
                  className="form-control"
                  id="peruntukanSewaEdit"
                  name="peruntukanSewa"
                  value={editingItem.peruntukanSewa}
                  onChange={handleEditInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="keteranganEdit" className="form-label">Keterangan</label>
                <textarea
                  className="form-control"
                  id="keteranganEdit"
                  name="keterangan"
                  value={editingItem.keterangan}
                  onChange={handleEditInputChange}
                  rows={3}
                />
              </div>
              <button type="submit" className="btn btn-primary me-2">Simpan Perubahan</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Batal</button>
            </form>
          </div>
        </div>
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Jenis Kegiatan</th>
            <th>Peruntukan Sewa</th>
            <th>Keterangan</th>
            <th style={{ minWidth: '130px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {peruntukanSewaList.map(item => (
            <tr key={item.idPeruntukanSewa}>
              <td>{item.idPeruntukanSewa}</td>
              <td>{item.jenisKegiatan}</td>
              <td>{item.peruntukanSewa}</td>
              <td>{item.keterangan}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEditClick(item)}
                  title="Edit"
                >
                  <PencilSquare />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteClick(item.idPeruntukanSewa)}
                  title="Hapus"
                >
                  <Trash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeruntukanSewa;
