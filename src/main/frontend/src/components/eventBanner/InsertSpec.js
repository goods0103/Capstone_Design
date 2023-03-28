import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./eventBanner.module.css"

function InsertSpec() {

    const [option, setOption] = useState([]);

    useEffect(() => {
        axios.get('/category/cpu1')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus.cpu_name,
                    label: cpus.cpu_name
                }));
                setOption(cpus);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [selectedOption, setSelectedOption] = useState("");

    function handleOptionChange(selectedOption) {
        setSelectedOption(selectedOption);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="cpuSelect">Selected Cpu:</label>
            <input name = "cpuSelect" className={styles.selectTagShow} value={selectedOption ? selectedOption.label : ''} />
            <Select
                value={selectedOption}
                onChange={handleOptionChange}
                options={option}
                placeholder="Choose an option"
                className={styles.selectTag}
            />

            <label htmlFor="cpuSelect">Selected Gpu:</label>
            <input name = "cpuSelect" className={styles.selectTagShow}  />
            <Select
                value={selectedOption}
                onChange={handleOptionChange}
                options={option}
                placeholder="Choose an option"
                isSearchable={true}
                className={styles.selectTag}
            />

            <label htmlFor="cpuSelect">Selected Ram:</label>
            <input name = "cpuSelect" className={styles.selectTagShow}  />
            <Select
                value={selectedOption}
                onChange={handleOptionChange}
                options={option}
                placeholder="Choose an option"
                isSearchable={true}
                className={styles.selectTag}
            />

            <button type="submit">Submit</button>
        </form>
    );
}

export default InsertSpec;