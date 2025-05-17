import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const JangkaWaktuSewa = () => {
    const [jangkaWaktuSewaList, setJangkaWaktuSewaList] = useState([]);
    const [jenisJangkaWaktuList, setJenisJangkaWaktuList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newJangkaWaktuSewa, setNewJangkaWaktuSewa] = useState({ idJenisJangkaWaktu: '', jangkaWaktu: '', isDefault: false });
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ idJangkaWaktuSewa: null, idJenisJangkaWaktu: '', jangkaWaktu: '', isDefault: false });

    useEffect(() => {
        fetchJangkaWaktuSewa();
        fetchJenisJangkaWaktu();
    }, []);

    const fetchJangkaWaktuSewa = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jangka-waktu-sewa');
            setJangkaWaktuSewaList(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchJenisJangkaWaktu = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-jangka-waktu');
            setJenisJangkaWaktuList(response.data.data);
        } catch (err) {
            console.error("Gagal mengambil jenis jangka waktu:", err);
            setError(error ? `${error} | Gagal mengambil jenis jangka waktu` : 'Gagal mengambil jenis jangka waktu');
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setNewJangkaWaktuSewa({ idJenisJangkaWaktu: '', jangkaWaktu: '', isDefault: false });
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleAddInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewJangkaWaktuSewa(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/jangka-waktu-sewa', newJangkaWaktuSewa);
            fetchJangkaWaktuSewa();
            setIsAdding(false);
            setNewJangkaWaktuSewa({ idJenisJangkaWaktu: '', jangkaWaktu: '', isDefault: false });
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
        const { name, value, type, checked } = e.target;
        setEditingItem(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/jangka-waktu-sewa/${editingItem.idJangkaWaktuSewa}`, editingItem);
            fetchJangkaWaktuSewa();
            setIsEditing(false);
            setEditingItem({ idJangkaWaktuSewa: null, idJenisJangkaWaktu: '', jangkaWaktu: '', isDefault: false });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jangka waktu sewa ini?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/jangka-waktu-sewa/${id}`);
                fetchJangkaWaktuSewa();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) return <div className="container mt-4">Loading data jangka waktu sewa...</div>;
    if (error) return <div className="container mt-4 text-danger">Error: {JSON.stringify(error)}</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manajemen Jangka Waktu Sewa</h2>
            <button className="btn btn-primary mb-3" onClick={handleAddClick}>Tambah Jangka Waktu Sewa</button>

            {isAdding && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Tambah Jangka Waktu Sewa Baru</h5>
                        <form onSubmit={handleAddSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Jenis Jangka Waktu</label>
                                <select className="form-select" name="idJenisJangkaWaktu" value={newJangkaWaktuSewa.idJenisJangkaWaktu} onChange={handleAddInputChange} required>
                                    <option value="">Pilih Jenis Jangka Waktu</option>
                                    {jenisJangkaWaktuList.map(jenis => (
                                        <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                                            {jenis.jenisJangkaWaktu}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Jangka Waktu</label>
                                <input type="text" className="form-control" name="jangkaWaktu" value={newJangkaWaktuSewa.jangkaWaktu} onChange={handleAddInputChange} required />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" name="isDefault" checked={newJangkaWaktuSewa.isDefault} onChange={handleAddInputChange} />
                                <label className="form-check-label">Default</label>
                            </div>
                            <button type="submit" className="btn btn-success me-2">Simpan</button>
                            <button type="button" className="btn btn-danger" onClick={handleCancelAdd}>Batal</button>
                        </form>
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Edit Jangka Waktu Sewa</h5>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Jenis Jangka Waktu</label>
                                <select className="form-select" name="idJenisJangkaWaktu" value={editingItem.idJenisJangkaWaktu} onChange={handleEditInputChange} required>
                                    <option value="">Pilih Jenis Jangka Waktu</option>
                                    {jenisJangkaWaktuList.map(jenis => (
                                        <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                                            {jenis.jenisJangkaWaktu}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Jangka Waktu</label>
                                <input type="text" className="form-control" name="jangkaWaktu" value={editingItem.jangkaWaktu} onChange={handleEditInputChange} required />
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" name="isDefault" checked={editingItem.isDefault} onChange={handleEditInputChange} />
                                <label className="form-check-label">Default</label>
                            </div>
                            <button type="submit" className="btn btn-success me-2">Simpan Perubahan</button>
                            <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>Batal</button>
                        </form>
                    </div>
                </div>
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Jenis Jangka Waktu</th>
                        <th>Jangka Waktu</th>
                        <th>Default</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jangkaWaktuSewaList.map(item => (
                        <tr key={item.idJangkaWaktuSewa}>
                            <td>{item.idJangkaWaktuSewa}</td>
                            <td>{jenisJangkaWaktuList.find(j => j.idJenisJangkaWaktu === item.idJenisJangkaWaktu)?.jenisJangkaWaktu}</td>
                            <td>{item.jangkaWaktu}</td>
                            <td>{item.isDefault ? 'Ya' : 'Tidak'}</td>
                            <td>
                                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEditClick(item)}>
                                    <PencilSquare className="me-1" /> Edit
                                </button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteClick(item.idJangkaWaktuSewa)}>
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

export default JangkaWaktuSewa;
