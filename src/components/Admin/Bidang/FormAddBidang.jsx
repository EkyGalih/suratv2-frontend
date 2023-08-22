import React from 'react'
import { Link } from 'react-router-dom'
import { IoPlayBack, IoSave } from 'react-icons/io5'

const FormAddBidang = () => {
    return (
        <div>
            <h1 className='title'>Bidang</h1>
            <h2 className='subtitle'>Tambah Bidang Baru</h2>
            <div className="columns is-centered">
                <div className="column is-half">
                    <div className="card is-shadowless">
                        <div className="card-content">
                            <div className="content">
                                <form>
                                    <div className="field">
                                        <label className="label">Nama Bidang</label>
                                        <div className="control">
                                            <input type="text" className="input" placeholder='Username' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-success mr-1"><IoSave className='mr-1'/> Save</button>
                                            <Link to='/admin/bidang' className='button is-default'><IoPlayBack className='mr-1'/> Kembali</Link>
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

export default FormAddBidang