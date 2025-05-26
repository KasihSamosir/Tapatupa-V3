import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8000/api'; 

const PermohonanSewa = () => {
    const [permohonanSewaList, setPermohonanSewaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPermohonanSewa, setSelectedPermohonanSewa] = useState(null);
    const [formData, setFormData] = useState({
        idJenisPermohonan: '',
        nomorSuratPermohonan: '',
        tanggalPengajuan: '',
        idWajibRetribusi: '',
        idObjekRetribusi: '',
        idJenisJangkaWaktu: '',
        lamaSewa: '',
        idPeruntukanSewa: '',
        idStatus: '',
        createBy: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [jenisPermohonanOptions, setJenisPermohonanOptions] = useState([]);
    const [wajibRetribusiOptions, setWajibRetribusiOptions] = useState([]);
    const [objekRetribusiOptions, setObjekRetribusiOptions] = useState([]);
    const [jenisJangkaWaktuOptions, setJenisJangkaWaktuOptions] = useState([]);
    const [peruntukanSewaOptions, setPeruntukanSewaOptions] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);

    const fetchPermohonanSewa = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/permohonan-sewa`);
            setPermohonanSewaList(response.data.data || []);
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat memuat data permohonan sewa.');
        } finally {
            setLoading(false);
        }
    };

    const fetchJenisPermohonanOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jenis-permohonan`);
            const data = response.data?.data || response.data || []; 
            setJenisPermohonanOptions(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching jenis permohonan:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan jenis permohonan.` : 'Gagal memuat pilihan jenis permohonan.');
        }
    };

    const fetchWajibRetribusiOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/wajib-retribusi`);
            setWajibRetribusiOptions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching wajib retribusi:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan wajib retribusi.` : 'Gagal memuat pilihan wajib retribusi.');
        }
    };

    const fetchObjekRetribusiOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/objek-retribusi`);
            setObjekRetribusiOptions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching objek retribusi:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan objek retribusi.` : 'Gagal memuat pilihan objek retribusi.');
        }
    };

    const fetchJenisJangkaWaktuOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jenis-jangka-waktu`);
            setJenisJangkaWaktuOptions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching jenis jangka waktu:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan jenis jangka waktu.` : 'Gagal memuat pilihan jenis jangka waktu.');
        }
    };

    const fetchPeruntukanSewaOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/peruntukan-sewa`);
            setPeruntukanSewaOptions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching peruntukan sewa:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan peruntukan sewa.` : 'Gagal memuat pilihan peruntukan sewa.');
        }
    };

    const fetchStatusOptions = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/status-permohonan`);
            setStatusOptions(response.data.data || []);
        } catch (error) {
            console.error("Error fetching status:", error);
            setError(prevError => prevError ? `${prevError}\n Gagal memuat pilihan status.` : 'Gagal memuat pilihan status.');
        }
    };

    useEffect(() => {
        fetchPermohonanSewa();
        fetchJenisPermohonanOptions();
        fetchWajibRetribusiOptions();
        fetchObjekRetribusiOptions();
        fetchJenisJangkaWaktuOptions();
        fetchPeruntukanSewaOptions();
        fetchStatusOptions();
    }, []);

    const resetForm = () => {
        setFormData({
            idJenisPermohonan: '',
            nomorSuratPermohonan: '',
            tanggalPengajuan: '',
            idWajibRetribusi: '',
            idObjekRetribusi: '',
            idJenisJangkaWaktu: '',
            lamaSewa: '',
            idPeruntukanSewa: '',
            idStatus: '',
            createBy: '',
        });
        setFormErrors({});
    };

    const handleAddClick = () => {
        setIsAdding(true);
        resetForm();
        setIsEditing(false);
        setSelectedPermohonanSewa(null);
    };

    const handleEditClick = (permohonan) => {
        setIsEditing(true);
        setSelectedPermohonanSewa(permohonan);
        setFormData({
            idJenisPermohonan: permohonan.idJenisPermohonan,
            nomorSuratPermohonan: permohonan.nomorSuratPermohonan,
            tanggalPengajuan: permohonan.tanggalPengajuan.split('T')[0], 
            idWajibRetribusi: permohonan.idWajibRetribusi,
            idObjekRetribusi: permohonan.idObjekRetribusi,
            idJenisJangkaWaktu: permohonan.idJenisJangkaWaktu,
            lamaSewa: permohonan.lamaSewa,
            idPeruntukanSewa: permohonan.idPeruntukanSewa,
            idStatus: permohonan.idStatus,
            createBy: permohonan.createBy || '', 
        });
        setFormErrors({});
        setIsAdding(false);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus permohonan sewa ini?')) {
            try {
                await axios.delete(`${API_BASE_URL}/permohonan-sewa/${id}`);
                fetchPermohonanSewa();
            } catch (err) {
                setError(err.message || 'Terjadi kesalahan saat menghapus data.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors({});

        try {
            if (isAdding) {
                await axios.post(`${API_BASE_URL}/permohonan-sewa`, formData);
            } else if (isEditing && selectedPermohonanSewa) {
                await axios.put(`${API_BASE_URL}/permohonan-sewa/${selectedPermohonanSewa.idPermohonanSewa}`, formData);
            }
            fetchPermohonanSewa();
            setIsAdding(false);
            setIsEditing(false);
            setSelectedPermohonanSewa(null);
            resetForm();
        } catch (err) {
            setFormErrors(err.response?.data?.errors || { global: err.message || 'Terjadi kesalahan saat menyimpan data.' });
            console.error('Error submitting form:', err.response?.data?.errors || err);
        }
    };

    const handleCancelForm = () => {
        setIsAdding(false);
        setIsEditing(false);
        setSelectedPermohonanSewa(null);
        resetForm();
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4>Error:</h4>
                    <pre>{error}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 p-4 bg-light rounded shadow-sm">
            <h2 className="text-center mb-4 pb-2 border-bottom border-primary border-2">Manajemen Permohonan Sewa</h2>

            {!isAdding && !isEditing && (
                <button onClick={handleAddClick} className="btn btn-primary mb-4">
                    <i className="bi bi-plus-circle me-2"></i>Tambah Permohonan Sewa
                </button>
            )}
            
            {formErrors.global && <div className="alert alert-danger mt-3">{formErrors.global}</div>}


            {(isAdding || isEditing) && (
                <div className="card p-3 mb-4 shadow-sm">
                    <h3 className="mb-3">{isEditing ? 'Edit' : 'Tambah'} Permohonan Sewa</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="idJenisPermohonan" className="form-label fw-bold">Jenis Permohonan</label>
                                <select
                                    id="idJenisPermohonan"
                                    name="idJenisPermohonan"
                                    className={`form-select ${formErrors.idJenisPermohonan ? 'is-invalid' : ''}`}
                                    value={formData.idJenisPermohonan}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Jenis Permohonan --</option>
                                    {Array.isArray(jenisPermohonanOptions) && jenisPermohonanOptions.map((jenis) => (
                                        <option key={jenis.idJenisPermohonan} value={jenis.idJenisPermohonan}>
                                            {jenis.jenisPermohonan}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idJenisPermohonan && <div className="invalid-feedback">{formErrors.idJenisPermohonan[0]}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="nomorSuratPermohonan" className="form-label fw-bold">Nomor Surat Permohonan</label>
                                <input
                                    type="text"
                                    id="nomorSuratPermohonan"
                                    name="nomorSuratPermohonan"
                                    className={`form-control ${formErrors.nomorSuratPermohonan ? 'is-invalid' : ''}`}
                                    value={formData.nomorSuratPermohonan}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.nomorSuratPermohonan && <div className="invalid-feedback">{formErrors.nomorSuratPermohonan[0]}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="tanggalPengajuan" className="form-label fw-bold">Tanggal Pengajuan</label>
                                <input
                                    type="date"
                                    id="tanggalPengajuan"
                                    name="tanggalPengajuan"
                                    className={`form-control ${formErrors.tanggalPengajuan ? 'is-invalid' : ''}`}
                                    value={formData.tanggalPengajuan}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.tanggalPengajuan && <div className="invalid-feedback">{formErrors.tanggalPengajuan[0]}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="idWajibRetribusi" className="form-label fw-bold">Wajib Retribusi</label>
                                <select
                                    id="idWajibRetribusi"
                                    name="idWajibRetribusi"
                                    className={`form-select ${formErrors.idWajibRetribusi ? 'is-invalid' : ''}`}
                                    value={formData.idWajibRetribusi}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Wajib Retribusi --</option>
                                    {Array.isArray(wajibRetribusiOptions) && wajibRetribusiOptions.map((wajib) => (
                                        <option key={wajib.idWajibRetribusi} value={wajib.idWajibRetribusi}>
                                            {wajib.namaWajibRetribusi}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idWajibRetribusi && <div className="invalid-feedback">{formErrors.idWajibRetribusi[0]}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="idObjekRetribusi" className="form-label fw-bold">Objek Retribusi</label>
                                <select
                                    id="idObjekRetribusi"
                                    name="idObjekRetribusi"
                                    className={`form-select ${formErrors.idObjekRetribusi ? 'is-invalid' : ''}`}
                                    value={formData.idObjekRetribusi}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Objek Retribusi --</option>
                                    {Array.isArray(objekRetribusiOptions) && objekRetribusiOptions.map((objek) => (
                                        <option key={objek.idObjekRetribusi} value={objek.idObjekRetribusi}>
                                            {objek.kodeObjekRetribusi} - {objek.namaObjekRetribusi}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idObjekRetribusi && <div className="invalid-feedback">{formErrors.idObjekRetribusi[0]}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="idJenisJangkaWaktu" className="form-label fw-bold">Jenis Jangka Waktu</label>
                                <select
                                    id="idJenisJangkaWaktu"
                                    name="idJenisJangkaWaktu"
                                    className={`form-select ${formErrors.idJenisJangkaWaktu ? 'is-invalid' : ''}`}
                                    value={formData.idJenisJangkaWaktu}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Jenis Jangka Waktu --</option>
                                    {Array.isArray(jenisJangkaWaktuOptions) && jenisJangkaWaktuOptions.map((jangkaWaktu) => (
                                        <option key={jangkaWaktu.idJenisJangkaWaktu} value={jangkaWaktu.idJenisJangkaWaktu}>
                                            {jangkaWaktu.jenisJangkaWaktu}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idJenisJangkaWaktu && <div className="invalid-feedback">{formErrors.idJenisJangkaWaktu[0]}</div>}
                            </div>
                        </div>
                        
                        <div className="row">
                             <div className="col-md-6 mb-3">
                                <label htmlFor="lamaSewa" className="form-label fw-bold">Lama Sewa</label>
                                <input
                                    type="number"
                                    id="lamaSewa"
                                    name="lamaSewa"
                                    className={`form-control ${formErrors.lamaSewa ? 'is-invalid' : ''}`}
                                    value={formData.lamaSewa}
                                    onChange={handleInputChange}
                                    required
                                />
                                {formErrors.lamaSewa && <div className="invalid-feedback">{formErrors.lamaSewa[0]}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="idPeruntukanSewa" className="form-label fw-bold">Peruntukan Sewa</label>
                                <select
                                    id="idPeruntukanSewa"
                                    name="idPeruntukanSewa"
                                    className={`form-select ${formErrors.idPeruntukanSewa ? 'is-invalid' : ''}`}
                                    value={formData.idPeruntukanSewa}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Peruntukan Sewa --</option>
                                    {Array.isArray(peruntukanSewaOptions) && peruntukanSewaOptions.map((peruntukan) => (
                                        <option key={peruntukan.idPeruntukanSewa} value={peruntukan.idPeruntukanSewa}>
                                            {peruntukan.peruntukanSewa}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idPeruntukanSewa && <div className="invalid-feedback">{formErrors.idPeruntukanSewa[0]}</div>}
                            </div>
                        </div>

                       <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="idStatus" className="form-label fw-bold">Status</label>
                                <select
                                    id="idStatus"
                                    name="idStatus"
                                    className={`form-select ${formErrors.idStatus ? 'is-invalid' : ''}`}
                                    value={formData.idStatus}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Pilih Status --</option>
                                    {Array.isArray(statusOptions) && statusOptions.map((status) => (
                                        <option key={status.idStatus} value={status.idStatus}>
                                            {status.namaStatus}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.idStatus && <div className="invalid-feedback">{formErrors.idStatus[0]}</div>}
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="createBy" className="form-label fw-bold">Create By</label>
                                <input
                                    type="text"
                                    id="createBy"
                                    name="createBy"
                                    className={`form-control ${formErrors.createBy ? 'is-invalid' : ''}`}
                                    value={formData.createBy}
                                    onChange={handleInputChange}
                                />
                                {formErrors.createBy && <div className="invalid-feedback">{formErrors.createBy[0]}</div>}
                            </div>
                       </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button type="submit" className="btn btn-primary me-2">
                                <i className={`bi ${isEditing ? 'bi-save' : 'bi-plus-lg'} me-2`}></i>
                                {isEditing ? 'Simpan Perubahan' : 'Simpan'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancelForm}>
                                <i className="bi bi-x-circle me-2"></i>Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="table-responsive rounded shadow-sm mt-4">
                <table className="table table-striped table-hover table-bordered align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Jenis Permohonan</th>
                            <th>Nomor Surat</th>
                            <th>Tgl Pengajuan</th>
                            <th>Wajib Retribusi</th>
                            <th>Objek Retribusi</th>
                            <th>Jns Jk. Waktu</th>
                            <th>Lama Sewa</th>
                            <th>Peruntukan</th>
                            <th>Status</th>
                            <th>Dibuat</th>
                            <th>Diubah</th>
                            <th className="text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permohonanSewaList.length > 0 ? permohonanSewaList.map((permohonan) => (
                            <tr key={permohonan.idPermohonanSewa}>
                                <td>{permohonan.idPermohonanSewa}</td>
                                <td>{permohonan.jenis_permohonan?.jenisPermohonan || permohonan.jenisPermohonan || 'N/A'}</td>
                                <td>{permohonan.nomorSuratPermohonan}</td>
                                <td>{new Date(permohonan.tanggalPengajuan).toLocaleDateString()}</td>
                                <td>{permohonan.wajib_retribusi?.namaWajibRetribusi || permohonan.namaWajibRetribusi || 'N/A'}</td>
                                <td>{permohonan.objek_retribusi?.kodeObjekRetribusi || permohonan.kodeObjekRetribusi || 'N/A'}</td>
                                <td>{permohonan.jenis_jangka_waktu?.jenisJangkaWaktu || permohonan.jenisJangkaWaktu || 'N/A'}</td>
                                <td>{permohonan.lamaSewa} {permohonan.jenis_jangka_waktu?.jenisJangkaWaktu || permohonan.jangkaWaktu || ''}</td>
                                <td>{permohonan.peruntukan_sewa?.peruntukanSewa || permohonan.peruntukanSewa || 'N/A'}</td>
                                <td>
                                    <span className={`badge ${
                                        permohonan.status_permohonan?.namaStatus === 'Disetujui' ? 'bg-success' :
                                        permohonan.status_permohonan?.namaStatus === 'Ditolak' ? 'bg-danger' :
                                        permohonan.status_permohonan?.namaStatus === 'Diproses' ? 'bg-warning text-dark' :
                                        'bg-secondary'
                                    }`}>
                                        {permohonan.status_permohonan?.namaStatus || permohonan.namaStatus || 'N/A'}
                                    </span>
                                </td>
                                <td>{new Date(permohonan.createdAt).toLocaleString()}</td>
                                <td>{new Date(permohonan.updatedAt).toLocaleString()}</td>
                                <td className="text-center">
                                    <button onClick={() => handleEditClick(permohonan)} className="btn btn-sm btn-warning me-1 mb-1" title="Edit">
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button onClick={() => handleDeleteClick(permohonan.idPermohonanSewa)} className="btn btn-sm btn-danger mb-1" title="Hapus">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="13" className="text-center p-3">Tidak ada data permohonan sewa.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PermohonanSewa;