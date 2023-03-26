import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryBar from "./categoryBar";

function CategoryCpu() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/category/c1') // API 호출
            .then(response => setData(response.data)) // 데이터 저장
            .catch(error => console.log(error)); // 에러 처리
    }, []);

    return (
        <div>
            {/* 데이터 출력 */}
            {data}
        </div>
    );
}

export default CategoryCpu;