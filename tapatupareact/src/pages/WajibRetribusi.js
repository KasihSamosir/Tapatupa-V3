import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/WajibRetribusi.css';

const API_BASE_URL = 'http://localhost:8000/api';

const WajibRetribusi = () => {
    const [wajibRetribusiList, setWajibRetribusiList] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedWajibRetribusi, setSelectedWajibRetribusi] = useState(null);
    const [formData, setFormData] = useState({
        NIK: '',
        namaWajibRetribusi: '',
        pekerjaan: '',
        alamat: '',
        nomorPonsel: '',
        nomorWhatsapp: '',
        email: '',
        fileFoto: null,
    });
    const [formErrors, setFormErrors] = useState({});

    const fetchWajibRetribusi = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wajib-retribusi`);
            setWajibRetribusiList(response.data.data);
        } catch (error) {
            console.error('Error fetching wajib retribusi:', error);
        }
    };

    useEffect(() => {
        fetchWajibRetribusi();
    }, []);

    const handleAddClick = () => {
        setIsAdding(true);
        setFormData({
            NIK: '',
            namaWajibRetribusi: '',
            pekerjaan: '',
            alamat: '',
            nomorPonsel: '',
            nomorWhatsapp: '',
            email: '',
            fileFoto: null,
        });
        setFormErrors({});
    };

    const handleEditClick = (wajibRetribusi) => {
        setIsEditing(true);
        setSelectedWajibRetribusi(wajibRetribusi);
        setFormData({
            NIK: wajibRetribusi.NIK || '',
            namaWajibRetribusi: wajibRetribusi.namaWajibRetribusi || '',
            pekerjaan: wajibRetribusi.pekerjaan || '',
            alamat: wajibRetribusi.alamat || '',
            nomorPonsel: wajibRetribusi.nomorPonsel || '',
            nomorWhatsapp: wajibRetribusi.nomorWhatsapp || '',
            email: wajibRetribusi.email || '',
            // fileFoto untuk edit perlu penanganan khusus, mungkin tidak langsung diubah di form
        });
        setFormErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, fileFoto: e.target.files[0] });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/wajib-retribusi`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Wajib retribusi added:', response.data);
            fetchWajibRetribusi();
            setIsAdding(false);
            setFormData({
                NIK: '',
                namaWajibRetribusi: '',
                pekerjaan: '',
                alamat: '',
                nomorPonsel: '',
                nomorWhatsapp: '',
                email: '',
                fileFoto: null,
            });
        } catch (error) {
            console.error('Error adding wajib retribusi:', error.response?.data?.errors || error);
            setFormErrors(error.response?.data?.errors || {});
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append('_method', 'PUT'); // Untuk mengirim sebagai PUT request

        try {
            const response = await axios.post(`${API_BASE_URL}/wajib-retribusi/${selectedWajibRetribusi.idWajibRetribusi}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Wajib retribusi updated:', response.data);
            fetchWajibRetribusi();
            setIsEditing(false);
            setSelectedWajibRetribusi(null);
            setFormData({
                NIK: '',
                namaWajibRetribusi: '',
                pekerjaan: '',
                alamat: '',
                nomorPonsel: '',
                nomorWhatsapp: '',
                email: '',
                fileFoto: null,
            });
        } catch (error) {
            console.error('Error updating wajib retribusi:', error.response?.data?.errors || error);
            setFormErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await axios.delete(`${API_BASE_URL}/wajib-retribusi/${id}`);
                console.log('Wajib retribusi deleted:', id);
                fetchWajibRetribusi();
            } catch (error) {
                console.error('Error deleting wajib retribusi:', error);
            }
        }
    };

    return (
        <div>
            <h2>Manajemen Wajib Retribusi</h2>

            <button onClick={handleAddClick}>Tambah Wajib Retribusi</button>

            {isAdding && (
                <form onSubmit={handleAddSubmit}>
                    <div>
                        <label>NIK:</label>
                        <input type="text" name="NIK" value={formData.NIK} onChange={handleInputChange} />
                        {formErrors.NIK && <p className="error">{formErrors.NIK[0]}</p>}
                    </div>
                    <div>
                        <label>Nama:</label>
                        <input type="text" name="namaWajibRetribusi" value={formData.namaWajibRetribusi} onChange={handleInputChange} required />
                        {formErrors.namaWajibRetribusi && <p className="error">{formErrors.namaWajibRetribusi[0]}</p>}
                    </div>
                    <div>
                        <label>Pekerjaan:</label>
                        <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} />
                        {formErrors.pekerjaan && <p className="error">{formErrors.pekerjaan[0]}</p>}
                    </div>
                    <div>
                        <label>Alamat:</label>
                        <textarea name="alamat" value={formData.alamat} onChange={handleInputChange} />
                        {formErrors.alamat && <p className="error">{formErrors.alamat[0]}</p>}
                    </div>
                    <div>
                        <label>Nomor Ponsel:</label>
                        <input type="text" name="nomorPonsel" value={formData.nomorPonsel} onChange={handleInputChange} />
                        {formErrors.nomorPonsel && <p className="error">{formErrors.nomorPonsel[0]}</p>}
                    </div>
                    <div>
                        <label>Nomor WhatsApp:</label>
                        <input type="text" name="nomorWhatsapp" value={formData.nomorWhatsapp} onChange={handleInputChange} />
                        {formErrors.nomorWhatsapp && <p className="error">{formErrors.nomorWhatsapp[0]}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        {formErrors.email && <p className="error">{formErrors.email[0]}</p>}
                    </div>
                    <div>
                        <label>File Foto:</label>
                        <input type="file" name="fileFoto" onChange={handleFileChange} />
                        {formErrors.fileFoto && <p className="error">{formErrors.fileFoto[0]}</p>}
                    </div>
                    <button type="submit">Simpan</button>
                    <button onClick={() => setIsAdding(false)}>Batal</button>
                </form>
            )}

            {isEditing && selectedWajibRetribusi && (
                <form onSubmit={handleEditSubmit}>
                    <div>
                        <label>NIK:</label>
                        <input type="text" name="NIK" value={formData.NIK} onChange={handleInputChange} />
                        {formErrors.NIK && <p className="error">{formErrors.NIK[0]}</p>}
                    </div>
                    <div>
                        <label>Nama:</label>
                        <input type="text" name="namaWajibRetribusi" value={formData.namaWajibRetribusi} onChange={handleInputChange} required />
                        {formErrors.namaWajibRetribusi && <p className="error">{formErrors.namaWajibRetribusi[0]}</p>}
                    </div>
                    <div>
                        <label>Pekerjaan:</label>
                        <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange} />
                        {formErrors.pekerjaan && <p className="error">{formErrors.pekerjaan[0]}</p>}
                    </div>
                    <div>
                        <label>Alamat:</label>
                        <textarea name="alamat" value={formData.alamat} onChange={handleInputChange} />
                        {formErrors.alamat && <p className="error">{formErrors.alamat[0]}</p>}
                    </div>
                    <div>
                        <label>Nomor Ponsel:</label>
                        <input type="text" name="nomorPonsel" value={formData.nomorPonsel} onChange={handleInputChange} />
                        {formErrors.nomorPonsel && <p className="error">{formErrors.nomorPonsel[0]}</p>}
                    </div>
                    <div>
                        <label>Nomor WhatsApp:</label>
                        <input type="text" name="nomorWhatsapp" value={formData.nomorWhatsapp} onChange={handleInputChange} />
                        {formErrors.nomorWhatsapp && <p className="error">{formErrors.nomorWhatsapp[0]}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        {formErrors.email && <p className="error">{formErrors.email[0]}</p>}
                    </div>
                    <div>
                        <label>File Foto:</label>
                        <input type="file" name="fileFoto" onChange={handleFileChange} />
                        {formErrors.fileFoto && <p className="error">{formErrors.fileFoto[0]}</p>}
                        {selectedWajibRetribusi.fileFoto && (
                            <img
                                src={`http://127.0.0.1:8000/${selectedWajibRetribusi.fileFoto}`}
                                alt={selectedWajibRetribusi.namaWajibRetribusi}
                                style={{ maxWidth: '100px', marginTop: '10px' }}
                            />
                        )}
                        <p>Biarkan kosong jika tidak ingin mengubah foto.</p>
                    </div>
                    <button type="submit">Simpan Perubahan</button>
                    <button onClick={() => setIsEditing(false)}>Batal</button>
                </form>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Pekerjaan</th>
                        <th>Alamat</th>
                        <th>Nomor Ponsel</th>
                        <th>Nomor WhatsApp</th>
                        <th>Email</th>
                        <th>Foto</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {wajibRetribusiList.map((wajibRetribusi) => (
                        <tr key={wajibRetribusi.idWajibRetribusi}>
                            <td>{wajibRetribusi.idWajibRetribusi}</td>
                            <td>{wajibRetribusi.NIK}</td>
                            <td>{wajibRetribusi.namaWajibRetribusi}</td>
                            <td>{wajibRetribusi.pekerjaan}</td>
                            <td>{wajibRetribusi.alamat}</td>
                            <td>{wajibRetribusi.nomorPonsel}</td>
                            <td>{wajibRetribusi.nomorWhatsapp}</td>
                            <td>{wajibRetribusi.email}</td>
                            <td>
                                {wajibRetribusi.fileFoto && (
                                    <img
                                        src={`http://127.0.0.1:8000/${wajibRetribusi.fileFoto}`}
                                        alt={wajibRetribusi.namaWajibRetribusi}
                                        style={{ maxWidth: '50px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(wajibRetribusi)}>Edit</button>
                                <button onClick={() => handleDeleteClick(wajibRetribusi.idWajibRetribusi)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WajibRetribusi;