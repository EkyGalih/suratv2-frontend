import React from 'react'

const FormUserEdit = () => {
    return (
        <div>
            <h1 className='title'>Pengguna</h1>
            <h2 className='subtitle'>Ubah Pengguna</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form>
                                    <div className="field">
                                        <label className="label">Nama Lengkap</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder='Username' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Username</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder='Username' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input type="password" className="input" placeholder='******' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Level</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option value="admin">Admin</option>
                                                    <option value="pimpinan">Pimpinan</option>
                                                    <option value="agendaris">Agendaris</option>
                                                    <option value="users">Users</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Divisi</label>
                                        <div className="control">
                                            <div className="select is-fullwidth">
                                                <select>
                                                    <option value="Divisi">Divisi</option>
                                                    <option value="Divisi">Divisi</option>
                                                    <option value="Divisi">Divisi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-success">Save</button>
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

export default FormUserEdit