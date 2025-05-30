import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

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
        return <div className="text-center mt-3">Loading data jenis objek retribusi...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-3" role="alert">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Manajemen Jenis Objek Retribusi</h2>

            <button className="btn btn-primary mb-3" onClick={handleAddClick}>
                Tambah Jenis Objek Retribusi
            </button>

            {isAdding && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Tambah Jenis Objek Retribusi Baru</h5>
                        <form onSubmit={handleAddSubmit}>
                            <div className="mb-3">
                                <label htmlFor="jenisObjekRetribusi" className="form-label">Jenis Objek Retribusi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="jenisObjekRetribusi"
                                    name="jenisObjekRetribusi"
                                    value={newJenisObjekRetribusi.jenisObjekRetribusi}
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
                                    value={newJenisObjekRetribusi.keterangan}
                                    onChange={handleAddInputChange}
                                    rows={3}
                                />
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
                        <h5 className="card-title">Edit Jenis Objek Retribusi</h5>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-3">
                                <label htmlFor="editJenisObjekRetribusi" className="form-label">Jenis Objek Retribusi</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="editJenisObjekRetribusi"
                                    name="jenisObjekRetribusi"
                                    value={editingItem.jenisObjekRetribusi}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="editKeterangan" className="form-label">Keterangan</label>
                                <textarea
                                    className="form-control"
                                    id="editKeterangan"
                                    name="keterangan"
                                    value={editingItem.keterangan}
                                    onChange={handleEditInputChange}
                                    rows={3}
                                />
                            </div>
                            <button type="submit" className="btn btn-success me-2">Simpan Perubahan</button>
                            <button type="button" className="btn btn-danger" onClick={handleCancelEdit}>Batal</button>
                        </form>
                    </div>
                </div>
            )}

            <table className="table table-striped table-bordered">
                <thead className="table-light">
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
                                <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => handleEditClick(item)}
                                    title="Edit"
                                >
                                    <PencilSquare />
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleDeleteClick(item.idJenisObjekRetribusi)}
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

export default JenisObjekRetribusi;
