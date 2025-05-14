import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/JangkaWaktuSewa.css'; 

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

    if (loading) {
        return <div>Loading data jangka waktu sewa...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="jangka-waktu-sewa-container">
            <h2>Manajemen Jangka Waktu Sewa</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Jangka Waktu Sewa</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Jangka Waktu Sewa Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisJangkaWaktu">Jenis Jangka Waktu</label>
                            <select
                                id="idJenisJangkaWaktu"
                                name="idJenisJangkaWaktu"
                                value={newJangkaWaktuSewa.idJenisJangkaWaktu}
                                onChange={handleAddInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Jangka Waktu</option>
                                {jenisJangkaWaktuList.map(jenis => (
                                    <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                                        {jenis.jenisJangkaWaktu}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jangkaWaktu">Jangka Waktu</label>
                            <input
                                type="text"
                                id="jangkaWaktu"
                                name="jangkaWaktu"
                                value={newJangkaWaktuSewa.jangkaWaktu}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isDefault">Default</label>
                            <input
                                type="checkbox"
                                id="isDefault"
                                name="isDefault"
                                checked={newJangkaWaktuSewa.isDefault}
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
                    <h3>Edit Jangka Waktu Sewa</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisJangkaWaktu">Jenis Jangka Waktu</label>
                            <select
                                id="idJenisJangkaWaktu"
                                name="idJenisJangkaWaktu"
                                value={editingItem.idJenisJangkaWaktu}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Jangka Waktu</option>
                                {jenisJangkaWaktuList.map(jenis => (
                                    <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                                        {jenis.jenisJangkaWaktu}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jangkaWaktu">Jangka Waktu</label>
                            <input
                                type="text"
                                id="jangkaWaktu"
                                name="jangkaWaktu"
                                value={editingItem.jangkaWaktu}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="isDefault">Default</label>
                            <input
                                type="checkbox"
                                id="isDefault"
                                name="isDefault"
                                checked={editingItem.isDefault}
                                onChange={handleEditInputChange}
                            />
                        </div>
                        <button type="submit" className="save-button">Simpan Perubahan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>Batal</button>
                    </form>
                </div>
            )}

            <table className="jangka-waktu-sewa-table">
                <thead>
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
                            <td>{jenisJangkaWaktuList.find(jenis => jenis.idJenisJangkaWaktu === item.idJenisJangkaWaktu)?.jenisJangkaWaktu}</td>
                            <td>{item.jangkaWaktu}</td>
                            <td>{item.isDefault ? 'Ya' : 'Tidak'}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idJangkaWaktuSewa)}>
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

export default JangkaWaktuSewa;