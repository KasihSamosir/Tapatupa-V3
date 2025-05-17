import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        fetchWajibRetribusi();
    }, []);

    const fetchWajibRetribusi = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wajib-retribusi`);
            setWajibRetribusiList(response.data.data);
        } catch (error) {
            console.error('Error fetching wajib retribusi:', error);
        }
    };

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
            fileFoto: null,
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
            await axios.post(`${API_BASE_URL}/wajib-retribusi`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
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
            setFormErrors(error.response?.data?.errors || {});
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        formDataToSend.append('_method', 'PUT');

        try {
            await axios.post(`${API_BASE_URL}/wajib-retribusi/${selectedWajibRetribusi.idWajibRetribusi}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
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
            setFormErrors(error.response?.data?.errors || {});
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            try {
                await axios.delete(`${API_BASE_URL}/wajib-retribusi/${id}`);
                fetchWajibRetribusi();
            } catch (error) {
                console.error('Error deleting wajib retribusi:', error);
            }
        }
    };

    const renderError = (field) => {
        if (formErrors[field]) {
            return <div className="text-danger small mt-1">{formErrors[field][0]}</div>;
        }
        return null;
    };

    return (
        <div className="container my-4">
            <h2 className="mb-4">Manajemen Wajib Retribusi</h2>

            <button className="btn btn-primary mb-3" onClick={handleAddClick}>Tambah Wajib Retribusi</button>

            {(isAdding || isEditing) && (
                <form onSubmit={isAdding ? handleAddSubmit : handleEditSubmit} className="border p-4 rounded bg-light mb-4">
                    <div className="mb-3">
                        <label htmlFor="NIK" className="form-label">NIK:</label>
                        <input
                            type="text"
                            id="NIK"
                            name="NIK"
                            className={`form-control ${formErrors.NIK ? 'is-invalid' : ''}`}
                            value={formData.NIK}
                            onChange={handleInputChange}
                        />
                        {renderError('NIK')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="namaWajibRetribusi" className="form-label">Nama:</label>
                        <input
                            type="text"
                            id="namaWajibRetribusi"
                            name="namaWajibRetribusi"
                            className={`form-control ${formErrors.namaWajibRetribusi ? 'is-invalid' : ''}`}
                            value={formData.namaWajibRetribusi}
                            onChange={handleInputChange}
                            required
                        />
                        {renderError('namaWajibRetribusi')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pekerjaan" className="form-label">Pekerjaan:</label>
                        <input
                            type="text"
                            id="pekerjaan"
                            name="pekerjaan"
                            className={`form-control ${formErrors.pekerjaan ? 'is-invalid' : ''}`}
                            value={formData.pekerjaan}
                            onChange={handleInputChange}
                        />
                        {renderError('pekerjaan')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="alamat" className="form-label">Alamat:</label>
                        <textarea
                            id="alamat"
                            name="alamat"
                            className={`form-control ${formErrors.alamat ? 'is-invalid' : ''}`}
                            value={formData.alamat}
                            onChange={handleInputChange}
                            rows={3}
                        />
                        {renderError('alamat')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nomorPonsel" className="form-label">Nomor Ponsel:</label>
                        <input
                            type="text"
                            id="nomorPonsel"
                            name="nomorPonsel"
                            className={`form-control ${formErrors.nomorPonsel ? 'is-invalid' : ''}`}
                            value={formData.nomorPonsel}
                            onChange={handleInputChange}
                        />
                        {renderError('nomorPonsel')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nomorWhatsapp" className="form-label">Nomor WhatsApp:</label>
                        <input
                            type="text"
                            id="nomorWhatsapp"
                            name="nomorWhatsapp"
                            className={`form-control ${formErrors.nomorWhatsapp ? 'is-invalid' : ''}`}
                            value={formData.nomorWhatsapp}
                            onChange={handleInputChange}
                        />
                        {renderError('nomorWhatsapp')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {renderError('email')}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fileFoto" className="form-label">File Foto:</label>
                        <input
                            type="file"
                            id="fileFoto"
                            name="fileFoto"
                            className={`form-control ${formErrors.fileFoto ? 'is-invalid' : ''}`}
                            onChange={handleFileChange}
                        />
                        {renderError('fileFoto')}
                        {isEditing && selectedWajibRetribusi.fileFoto && (
                            <img
                                src={`http://127.0.0.1:8000/${selectedWajibRetribusi.fileFoto}`}
                                alt={selectedWajibRetribusi.namaWajibRetribusi}
                                className="mt-2"
                                style={{ maxWidth: '150px' }}
                            />
                        )}
                        {isEditing && <small className="form-text text-muted">Biarkan kosong jika tidak ingin mengubah foto.</small>}
                    </div>

                    <button type="submit" className="btn btn-success me-2">{isAdding ? 'Simpan' : 'Simpan Perubahan'}</button>
                    <button type="button" className="btn btn-secondary" onClick={() => { isAdding ? setIsAdding(false) : setIsEditing(false); }}>
                        Batal
                    </button>
                </form>
            )}

            <table className="table table-striped table-bordered">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>NIK</th>
                        <th>Nama</th>
                        <th>Pekerjaan</th>
                        <th>Alamat</th>
                        <th>Nomor</th>
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
<img src={`http://127.0.0.1:8000/${wajibRetribusi.fileFoto}`} 
alt={wajibRetribusi.namaWajibRetribusi}
style={{ maxWidth: '80px' }} />
)}
</td>
<td>
<button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(wajibRetribusi)}> Edit</button>
<button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(wajibRetribusi.idWajibRetribusi)}> Hapus </button>
</td>
</tr>
))} 
                        </tbody>
                        </table>
</div>
);
};

export default WajibRetribusi;