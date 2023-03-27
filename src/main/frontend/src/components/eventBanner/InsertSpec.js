import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

function InsertSpec() {
    const [formState, setFormState] = useState({ cpu: '', gpu: '' });
    const [selectedOption, setSelectedOption] = useState("");
    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    function handleOptionChange(selectedOption) {
        setSelectedOption(selectedOption);
    }
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

                <Select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    options={options}
                    placeholder="Choose an option"
                    isSearchable={true}
                />


    );
}

export default InsertSpec;
