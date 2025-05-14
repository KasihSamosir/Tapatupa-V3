import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/JenisPermohonan.css';

const JenisPermohonan = () => {
    const [jenisPermohonan, setJenisPermohonan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newJenisPermohonan, setNewJenisPermohonan] = useState({ parentId: null, jenisPermohonan: '', keterangan: '' });
    const [parentOptions, setParentOptions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({ idJenisPermohonan: null, parentId: null, jenisPermohonan: '', keterangan: '' });

    useEffect(() => {
        fetchJenisPermohonan();
        fetchParentOptions();
    }, []);

    const fetchJenisPermohonan = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-permohonan');
            setJenisPermohonan(response.data); // Langsung set response.data
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchParentOptions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-permohonan'); // Asumsi endpoint sama atau sesuaikan
            setParentOptions(response.data); // Langsung set response.data
        } catch (err) {
            console.error('Gagal memuat opsi parent:', err.message);
        }
    };

    const getParentName = (parentId) => {
        const parent = parentOptions.find(option => option.idJenisPermohonan === parentId);
        return parent ? parent.jenisPermohonan : '-';
    };

    const formatDate = (dateString) => {
        if (dateString) {
            return format(new Date(dateString), 'dd MMMM yyyy HH:mm:ss', { locale: id });
        }
        return '-';
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setNewJenisPermohonan({ parentId: null, jenisPermohonan: '', keterangan: '' });
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isAdding) {
            setNewJenisPermohonan(prevState => ({ ...prevState, [name]: value }));
        } else if (isEditing) {
            setEditingItem(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/jenis-permohonan', newJenisPermohonan);
            console.log('Data berhasil ditambahkan:', response.data);
            fetchJenisPermohonan();
            setIsAdding(false);
            setNewJenisPermohonan({ parentId: null, jenisPermohonan: '', keterangan: '' });
        } catch (error) {
            console.error('Gagal menambahkan data:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditClick = (item) => {
        setIsEditing(true);
        setEditingItem({ ...item, parentId: item.parentId ? item.parentId : null });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/jenis-permohonan/${editingItem.idJenisPermohonan}`, editingItem);
            console.log('Data berhasil diperbarui:', response.data);
            fetchJenisPermohonan();
            setIsEditing(false);
            setEditingItem({ idJenisPermohonan: null, parentId: null, jenisPermohonan: '', keterangan: '' });
        } catch (error) {
            console.error('Gagal memperbarui data:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus jenis permohonan ini?')) {
            deleteJenisPermohonan(id);
        }
    };

    const deleteJenisPermohonan = async (id) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/jenis-permohonan/${id}`);
            console.log('Data berhasil dihapus:', response.data);
            fetchJenisPermohonan();
        } catch (error) {
            console.error('Gagal menghapus data:', error.response ? error.response.data : error.message);
        }
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="jenis-permohonan-container">
            <h2>Manajemen Jenis Permohonan</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Jenis Permohonan</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Jenis Permohonan Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="parentId">Parent</label>
                            <select
                                id="parentId"
                                name="parentId"
                                value={newJenisPermohonan.parentId || ''}
                                onChange={handleInputChange}
                            >
                                <option value={null}>- Pilih Parent -</option>
                                {parentOptions.map(option => (
                                    <option key={option.idJenisPermohonan} value={option.idJenisPermohonan}>
                                        {option.jenisPermohonan}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jenisPermohonan">Jenis Permohonan</label>
                            <input
                                type="text"
                                id="jenisPermohonan"
                                name="jenisPermohonan"
                                value={newJenisPermohonan.jenisPermohonan}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={newJenisPermohonan.keterangan}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="save-button">Simpan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelAdd}>Batal</button>
                    </form>
                </div>
            )}

            {isEditing && (
                <div className="edit-form">
                    <h3>Edit Jenis Permohonan</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="parentId">Parent</label>
                            <select
                                id="parentId"
                                name="parentId"
                                value={editingItem.parentId || ''}
                                onChange={handleInputChange}
                            >
                                <option value={null}>- Pilih Parent -</option>
                                {parentOptions.map(option => (
                                    <option key={option.idJenisPermohonan} value={option.idJenisPermohonan}>
                                        {option.jenisPermohonan}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="jenisPermohonan">Jenis Permohonan</label>
                            <input
                                type="text"
                                id="jenisPermohonan"
                                name="jenisPermohonan"
                                value={editingItem.jenisPermohonan}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea
                                id="keterangan"
                                name="keterangan"
                                value={editingItem.keterangan}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="save-button">Simpan Perubahan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>Batal</button>
                    </form>
                </div>
            )}

            <table className="jenis-permohonan-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Parent</th>
                        <th>Jenis Permohonan</th>
                        <th>Keterangan</th>
                        <th>Dibuat Pada</th>
                        <th>Diubah Pada</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {jenisPermohonan.map(item => (
                        <tr key={item.idJenisPermohonan}>
                            <td>{item.idJenisPermohonan}</td>
                            <td>{getParentName(item.parentId)}</td>
                            <td>{item.jenisPermohonan}</td>
                            <td>{item.keterangan}</td>
                            <td>{formatDate(item.created_at)}</td>
                            <td>{formatDate(item.updated_at)}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(item)}>
                                    <PencilSquare /> Edit
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(item.idJenisPermohonan)}>
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

export default JenisPermohonan;