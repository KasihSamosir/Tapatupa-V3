import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const initialForm = {
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
    const [showForm, setShowForm] = useState(false); // State untuk mengontrol tampilan form atau tabel
    const [objekRetribusiList, setObjekRetribusiList] = useState([]);
    const [jenisJangkaWaktuList, setJenisJangkaWaktuList] = useState([]);

    useEffect(() => {
        fetchTarifs();
        fetchDropdownData('objek-retribusi', setObjekRetribusiList);
        fetchDropdownData('jenis-jangka-waktu', setJenisJangkaWaktuList);
    }, []);

    const fetchTarifs = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/tarif-objek-retribusi`);
            console.log('Response Data Tarif:', res.data);
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
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            setState(response.data.data);
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
        formData.set('isDefault', form.isDefault ? '1' : '0'); // Pastikan format isDefault benar

        try {
            const response = await axios.post(`${API_BASE_URL}/tarif-objek-retribusi`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Response Tambah Tarif:', response.data);
            fetchTarifs();
            setForm(initialForm);
            setError('');
            alert('Tarif berhasil ditambahkan!');
            setShowForm(false); // Sembunyikan form setelah berhasil
        } catch (error) {
            console.error("Error adding tarif:", error);
            if (error.response && error.response.data) {
                console.log("Response error data:", error.response.data);
                if (error.response.data.errors) {
                    setError(Object.values(error.response.data.errors).flat().join("\n"));
                } else if (error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('Gagal menambahkan tarif.');
                }
            } else {
                setError('Gagal menambahkan tarif.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTambahTarif = () => {
        setShowForm(true);
        setForm(initialForm); // Reset form saat tombol tambah diklik
    };

    return (
        <div>
            <h1>Tarif Objek Retribusi</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {loading && <div>Loading...</div>}

            {!showForm ? (
                <div>
                    <button onClick={handleTambahTarif}>Tambah Tarif</button>
                    <h2>Daftar Tarif</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Kode Objek</th>
                                <th>Jangka Waktu</th>
                                <th>Tanggal Dinilai</th>
                                <th>Nama Penilai</th>
                                <th>Tarif</th>
                                <th>Keterangan</th>
                                <th>File Penilaian</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(tarifs) && tarifs.map((tarif) => (
                                <tr key={tarif.idTarifObjekRetribusi}>
                                <td>{tarif.objek_retribusi?.kodeObjekRetribusi}</td> {/* Perhatikan: objek_retribusi */}
                                <td>{tarif.jenis_jangka_waktu?.jenisJangkaWaktu}</td> {/* Perhatikan: jenis_jangka_waktu */}
                                <td>{tarif.tanggalDinilai}</td>
                                <td>{tarif.namaPenilai}</td>
                                <td>{tarif.nominalTarif}</td>
                                <td>{tarif.keterangan}</td>
                                <td>{tarif.fileHasilPenilaian?.split('/').pop()}</td> {/* Ambil hanya nama file */}
                                </tr>
                                ))}
                            </tbody>
                    </table>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    {/* Form elements seperti sebelumnya */}
                    <div>
                        <label htmlFor="idObjekRetribusi">Objek Retribusi:</label>
                        <select name="idObjekRetribusi" id="idObjekRetribusi" value={form.idObjekRetribusi} onChange={handleChange} required>
                            <option value="">Pilih Objek Retribusi</option>
                            {Array.isArray(objekRetribusiList) && objekRetribusiList.map(objek => (
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
                            {Array.isArray(jenisJangkaWaktuList) && jenisJangkaWaktuList.map(jenis => (
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
                    <button type="button" onClick={() => setShowForm(false)}>Batal</button> {/* Tombol batal untuk kembali ke tabel */}
                </form>
            )}
        </div>
    );
}

export default TarifObjectRetribusi;