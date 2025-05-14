import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/JenisStatus.css'; // Jika Anda memiliki file CSS khusus

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
            console.log('Data Jenis Status:', response.data.data);
            setLoading(false); // Perbaikan: Set loading menjadi false setelah berhasil
        } catch (err) {
            setError(err.message);
            setLoading(false); // Pastikan loading juga di-set false jika terjadi error
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setNewJenisStatus({ jenisStatus: '', keterangan: '' });
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
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
            await axios.put(`http://127.0.0.1:8000/api/jenis-status/${editingItem.idJenisStatus}`, editingItem);
            fetchJenisStatus();
            setIsEditing(false);
            setEditingItem({ idJenisStatus: null, jenisStatus: '', keterangan: '' });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jenis status ini?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/jenis-status/${id}`);
                fetchJenisStatus();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading data jenis status...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="jenis-status-container">
            <h2>Manajemen Jenis Status</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Jenis Status</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Jenis Status Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisStatus">Jenis Status</label>
                            <input
                                type="text"
                                id="jenisStatus"
                                name="jenisStatus"
                                value={newJenisStatus.jenisStatus}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newJenisStatus.keterangan}
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
                    <h3>Edit Jenis Status</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisStatus">Jenis Status</label>
                            <input
                                type="text"
                                id="jenisStatus"
                                name="jenisStatus"
                                value={editingItem.jenisStatus}
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

            <table className="jenis-status-table">
                <thead>
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
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idJenisStatus)}>
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

export default JenisStatus;