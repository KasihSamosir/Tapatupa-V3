import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/JenisObjekRetribusi.css'; // Jika Anda memiliki file CSS khusus

const JenisObjekRetribusi = () => {
    const [jenisObjekRetribusiList, setJenisObjekRetribusiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newJenisObjekRetribusi, setNewJenisObjekRetribusi] = useState({ jenisObjekRetribusi: '', keterangan: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ idJenisObjekRetribusi: null, jenisObjekRetribusi: '', keterangan: '' });

    useEffect(() => {
        fetchJenisObjekRetribusi();
    }, []);

    const fetchJenisObjekRetribusi = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-objek-retribusi');
            setJenisObjekRetribusiList(response.data.data);
            setLoading(false);
            console.log('Data Jenis Objek Retribusi:', response.data.data);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setNewJenisObjekRetribusi({ jenisObjekRetribusi: '', keterangan: '' });
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewJenisObjekRetribusi(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        console.log('Data yang akan dikirim saat menambah:', newJenisObjekRetribusi);
        try {
            await axios.post('http://127.0.0.1:8000/api/jenis-objek-retribusi', newJenisObjekRetribusi);
            fetchJenisObjekRetribusi();
            setIsAdding(false);
            setNewJenisObjekRetribusi({ jenisObjekRetribusi: '', keterangan: '' });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleEditClick = (item) => {
        setIsEditing(true);
        setEditingItem({ ...item });
        console.log('Item yang akan diedit:', item);
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
        console.log('Data yang akan dikirim saat mengedit:', editingItem);
        try {
            await axios.put(`http://127.0.0.1:8000/api/jenis-objek-retribusi/${editingItem.idJenisObjekRetribusi}`, editingItem);
            fetchJenisObjekRetribusi();
            setIsEditing(false);
            setEditingItem({ idJenisObjekRetribusi: null, jenisObjekRetribusi: '', keterangan: '' });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleDeleteClick = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus jenis objek retribusi ini?')) {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/jenis-objek-retribusi/${id}`);
            fetchJenisObjekRetribusi();
        } catch (err) {
            setError(err.message);
        }
    }
};

    if (loading) {
        return <div>Loading data jenis objek retribusi...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="jenis-objek-retribusi-container">
            <h2>Manajemen Jenis Objek Retribusi</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Jenis Objek Retribusi</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Jenis Objek Retribusi Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisObjekRetribusi">Jenis Objek Retribusi</label>
                            <input
                                type="text"
                                id="jenisObjekRetribusi"
                                name="jenisObjekRetribusi"
                                value={newJenisObjekRetribusi.jenisObjekRetribusi}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newJenisObjekRetribusi.keterangan}
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
                    <h3>Edit Jenis Objek Retribusi</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisObjekRetribusi">Jenis Objek Retribusi</label>
                            <input
                                type="text"
                                id="jenisObjekRetribusi"
                                name="jenisObjekRetribusi"
                                value={editingItem.jenisObjekRetribusi}
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

            <table className="jenis-objek-retribusi-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis Objek Retribusi</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jenisObjekRetribusiList.map(item => (
                        <tr key={item.idJenisObjekRetribusi}>
                            <td>{item.idJenisObjekRetribusi}</td>
                            <td>{item.jenisObjekRetribusi}</td>
                            <td>{item.keterangan}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idJenisObjekRetribusi)}>
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

export default JenisObjekRetribusi;