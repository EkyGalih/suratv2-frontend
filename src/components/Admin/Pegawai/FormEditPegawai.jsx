import React from 'react'
import { Link } from 'react-router-dom'
import { IoCreateOutline, IoPeople, IoPlayBack, IoSave } from 'react-icons/io5'

const FromEditPegawai = () => {
    return (
        <div>
            <h1 className='title'><IoPeople/> Pegawai</h1>
            <h2 className='subtitle'><IoCreateOutline/> Pegawai</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shaddowless">
                        <div className="card-content">
                            <div className="content">
                                <form>
                                    <div className="field">
                                        <div className="control">
                                            <input type="hidden" className="input" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">NIP</label>
                                        <div className="control">
                                            <input type="number" className="input" placeholder="NIP" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Nama Pegawai</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder="Nama Pegawai" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Tempat/Tanggal Lahir</label>
                                        <div className="control">
                                            <div className="columns">
                                                <div className="column is-three-quarters">
                                                    <input type="text" className="input" placeholder='Tempat Lahir' />
                                                </div>
                                                <div className="column is-one-quarter">
                                                    <input type="date" className="input" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Bidang</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option value="">------</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Jabatan</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder="Jabatan" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Pangkat / Golongan</label>
                                        <div className="columns">
                                            <div className="column is-half">
                                                <div className="control">
                                                    <div className="select is-fullwidth">
                                                        <select>
                                                            <option value="">--------</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="column is-half">
                                                <div className="control">
                                                    <div className="select is-fullwidth">
                                                        <select>
                                                            <option value="">--------</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Masa Kerja Golongan</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder="Masa Kerja Golongan" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Diklat</label>
                                        <div className="control">
                                            <textarea className='textarea' placeholder='Diklat'></textarea>
                                            {/* <input type="text" className="input" value={diklat} onChange={(e) => setDiklat(e.target.value)} placeholder="Diklat" /> */}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Pendidikan</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder="Pendidikan" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Umur</label>
                                        <div className="control">
                                            <input type="number" className="input" placeholder="Umur" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Jenis Kelamin</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option value="-">--------</option>
                                                    <option value="pria">Pria</option>
                                                    <option value="wanita">Wanita</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Agama</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option value="-">--------</option>
                                                    <option value="islam">Islam</option>
                                                    <option value="hindu">hindu</option>
                                                    <option value="kristen">kristen</option>
                                                    <option value="budha">budha</option>
                                                    <option value="konghucu">konghucu</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Kenaikan Pangkat</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder="Kenaikan Pangkat" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Tahun Pensiun</label>
                                        <div className="control">
                                            <input type="number" className="input" placeholder="Tahun Pensiun" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Foto</label>
                                        <div className="control">
                                            <div className="columns">
                                                <div className="column is-three-quarters">
                                                    <div className="file">
                                                        <label className="file-label">
                                                            <input type="file" className="file-input" />
                                                            <span className='file-cta'>
                                                                <span className='file-label'>Choose a file...</span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <button type="submit" className="button is-success mr-2"><IoSave className='mr-1'/> Simpan</button>
                                            <Link to="/pegawai" className='button is-default'><IoPlayBack className='mr-1' />Back</Link>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FromEditPegawai