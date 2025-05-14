import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/LokasiObjekRetribusi.css';

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
        return <div>Loading data lokasi objek retribusi...</div>;
    }

    if (error) {
        return <div>Error: {typeof error === 'string' ? error : error.message}</div>;
    }

    return (
        <div className="lokasi-objek-retribusi-container">
            <h2>Manajemen Lokasi Objek Retribusi</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Lokasi</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Lokasi Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="lokasiObjekRetribusi">Lokasi Objek Retribusi</label>
                            <input
                                type="text"
                                id="lokasiObjekRetribusi"
                                name="lokasiObjekRetribusi"
                                value={newLokasi.lokasiObjekRetribusi}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newLokasi.keterangan}
                                onChange={handleAddInputChange}
                            />
                        </div>
                        <button type="submit" className="save-button">Simpan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelAdd}>Batal</button>
                    </form>
                </div>
            )}

            {isEditing && (
                <div className="edit-form">
                    <h3>Edit Lokasi</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="lokasiObjekRetribusi">Lokasi Objek Retribusi</label>
                            <input
                                type="text"
                                id="lokasiObjekRetribusi"
                                name="lokasiObjekRetribusi"
                                value={editingItem.lokasiObjekRetribusi}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={editingItem.keterangan}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <button type="submit" className="save-button">Simpan Perubahan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>Batal</button>
                    </form>
                </div>
            )}

            <table className="lokasi-objek-retribusi-table">
                <thead>
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
                                <button className="edit-button" onClick={() => handleEditClick(lokasi)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(lokasi.idLokasiObjekRetribusi)}>
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

export default LokasiObjekRetribusi;