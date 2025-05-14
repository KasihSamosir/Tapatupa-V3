import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/JenisJangkaWaktu.css'; // Jika ada CSS khusus

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

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewJenisJangkaWaktu(prevState => ({ ...prevState, [name]: value }));
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

    if (loading) {
        return <div>Loading data jenis jangka waktu...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="jenis-jangka-waktu-container">
            <h2>Manajemen Jenis Jangka Waktu</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Jenis Jangka Waktu</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Jenis Jangka Waktu Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisJangkaWaktu">Jenis Jangka Waktu</label>
                            <input
                                type="text"
                                id="jenisJangkaWaktu"
                                name="jenisJangkaWaktu"
                                value={newJenisJangkaWaktu.jenisJangkaWaktu}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newJenisJangkaWaktu.keterangan}
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
                    <h3>Edit Jenis Jangka Waktu</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisJangkaWaktu">Jenis Jangka Waktu</label>
                            <input
                                type="text"
                                id="jenisJangkaWaktu"
                                name="jenisJangkaWaktu"
                                value={editingItem.jenisJangkaWaktu}
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

            <table className="jenis-jangka-waktu-table">
                <thead>
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
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idJenisJangkaWaktu)}>
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

export default JenisJangkaWaktu;