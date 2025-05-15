import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/PermohonanSewa.css'; // Import file CSS jika ada

const API_BASE_URL = 'http://localhost:8000/api'; // Pastikan sesuai dengan URL backend Anda

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
        createBy: '', // Mungkin bisa diisi otomatis di backend
        // ... tambahkan field lain sesuai kebutuhan form
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
            setPermohonanSewaList(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat memuat data permohonan sewa.');
        } finally {
            setLoading(false);
        }
    };

   const fetchJenisPermohonanOptions = async () => {
    try {
        console.log('Fetching Jenis Permohonan...');
        const response = await axios.get(`${API_BASE_URL}/jenis-permohonan`);
        console.log('Response Jenis Permohonan:', response);
        console.log('Response Data Jenis Permohonan:', response.data);
        const data = response.data || []; // Fallback jika response.data null
        setJenisPermohonanOptions(data);
        console.log('Jenis Permohonan Options State:', data); // Log data yang di-set ke state
    } catch (error) {
        console.error("Error fetching jenis permohonan:", error);
        setError(error.message || 'Gagal memuat pilihan jenis permohonan.');
    }
};

    const fetchWajibRetribusiOptions = async () => {
        try {
            console.log('Fetching Wajib Retribusi...'); // Tambahkan ini
            const response = await axios.get(`${API_BASE_URL}/wajib-retribusi`);
            setWajibRetribusiOptions(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
            console.log('Wajib Retribusi Options:', response.data.data); // Tambahkan ini
        } catch (error) {
            console.error("Error fetching wajib retribusi:", error);
            setError(error.message || 'Gagal memuat pilihan wajib retribusi.');
        }
    };

    const fetchObjekRetribusiOptions = async () => {
        try {
            console.log('Fetching Objek Retribusi...'); // Tambahkan ini
            const response = await axios.get(`${API_BASE_URL}/objek-retribusi`);
            setObjekRetribusiOptions(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
            console.log('Objek Retribusi Options:', response.data.data); // Tambahkan ini
        } catch (error) {
            console.error("Error fetching objek retribusi:", error);
            setError(error.message || 'Gagal memuat pilihan objek retribusi.');
        }
    };

    const fetchJenisJangkaWaktuOptions = async () => {
        try {
            console.log('Fetching Jenis Jangka Waktu...'); // Tambahkan ini
            const response = await axios.get(`${API_BASE_URL}/jenis-jangka-waktu`);
            setJenisJangkaWaktuOptions(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
            console.log('Jenis Jangka Waktu Options:', response.data.data); // Tambahkan ini
        } catch (error) {
            console.error("Error fetching jenis jangka waktu:", error);
            setError(error.message || 'Gagal memuat pilihan jenis jangka waktu.');
        }
    };

    const fetchPeruntukanSewaOptions = async () => {
        try {
            console.log('Fetching Peruntukan Sewa...'); // Tambahkan ini
            const response = await axios.get(`${API_BASE_URL}/peruntukan-sewa`);
            setPeruntukanSewaOptions(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
            console.log('Peruntukan Sewa Options:', response.data.data); // Tambahkan ini
        } catch (error) {
            console.error("Error fetching peruntukan sewa:", error);
            setError(error.message || 'Gagal memuat pilihan peruntukan sewa.');
        }
    };

    const fetchStatusOptions = async () => {
        try {
            console.log('Fetching Status...'); // Tambahkan ini
            const response = await axios.get(`${API_BASE_URL}/status-permohonan`);
            setStatusOptions(response.data.data || []); // Inisialisasi dengan array kosong jika null/undefined
            console.log('Status Options:', response.data.data); // Tambahkan ini
        } catch (error) {
            console.error("Error fetching status:", error);
            setError(error.message || 'Gagal memuat pilihan status.');
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

    const handleAddClick = () => {
        setIsAdding(true);
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
        setIsEditing(false);
        setSelectedPermohonanSewa(null);
    };

    const handleEditClick = (permohonan) => {
        setIsEditing(true);
        setSelectedPermohonanSewa(permohonan);
        setFormData({
            idJenisPermohonan: permohonan.idJenisPermohonan,
            nomorSuratPermohonan: permohonan.nomorSuratPermohonan,
            tanggalPengajuan: permohonan.tanggalPengajuan,
            idWajibRetribusi: permohonan.idWajibRetribusi,
            idObjekRetribusi: permohonan.idObjekRetribusi,
            idJenisJangkaWaktu: permohonan.idJenisJangkaWaktu,
            lamaSewa: permohonan.lamaSewa,
            idPeruntukanSewa: permohonan.idPeruntukanSewa,
            idStatus: permohonan.idStatus,
            createBy: permohonan.createBy,
        });
        setFormErrors({});
        setIsAdding(false);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus permohonan sewa ini?')) {
            try {
                await axios.delete(`${API_BASE_URL}/permohonan-sewa/${id}`);
                fetchPermohonanSewa(); // Refetch data setelah menghapus
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
                const response = await axios.post(`${API_BASE_URL}/permohonan-sewa`, formData);
                console.log('Permohonan sewa berhasil ditambahkan:', response.data);
            } else if (isEditing && selectedPermohonanSewa) {
                const response = await axios.put(`${API_BASE_URL}/permohonan-sewa/${selectedPermohonanSewa.idPermohonanSewa}`, formData);
                console.log('Permohonan sewa berhasil diperbarui:', response.data);
            }
            fetchPermohonanSewa(); // Refetch data setelah submit
            setIsAdding(false);
            setIsEditing(false);
            setSelectedPermohonanSewa(null);
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
        } catch (err) {
            setFormErrors(err.response?.data?.errors || { message: err.message || 'Terjadi kesalahan saat menyimpan data.' });
            console.error('Error submitting form:', err.response?.data?.errors || err);
        }
    };

    const handleCancelForm = () => {
        setIsAdding(false);
        setIsEditing(false);
        setSelectedPermohonanSewa(null);
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

    if (loading) {
        return <div>Loading data permohonan sewa...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Manajemen Permohonan Sewa</h2>

            <button onClick={handleAddClick}>Tambah Permohonan Sewa</button>

            {(isAdding || isEditing) && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID Jenis Permohonan:</label>
                        <select
                            name="idJenisPermohonan"
                            value={formData.idJenisPermohonan}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Jenis Permohonan --</option>
                            {jenisPermohonanOptions.map((jenis) => (
                                <option key={jenis.idJenisPermohonan} value={jenis.idJenisPermohonan}>
                                    {jenis.jenisPermohonan}
                                </option>
                            ))}
                        </select>
                        {formErrors.idJenisPermohonan && <p className="error">{formErrors.idJenisPermohonan[0]}</p>}
                    </div>
                    <div>
                        <label>Nomor Surat Permohonan:</label>
                        <input type="text" name="nomorSuratPermohonan" value={formData.nomorSuratPermohonan} onChange={handleInputChange} required />
                        {formErrors.nomorSuratPermohonan && <p className="error">{formErrors.nomorSuratPermohonan[0]}</p>}
                    </div>
                    <div>
                        <label>Tanggal Pengajuan:</label>
                        <input type="date" name="tanggalPengajuan" value={formData.tanggalPengajuan} onChange={handleInputChange} required />
                        {formErrors.tanggalPengajuan && <p className="error">{formErrors.tanggalPengajuan[0]}</p>}
                    </div>
                    <div>
                        <label>ID Wajib Retribusi:</label>
                        <select
                            name="idWajibRetribusi"
                            value={formData.idWajibRetribusi}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Wajib Retribusi --</option>
                            {wajibRetribusiOptions.map((wajib) => (
                                <option key={wajib.idWajibRetribusi} value={wajib.idWajibRetribusi}>
                                    {wajib.namaWajibRetribusi} {/* Asumsi ada properti namaWajibRetribusi */}
                                </option>
                            ))}
                        </select>
                        {formErrors.idWajibRetribusi && <p className="error">{formErrors.idWajibRetribusi[0]}</p>}
                    </div>
                    <div>
                        <label>ID Objek Retribusi:</label>
                        <select
                            name="idObjekRetribusi"
                            value={formData.idObjekRetribusi}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Objek Retribusi --</option>
                            {objekRetribusiOptions.map((objek) => (
                                <option key={objek.idObjekRetribusi} value={objek.idObjekRetribusi}>
                                    {objek.kodeObjekRetribusi} {/* Asumsi ada properti kodeObjekRetribusi */}
                                </option>
                            ))}
                        </select>
                        {formErrors.idObjekRetribusi && <p className="error">{formErrors.idObjekRetribusi[0]}</p>}
                    </div>
                    <div>
                        <label>ID Jenis Jangka Waktu:</label>
                        <select
                            name="idJenisJangkaWaktu"
                            value={formData.idJenisJangkaWaktu}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Jenis Jangka Waktu --</option>
                            {jenisJangkaWaktuOptions.map((jangkaWaktu) => (
                                <option key={jangkaWaktu.idJenisJangkaWaktu} value={jangkaWaktu.idJenisJangkaWaktu}>
                                    {jangkaWaktu.jenisJangkaWaktu} {/* Asumsi ada properti jenisJangkaWaktu */}
                                </option>
                            ))}
                        </select>
                        {formErrors.idJenisJangkaWaktu && <p className="error">{formErrors.idJenisJangkaWaktu[0]}</p>}
                    </div>
                    <div>
                        <label>Lama Sewa:</label>
                        <input type="number" name="lamaSewa" value={formData.lamaSewa} onChange={handleInputChange} required />
                        {formErrors.lamaSewa && <p className="error">{formErrors.lamaSewa[0]}</p>}
                    </div>
                    <div>
                        <label>ID Peruntukan Sewa:</label>
                        <select
                            name="idPeruntukanSewa"
                            value={formData.idPeruntukanSewa}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Peruntukan Sewa --</option>
                            {peruntukanSewaOptions.map((peruntukan) => (
                                <option key={peruntukan.idPeruntukanSewa} value={peruntukan.idPeruntukanSewa}>
                                    {peruntukan.peruntukanSewa} {/* Asumsi ada properti peruntukanSewa */}
                                </option>
                            ))}
                        </select>
                        {formErrors.idPeruntukanSewa && <p className="error">{formErrors.idPeruntukanSewa[0]}</p>}
                    </div>
                    <div>
                        <label>ID Status:</label>
                        <select
                            name="idStatus"
                            value={formData.idStatus}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">-- Pilih Status --</option>
                            {statusOptions.map((status) => (
                                <option key={status.idStatus} value={status.idStatus}>
                                    {status.namaStatus} {/* Asumsi ada properti namaStatus */}
                                </option>
                            ))}
                        </select>
                        {formErrors.idStatus && <p className="error">{formErrors.idStatus[0]}</p>}
                    </div>
                    <div>
                        <label>Create By:</label>
                        <input type="text" name="createBy" value={formData.createBy} onChange={handleInputChange} />
                        {formErrors.createBy && <p className="error">{formErrors.createBy[0]}</p>}
                    </div>

                    <button type="submit">{isEditing ? 'Simpan Perubahan' : 'Simpan'}</button>
                    <button type="button" onClick={handleCancelForm}>Batal</button>
                </form>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Jenis Permohonan</th>
                        <th>Nomor Surat</th>
                        <th>Tanggal Pengajuan</th>
                        <th>Nama Wajib Retribusi</th>
                        <th>Kode Objek Retribusi</th>
                        <th>Jenis Jangka Waktu</th>
                        <th>Lama Sewa</th>
                        <th>Peruntukan Sewa</th>
                        <th>Status</th>
                        <th>Dibuat Pada</th>
                        <th>Diubah Pada</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {permohonanSewaList.map((permohonan) => (
                        <tr key={permohonan.idPermohonanSewa}>
                            <td>{permohonan.idPermohonanSewa}</td>
                            <td>{permohonan.jenisPermohonan}</td>
                            <td>{permohonan.nomorSuratPermohonan}</td>
                            <td>{permohonan.tanggalPengajuan}</td>
                            <td>{permohonan.namaWajibRetribusi}</td>
                            <td>{permohonan.kodeObjekRetribusi}</td>
                            <td>{permohonan.jenisJangkaWaktu}</td>
                            <td>{permohonan.jangkaWaktu}</td>
                            <td>{permohonan.peruntukanSewa}</td>
                            <td>{permohonan.namaStatus}</td>
                            <td>{permohonan.createdAt}</td>
                            <td>{permohonan.updatedAt}</td>
                            <td>
                                <button onClick={() => handleEditClick(permohonan)}>Edit</button>
                                <button onClick={() => handleDeleteClick(permohonan.idPermohonanSewa)}>Hapus</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PermohonanSewa;