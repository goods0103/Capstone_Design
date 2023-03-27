import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./eventBanner.module.css"

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

    const [selectedOption, setSelectedOption] = useState("");
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    function handleOptionChange(selectedOption) {
        setSelectedOption(selectedOption);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={selectedOption ? selectedOption.label : ''} />
            <Select
                value={selectedOption}
                onChange={handleOptionChange}
                options={options}
                placeholder="Choose an option"
                isSearchable={true}
                className={styles.selectTag}
            />

            <div>
                <label htmlFor="cpu">Cpu:</label>
                <input type="text" id="cpu" name="cpu" value={formState.cpu} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="gpu">Gpu:</label>
                <input type="text" id="gpu" name="gpu" value={formState.gpu} onChange={handleChange} />
                <ul>

                </ul>
            </div>
            {/*<div>/}
            {/*    <label htmlFor="ram">Ram:</label>/}
            {/    <input type="text" id="ram" name="ram" value={formState.ram} onChange={handleChange} />/}
            {/</div>*/}
            <button type="submit">Submit</button>
        </form>
    );
}

export default InsertSpec;