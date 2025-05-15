import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import '../CSS/ObjekRetribusi.css';

const ObjekRetribusi = () => {
    const [objekList, setObjekList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newObjekRetribusi, setNewObjekRetribusi] = useState({
        idJenisLokasiObjekRetribusi: '',
        idJenisObjekRetribusi: '',
        kodeObjekRetribusi: '',
        noBangunan: '',
        jumlahLantai: '',
        objekRetribusi: '',
        panjangTanah: '',
        lebarTanah: '',
        luasTanah: '',
        panjangBangunan: '',
        lebarBangunan: '',
        luasBangunan: '',
        alamat: '',
        latitute: '',
        longitudee: '',
        keterangan: '',
        gambarDenahTanah: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState({
        idObjekRetribusi: null,
        idJenisLokasiObjekRetribusi: '',
        idJenisObjekRetribusi: '',
        kodeObjekRetribusi: '',
        noBangunan: '',
        jumlahLantai: '',
        objekRetribusi: '',
        panjangTanah: '',
        lebarTanah: '',
        luasTanah: '',
        panjangBangunan: '',
        lebarBangunan: '',
        luasBangunan: '',
        alamat: '',
        latitute: '',
        longitudee: '',
        keterangan: '',
        gambarDenahTanah: ''
    });
    const [jenisObjekList, setJenisObjekList] = useState([]);
    const [lokasiObjekList, setLokasiObjekList] = useState([]);

    useEffect(() => {
        fetchObjekRetribusi();
        fetchJenisObjekRetribusiOptions();
        fetchLokasiObjekRetribusiOptions();
    }, []);

    const fetchObjekRetribusi = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/objek-retribusi');
            console.log("Data Objek Retribusi dari API:", response.data.data); // Tambahkan ini untuk debugging
            setObjekList(response.data.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchJenisObjekRetribusiOptions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/jenis-objek-retribusi');
            setJenisObjekList(response.data.data);
        } catch (err) {
            console.error('Error fetching jenis objek retribusi:', err);
        }
    };

    const fetchLokasiObjekRetribusiOptions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/lokasi-objek-retribusi');
            setLokasiObjekList(response.data.data);
        } catch (err) {
            console.error('Error fetching lokasi objek retribusi:', err);
        }
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setNewObjekRetribusi({
            idJenisLokasiObjekRetribusi: '',
            idJenisObjekRetribusi: '',
            kodeObjekRetribusi: '',
            noBangunan: '',
            jumlahLantai: '',
            objekRetribusi: '',
            panjangTanah: '',
            lebarTanah: '',
            luasTanah: '',
            panjangBangunan: '',
            lebarBangunan: '',
            luasBangunan: '',
            alamat: '',
            latitute: '',
            longitudee: '',
            keterangan: '',
            gambarDenahTanah: ''
        });
    };

    const handleCancelAdd = () => {
        setIsAdding(false);
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewObjekRetribusi(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddFileChange = (e) => {
        setNewObjekRetribusi(prevState => ({ ...prevState, gambarDenahTanah: e.target.files[0] }));
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('idJenisLokasiObjekRetribusi', newObjekRetribusi.idJenisLokasiObjekRetribusi);
        formData.append('idJenisObjekRetribusi', newObjekRetribusi.idJenisObjekRetribusi);
        formData.append('kodeObjekRetribusi', newObjekRetribusi.kodeObjekRetribusi);
        formData.append('noBangunan', newObjekRetribusi.noBangunan);
        formData.append('jumlahLantai', newObjekRetribusi.jumlahLantai);
        formData.append('objekRetribusi', newObjekRetribusi.objekRetribusi);
        formData.append('panjangTanah', newObjekRetribusi.panjangTanah);
        formData.append('lebarTanah', newObjekRetribusi.lebarTanah);
        formData.append('luasTanah', newObjekRetribusi.luasTanah);
        formData.append('panjangBangunan', newObjekRetribusi.panjangBangunan);
        formData.append('lebarBangunan', newObjekRetribusi.lebarBangunan);
        formData.append('luasBangunan', newObjekRetribusi.luasBangunan);
        formData.append('alamat', newObjekRetribusi.alamat);
        formData.append('latitute', newObjekRetribusi.latitute);
        formData.append('longitudee', newObjekRetribusi.longitudee);
        formData.append('keterangan', newObjekRetribusi.keterangan);
        if (newObjekRetribusi.gambarDenahTanah) {
            formData.append('gambarDenahTanah', newObjekRetribusi.gambarDenahTanah);
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/objek-retribusi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchObjekRetribusi();
            setIsAdding(false);
            setNewObjekRetribusi({
                idJenisLokasiObjekRetribusi: '',
                idJenisObjekRetribusi: '',
                kodeObjekRetribusi: '',
                noBangunan: '',
                jumlahLantai: '',
                objekRetribusi: '',
                panjangTanah: '',
                lebarTanah: '',
                luasTanah: '',
                panjangBangunan: '',
                lebarBangunan: '',
                luasBangunan: '',
                alamat: '',
                latitute: '',
                longitudee: '',
                keterangan: '',
                gambarDenahTanah: '',
            });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleEditClick = (item) => {
        setIsEditing(true);
        setEditingItem({ ...item, gambarDenahTanah: null }); // Reset gambar saat edit
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingItem(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditFileChange = (e) => {
        setEditingItem(prevState => ({ ...prevState, gambarDenahTanah: e.target.files[0] }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('idJenisLokasiObjekRetribusi', editingItem.idJenisLokasiObjekRetribusi);
        formData.append('idJenisObjekRetribusi', editingItem.idJenisObjekRetribusi);
        formData.append('kodeObjekRetribusi', editingItem.kodeObjekRetribusi);
        formData.append('noBangunan', editingItem.noBangunan);
        formData.append('jumlahLantai', editingItem.jumlahLantai);
        formData.append('objekRetribusi', editingItem.objekRetribusi);
        formData.append('panjangTanah', editingItem.panjangTanah);
        formData.append('lebarTanah', editingItem.lebarTanah);
        formData.append('luasTanah', editingItem.luasTanah);
        formData.append('panjangBangunan', editingItem.panjangBangunan);
        formData.append('lebarBangunan', editingItem.lebarBangunan);
        formData.append('luasBangunan', editingItem.luasBangunan);
        formData.append('alamat', editingItem.alamat);
        formData.append('latitute', editingItem.latitute);
        formData.append('longitudee', editingItem.longitudee);
        formData.append('keterangan', editingItem.keterangan);
        if (editingItem.gambarDenahTanah) {
            formData.append('gambarDenahTanah', editingItem.gambarDenahTanah);
        }

        try {
            await axios.put(`http://127.0.0.1:8000/api/objek-retribusi/${editingItem.idObjekRetribusi}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchObjekRetribusi();
            setIsEditing(false);
            setEditingItem({
                idObjekRetribusi: null,
                idJenisLokasiObjekRetribusi: '',
                idJenisObjekRetribusi: '',
                kodeObjekRetribusi: '',
                noBangunan: '',
                jumlahLantai: '',
                objekRetribusi: '',
                panjangTanah: '',
                lebarTanah: '',
                luasTanah: '',
                panjangBangunan: '',
                lebarBangunan: '',
                luasBangunan: '',
                alamat: '',
                latitute: '',
                longitudee: '',
                keterangan: '',
                gambarDenahTanah: '',
            });
        } catch (err) {
            setError(err.response?.data?.errors || { message: err.message });
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus objek retribusi ini?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/objek-retribusi/${id}`);
                fetchObjekRetribusi();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <div>Loading data objek retribusi...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="objek-retribusi-container">
            <h2>Manajemen Objek Retribusi</h2>
            <button className="add-button" onClick={handleAddClick}>Tambah Objek Retribusi</button>

            {isAdding && (
                <div className="add-form">
                    <h3>Tambah Objek Retribusi Baru</h3>
                    <form onSubmit={handleAddSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisLokasiObjekRetribusi">Lokasi Objek Retribusi</label>
                            <select
                                id="idJenisLokasiObjekRetribusi"
                                name="idJenisLokasiObjekRetribusi"
                                value={newObjekRetribusi.idJenisLokasiObjekRetribusi}
                                onChange={handleAddInputChange}
                                required
                            >
                                <option value="">Pilih Lokasi</option>
                                {lokasiObjekList.map(lokasi => (
                                    <option key={lokasi.idLokasiObjekRetribusi} value={lokasi.idLokasiObjekRetribusi}>
                                        {lokasi.lokasiObjekRetribusi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idJenisObjekRetribusi">Jenis Objek Retribusi</label>
                            <select
                                id="idJenisObjekRetribusi"
                                name="idJenisObjekRetribusi"
                                value={newObjekRetribusi.idJenisObjekRetribusi}
                                onChange={handleAddInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Objek</option>
                                {jenisObjekList.map(jenis => (
                                    <option key={jenis.idJenisObjekRetribusi} value={jenis.idJenisObjekRetribusi}>
                                        {jenis.jenisObjekRetribusi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="kodeObjekRetribusi">Kode Objek Retribusi</label>
                            <input type="text" id="kodeObjekRetribusi" name="kodeObjekRetribusi" value={newObjekRetribusi.kodeObjekRetribusi} onChange={handleAddInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="noBangunan">No. Bangunan</label>
                            <input type="text" id="noBangunan" name="noBangunan" value={newObjekRetribusi.noBangunan} onChange={handleAddInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jumlahLantai">Jumlah Lantai</label>
                            <input type="number" id="jumlahLantai" name="jumlahLantai" value={newObjekRetribusi.jumlahLantai} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="objekRetribusi">Nama Umum</label>
                            <input type="text" id="objekRetribusi" name="objekRetribusi" value={newObjekRetribusi.objekRetribusi} onChange={handleAddInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="panjangTanah">Panjang Tanah (m)</label>
                            <input type="number" step="0.01" id="panjangTanah" name="panjangTanah" value={newObjekRetribusi.panjangTanah} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lebarTanah">Lebar Tanah (m)</label>
                            <input type="number" step="0.01" id="lebarTanah" name="lebarTanah" value={newObjekRetribusi.lebarTanah} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="luasTanah">Luas Tanah (m²)</label>
                            <input type="number" step="0.01" id="luasTanah" name="luasTanah" value={newObjekRetribusi.luasTanah} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="panjangBangunan">Panjang Bangunan (m)</label>
                            <input type="number" step="0.01" id="panjangBangunan" name="panjangBangunan" value={newObjekRetribusi.panjangBangunan} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lebarBangunan">Lebar Bangunan (m)</label>
                            <input type="number" step="0.01" id="lebarBangunan" name="lebarBangunan" value={newObjekRetribusi.lebarBangunan} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="luasBangunan">Luas Bangunan (m²)</label>
                            <input type="number" step="0.01" id="luasBangunan" name="luasBangunan" value={newObjekRetribusi.luasBangunan} onChange={handleAddInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="alamat">Alamat</label>
                            <textarea id="alamat" name="alamat" value={newObjekRetribusi.alamat} onChange={handleAddInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitute">Latitude</label>
                            <input type="number" step="0.0000001" id="latitute" name="latitute" value={newObjekRetribusi.latitute} onChange={handleAddInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitudee">Longitude</label>
                            <input type="number" step="0.0000001" id="longitudee" name="longitudee" value={newObjekRetribusi.longitudee} onChange={handleAddInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea id="keterangan" name="keterangan" value={newObjekRetribusi.keterangan} onChange={handleAddInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gambarDenahTanah">Gambar Denah Tanah</label>
                            <input type="file" id="gambarDenahTanah" name="gambarDenahTanah" onChange={handleAddFileChange} />
                        </div>
                        <button type="submit" className="save-button">Simpan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelAdd}>Batal</button>
                    </form>
                </div>
            )}

            {isEditing && (
                <div className="edit-form">
                    <h3>Edit Objek Retribusi</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="idJenisLokasiObjekRetribusi">Lokasi Objek Retribusi</label>
                            <select
                                id="idJenisLokasiObjekRetribusi"
                                name="idJenisLokasiObjekRetribusi"
                                value={editingItem.idJenisLokasiObjekRetribusi}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Pilih Lokasi</option>
                                {lokasiObjekList.map(lokasi => (
                                    <option key={lokasi.idLokasiObjekRetribusi} value={lokasi.idLokasiObjekRetribusi}>
                                        {lokasi.lokasiObjekRetribusi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idJenisObjekRetribusi">Jenis Objek Retribusi</label>
                            <select
                                id="idJenisObjekRetribusi"
                                name="idJenisObjekRetribusi"
                                value={editingItem.idJenisObjekRetribusi}
                                onChange={handleEditInputChange}
                                required
                            >
                                <option value="">Pilih Jenis Objek</option>
                                {jenisObjekList.map(jenis => (
                                    <option key={jenis.idJenisObjekRetribusi} value={jenis.idJenisObjekRetribusi}>
                                        {jenis.jenisObjekRetribusi}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="kodeObjekRetribusi">Kode Objek Retribusi</label>
                            <input type="text" id="kodeObjekRetribusi" name="kodeObjekRetribusi" value={editingItem.kodeObjekRetribusi} onChange={handleEditInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="noBangunan">No. Bangunan</label>
                            <input type="text" id="noBangunan" name="noBangunan" value={editingItem.noBangunan} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jumlahLantai">Jumlah Lantai</label>
                            <input type="number" id="jumlahLantai" name="jumlahLantai" value={editingItem.jumlahLantai} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="objekRetribusi">Nama Umum</label>
                            <input type="text" id="objekRetribusi" name="objekRetribusi" value={editingItem.objekRetribusi} onChange={handleEditInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="panjangTanah">Panjang Tanah (m)</label>
                            <input type="number" step="0.01" id="panjangTanah" name="panjangTanah" value={editingItem.panjangTanah} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lebarTanah">Lebar Tanah (m)</label>
                            <input type="number" step="0.01" id="lebarTanah" name="lebarTanah" value={editingItem.lebarTanah} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="luasTanah">Luas Tanah (m²)</label>
                            <input type="number" step="0.01" id="luasTanah" name="luasTanah" value={editingItem.luasTanah} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="panjangBangunan">Panjang Bangunan (m)</label>
                            <input type="number" step="0.01" id="panjangBangunan" name="panjangBangunan" value={editingItem.panjangBangunan} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lebarBangunan">Lebar Bangunan (m)</label>
                            <input type="number" step="0.01" id="lebarBangunan" name="lebarBangunan" value={editingItem.lebarBangunan} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="luasBangunan">Luas Bangunan (m²)</label>
                            <input type="number" step="0.01" id="luasBangunan" name="luasBangunan" value={editingItem.luasBangunan} onChange={handleEditInputChange} min="0" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="alamat">Alamat</label>
                            <textarea id="alamat" name="alamat" value={editingItem.alamat} onChange={handleEditInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitute">Latitude</label>
                            <input type="number" step="0.0000001" id="latitute" name="latitute" value={editingItem.latitute} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitudee">Longitude</label>
                            <input type="number" step="0.0000001" id="longitudee" name="longitudee" value={editingItem.longitudee} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keterangan">Keterangan</label>
                            <textarea id="keterangan" name="keterangan" value={editingItem.keterangan} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gambarDenahTanah">Gambar Denah Tanah</label>
                            <input type="file" id="gambarDenahTanah" name="gambarDenahTanah" onChange={handleEditFileChange} />
                        </div>
                        <button type="submit" className="save-button">Simpan Perubahan</button>
                        <button type="button" className="cancel-button" onClick={handleCancelEdit}>Batal</button>
                    </form>
                </div>
            )}

            <table className="objek-retribusi-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Lokasi</th>
                        <th>Jenis Objek</th>
                        <th>Kode Objek</th>
                        <th>No. Bangunan</th>
                        <th>Jumlah Lantai</th>
                        <th>Nama Umum</th>
                        <th>Luas Tanah</th>
                        <th>Luas Bangunan</th>
                        <th>Alamat</th>
                        <th>Keterangan</th>
                        <th>Gambar</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {objekList.map(objek => (
                        <tr key={objek.idObjekRetribusi}>
                            <td>{objek.idObjekRetribusi}</td>
                            <td>{objek.lokasi_objek_retribusi?.lokasiObjekRetribusi}</td>
                            <td>{objek.jenis_objek_retribusi?.jenisObjekRetribusi}</td>
                            <td>{objek.kodeObjekRetribusi}</td>
                            <td>{objek.noBangunan}</td>
                            <td>{objek.jumlahLantai}</td>
                            <td>{objek.objekRetribusi}</td>
                            <td>{objek.luasTanah} m²</td>
                            <td>{objek.luasBangunan} m²</td>
                            <td>{objek.alamat}</td>
                            <td>{objek.keterangan}</td>
                            <td>
                                {objek.gambarDenahTanah && (
                                    <img
                                        src={`http://127.0.0.1:8000/${objek.gambarDenahTanah}`}
                                        alt={objek.objekRetribusi}
                                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditClick(objek)}>
                                    <PencilSquare />
                                </button>
                                <button className="delete-button" onClick={() => handleDeleteClick(objek.idObjekRetribusi)}>
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

export default ObjekRetribusi;