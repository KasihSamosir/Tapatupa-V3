import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/StatusPermohonan.css'; // Jika Anda memiliki file CSS khusus

const StatusPermohonan = () => {
    const [statusPermohonanList, setStatusPermohonanList] = useState([]);
    const [jenisStatusList, setJenisStatusList] = useState([]); // Untuk dropdown jenis status
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newStatusPermohonan, setNewStatusPermohonan] = useState({ idJenisStatus: '', namaStatus: '', keterangan: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ idStatus: null, idJenisStatus: '', namaStatus: '', keterangan: '' });

    useEffect(() => {
        fetchStatusPermohonan();
        fetchJenisStatus(); // Ambil daftar jenis status untuk dropdown
    }, []);

    const fetchStatusPermohonan = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/status-permohonan');
            setStatusPermohonanList(response.data.data);
            setLoading(false);
            console.log('Data Status Permohonan:', response.data.data); // Tambahkan log
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchJenisStatus = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-status');
            setJenisStatusList(response.data.data);
            console.log('Data Jenis Status:', response.data.data); // Tambahkan log
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
        setNewStatusPermohonan(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        console.log('Data yang akan dikirim saat menambah:', newStatusPermohonan); // Tambahkan log
        try {
            await axios.post('http://127.0.0.1:8000/api/status-permohonan', newStatusPermohonan);
            fetchStatusPermohonan();
            setIsAdding(false);
            setNewStatusPermohonan({ idJenisStatus: '', namaStatus: '', keterangan: '' });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleEditClick = (item) => {
        setIsEditing(true);
        setEditingItem({ ...item });
        console.log('Item yang akan diedit:', item); // Tambahkan baris ini
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
        console.log('Data yang akan dikirim saat mengedit:', editingItem); // Tambahkan log
        try {
            await axios.put(`http://127.0.0.1:8000/api/status-permohonan/${editingItem.idStatus}`, editingItem);
            fetchStatusPermohonan();
            setIsEditing(false);
            setEditingItem({ idStatus: null, idJenisStatus: '', namaStatus: '', keterangan: '' });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus status permohonan ini?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/status-permohonan/${id}`);
                fetchStatusPermohonan();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading data status permohonan...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="status-permohonan-container">
            <h2>Manajemen Status Permohonan</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Status Permohonan</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Status Permohonan Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisStatus">Jenis Status</label>
                            <select
                                id="idJenisStatus"
                                name="idJenisStatus"
                                value={newStatusPermohonan.idJenisStatus}
                                onChange={handleAddInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Status</option>
                                {jenisStatusList.map(jenis => (
                                    <option key={jenis.idJenisStatus} value={jenis.idJenisStatus}>{jenis.jenisStatus}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="namaStatus">Nama Status</label>
                            <input
                                type="text"
                                id="namaStatus"
                                name="namaStatus"
                                value={newStatusPermohonan.namaStatus}
                                onChange={handleAddInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newStatusPermohonan.keterangan}
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
                    <h3>Edit Status Permohonan</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisStatus">Jenis Status</label>
                            <select
                                id="idJenisStatus"
                                name="idJenisStatus"
                                value={editingItem.idJenisStatus}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Status</option>
                                {jenisStatusList.map(jenis => (
                                    <option key={jenis.idJenisStatus} value={jenis.idJenisStatus}>{jenis.jenisStatus}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="namaStatus">Nama Status</label>
                            <input
                                type="text"
                                id="namaStatus"
                                name="namaStatus"
                                value={editingItem.namaStatus}
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

            <table className="status-permohonan-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis Status</th>
                        <th>Nama Status</th>
                        <th>Keterangan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {statusPermohonanList.map(item => (
                        <tr key={item.idStatus}>
                            <td>{item.idStatus}</td>
                            <td>{item.jenis_status?.jenisStatus}</td> {/* PERUBAHAN DI SINI */}
                            <td>{item.namaStatus}</td>
                            <td>{item.keterangan}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idStatus)}>
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