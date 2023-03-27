import React, { useEffect, useState } from "react";
import axios from "axios";

function InsertSpec() {
    const [formState, setFormState] = useState({ cpu: '', gpu: '' });
    // const [formState, setFormState] = useState({ cpu: '', gpu: '', ram: '' });
    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/submit', formState)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="cpu">Cpu:</label>
                <input type="text" id="cpu" name="cpu" value={formState.cpu} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gpu">Gpu:</label>
                <input type="text" id="gpu" name="gpu" value={formState.gpu} onChange={handleChange} />
            </div>
            {/*<div>*/}
            {/*    <label htmlFor="ram">Ram:</label>*/}
            {/*    <input type="text" id="ram" name="ram" value={formState.ram} onChange={handleChange} />*/}
            {/*</div>*/}
            <button type="submit">Submit</button>
        </form>
    );
}

export default InsertSpec;
