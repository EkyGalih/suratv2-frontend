import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIdCard } from 'react-icons/io5'
import { useParams } from 'react-router-dom';

const ViewProfile = () => {
    const { id } = useParams();
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [nip, setNip] = useState("");

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        const response = await axios.get(`http://localhost:5000/users/${id}`)
        setImage(response.data.pegawai.url);
        setName(response.data.nama_lengkap);
        setNip(response.data.nip);
    }

    return (
        <div>
            <h1 className="title"><IoIdCard /> Profile</h1>
            <div className="box">
                <div className="columns is-fullwidth">
                    <div className="column is-half">
                        <div class="card">
                            <div class="card-image">
                                <figure class="image is-4by3">
                                    <img src={image} alt="Placeholder image" />
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <h1 className="title">{name}</h1>
                        <h2 className="subtitle has-text-dark-grey">{nip ?? '-'}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewProfile