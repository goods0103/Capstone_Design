import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowMySpec() {
    const [data, setData] = useState(null);
    const [cpuInfo, setCpuInfo] = useState('');
    const [gpuInfo, setGpuInfo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpuModel, setCpuModel] = useState('');

    useEffect(() => {
        // CPU 정보 가져오기
        const cpu = navigator.hardwareConcurrency;
        setCpuInfo(`CPU 모델명: ${cpu}`);

        axios.get('/cpu')
            .then(response => setCpuModel(response.data.model))
            .catch(error => console.log(error));

        // WebGL을 사용하여 GPU 정보 가져오기
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const info = gl.getExtension('WEBGL_debug_renderer_info');
            if (info) {
                const gpu = gl.getParameter(info.UNMASKED_RENDERER_WEBGL);
                setGpuInfo(`GPU 모델명: ${gpu}`);
            } else {
                setGpuInfo('GPU 정보를 가져올 수 없습니다.');
            }
        } else {
            setGpuInfo('WebGL을 지원하지 않는 브라우저입니다.');
        }
    }, []);

    const handleClick = async () => {
        try {
            const response = await axios.get("http://localhost:12000");
            console.log("받은 데이터:", response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
            // TODO: 오류 처리 로직을 추가
        }
    };

    const handleInputChange = event => {
        if (event.target.name === "email") {
            setEmail(event.target.value);
            console.log(email);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
            console.log(password);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
        const userData = {
            email: email,
            password: password,
        };
        console.log("first clear");
        console.log(userData.email);
        console.log(userData.password);
        axios.post('http://localhost:12000/api/signup', userData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        console.log("second clear");
    }

    return (
        <div>
            <button onClick={handleClick}>Send Request to Spring Boot Server</button>
            {data && (
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
            <p>CPU 모델명: {cpuModel}</p>
            {cpuInfo !== null && <p>CPU aaaaa 정보: {cpuInfo}</p>}
            {gpuInfo !== null && <p>GPU 정보: {gpuInfo}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" onChange={handleInputChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ShowMySpec;