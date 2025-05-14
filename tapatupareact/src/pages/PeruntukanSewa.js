import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/PeruntukanSewa.css'; // Jika ada CSS khusus

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

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewPeruntukanSewa(prevState => ({ ...prevState, [name]: value }));
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
        await axios.put(`http://127.0.0.1:8000/api/peruntukan-sewa/${editingItem.idPeruntukanSewa}`, editingItem);
        fetchPeruntukanSewa(); // Pastikan fungsi fetchPeruntukanSewa didefinisikan sebelumnya
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
            fetchPeruntukanSewa(); // Pastikan fungsi fetchPeruntukanSewa didefinisikan sebelumnya
        } catch (err) {
            setError(err.message);
        }
    }
};


    if (loading) {
        return <div>Loading data peruntukan sewa...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="peruntukan-sewa-container">
            <h2>Manajemen Peruntukan Sewa</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Peruntukan Sewa</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Peruntukan Sewa Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisKegiatan">Jenis Kegiatan</label>
                            <input
                                type="text"
                                id="jenisKegiatan"
                                name="jenisKegiatan"
                                value={newPeruntukanSewa.jenisKegiatan}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="peruntukanSewa">Peruntukan Sewa</label>
                            <input
                                type="text"
                                id="peruntukanSewa"
                                name="peruntukanSewa"
                                value={newPeruntukanSewa.peruntukanSewa}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newPeruntukanSewa.keterangan}
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
                    <h3>Edit Peruntukan Sewa</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="jenisKegiatan">Jenis Kegiatan</label>
                            <input
                                type="text"
                                id="jenisKegiatan"
                                name="jenisKegiatan"
                                value={editingItem.jenisKegiatan}
                                onChange={handleEditInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="peruntukanSewa">Peruntukan Sewa</label>
                            <input
                                type="text"
                                id="peruntukanSewa"
                                name="peruntukanSewa"
                                value={editingItem.peruntukanSewa}
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

            <table className="peruntukan-sewa-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis Kegiatan</th>
                        <th>Peruntukan Sewa</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
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
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idPeruntukanSewa)}>
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

export default PeruntukanSewa;