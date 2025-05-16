import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/TarifObjekRetribusi.css'

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const initialForm = {
    idTarifObjekRetribusi: null,
    idObjekRetribusi: '',
    idJenisJangkaWaktu: '',
    tanggalDinilai: '',
    namaPenilai: '',
    nominalTarif: '',
    keterangan: '',
    isDefault: false,
    fileHasilPenilaian: null,
};

function TarifObjectRetribusi() {
    const [tarifs, setTarifs] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [objekRetribusiList, setObjekRetribusiList] = useState([]);
    const [jenisJangkaWaktuList, setJenisJangkaWaktuList] = useState([]);
    const [editingTarifId, setEditingTarifId] = useState(null);

    useEffect(() => {
        fetchTarifs();
        fetchDropdownData('objek-retribusi', setObjekRetribusiList);
        fetchDropdownData('jenis-jangka-waktu', setJenisJangkaWaktuList);
    }, []);

    const fetchTarifs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/tarif-objek-retribusi`);
            setTarifs(res.data);
            setError('');
        } catch (error) {
            console.error("Error fetching tarif:", error);
            setError('Gagal mengambil data tarif.');
        } finally {
            setLoading(false);
        }
    };

    const fetchDropdownData = async (endpoint, setState) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/${endpoint}`);
            setState(res.data.data);
            setError('');
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            setError(`Gagal mengambil data untuk ${endpoint}.`);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm({
            ...form,
            [name]: type === 'file' ? files[0] : type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });
        formData.set('isDefault', form.isDefault ? '1' : '0');

        const url = editingTarifId
            ? `${API_BASE_URL}/tarif-objek-retribusi/${editingTarifId}`
            : `${API_BASE_URL}/tarif-objek-retribusi`;
        const method = editingTarifId ? 'POST' : 'POST';

        try {
            if (editingTarifId) {
                formData.append('_method', 'PUT');
            }

            await axios({
                method: method,
                url: url,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            fetchTarifs();
            setForm(initialForm);
            setShowForm(false);
            setEditingTarifId(null);
            setError('');
            alert(`Tarif berhasil ${editingTarifId ? 'diperbarui' : 'ditambahkan'}!`);
        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response && error.response.data) {
                if (error.response.data.errors) {
                    setError(Object.values(error.response.data.errors).flat().join('\n'));
                } else if (error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Terjadi kesalahan saat menyimpan tarif.');
                }
            } else {
                setError('Terjadi kesalahan saat menyimpan tarif.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (tarif) => {
        setForm({
            idTarifObjekRetribusi: tarif.idTarifObjekRetribusi,
            idObjekRetribusi: tarif.idObjekRetribusi,
            idJenisJangkaWaktu: tarif.idJenisJangkaWaktu,
            tanggalDinilai: tarif.tanggalDinilai,
            namaPenilai: tarif.namaPenilai,
            nominalTarif: tarif.nominalTarif,
            keterangan: tarif.keterangan,
            isDefault: tarif.isDefault,
            fileHasilPenilaian: null,
        });
        setEditingTarifId(tarif.idTarifObjekRetribusi);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus tarif ini?')) return;

        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/tarif-objek-retribusi/${id}`);
            fetchTarifs();
            setError('');
            alert('Tarif berhasil dihapus!');
        } catch (error) {
            console.error("Error deleting tarif:", error);
            setError('Gagal menghapus tarif.');
        } finally {
            setLoading(false);
        }
    };

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    };

    const formatTanggal = (tanggal) => {
        return new Date(tanggal).toLocaleDateString('id-ID');
    };

    const handleTambahTarif = () => {
        setForm(initialForm);
        setShowForm(true);
        setEditingTarifId(null);
    };

    return (
        <div>
            <h1>Tarif Objek Retribusi</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Loading...</div>}

            {!showForm ? (
                <>
                    <button onClick={handleTambahTarif}>Tambah Tarif</button>
                    <h2>Daftar Tarif</h2>
                    <table border="1" cellPadding="8">
                        <thead>
                            <tr>
                                <th>Kode Objek</th>
                                <th>Jangka Waktu</th>
                                <th>Tanggal Dinilai</th>
                                <th>Nama Penilai</th>
                                <th>Tarif</th>
                                <th>Keterangan</th>
                                <th>File Penilaian</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tarifs.map((tarif) => (
                                <tr key={tarif.idTarifObjekRetribusi}>
                                    <td>{tarif.objek_retribusi?.kodeObjekRetribusi}</td>
                                    <td>{tarif.jenis_jangka_waktu?.jenisJangkaWaktu}</td>
                                    <td>{formatTanggal(tarif.tanggalDinilai)}</td>
                                    <td>{tarif.namaPenilai}</td>
                                    <td>{formatRupiah(tarif.nominalTarif)}</td>
                                    <td>{tarif.keterangan}</td>
                                    <td>{tarif.fileHasilPenilaian?.split('/').pop()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(tarif)}>Edit</button>
                                        <button onClick={() => handleDelete(tarif.idTarifObjekRetribusi)}>Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="idObjekRetribusi">Objek Retribusi:</label>
                        <select name="idObjekRetribusi" id="idObjekRetribusi" value={form.idObjekRetribusi} onChange={handleChange} required>
                            <option value="">Pilih Objek Retribusi</option>
                            {objekRetribusiList.map(objek => (
                                <option key={objek.idObjekRetribusi} value={objek.idObjekRetribusi}>
                                    {objek.kodeObjekRetribusi} - {objek.namaObjekRetribusi}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="idJenisJangkaWaktu">Jenis Jangka Waktu:</label>
                        <select name="idJenisJangkaWaktu" id="idJenisJangkaWaktu" value={form.idJenisJangkaWaktu} onChange={handleChange} required>
                            <option value="">Pilih Jenis Jangka Waktu</option>
                            {jenisJangkaWaktuList.map(jenis => (
                                <option key={jenis.idJenisJangkaWaktu} value={jenis.idJenisJangkaWaktu}>
                                    {jenis.jenisJangkaWaktu}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tanggalDinilai">Tanggal Dinilai:</label>
                        <input type="date" name="tanggalDinilai" id="tanggalDinilai" value={form.tanggalDinilai} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="namaPenilai">Nama Penilai:</label>
                        <input type="text" name="namaPenilai" id="namaPenilai" value={form.namaPenilai} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="nominalTarif">Nominal Tarif:</label>
                        <input type="number" name="nominalTarif" id="nominalTarif" value={form.nominalTarif} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="keterangan">Keterangan:</label>
                        <textarea name="keterangan" id="keterangan" value={form.keterangan} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="isDefault">Default:</label>
                        <input type="checkbox" name="isDefault" id="isDefault" checked={form.isDefault} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="fileHasilPenilaian">File Hasil Penilaian:</label>
                        <input type="file" name="fileHasilPenilaian" id="fileHasilPenilaian" onChange={handleChange} />
                    </div>
                    <button type="submit" disabled={loading}>Simpan</button>
                    <button type="button" onClick={() => setShowForm(false)}>Batal</button>
                </form>
            )}
        </div>
    );
}

export default TarifObjectRetribusi;
