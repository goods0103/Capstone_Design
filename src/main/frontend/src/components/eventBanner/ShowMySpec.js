import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowMySpec() {
const downloadFile = async () => {
    const response = await axios({
      url: 'http://localhost:12000/ShowMYSpec',
      method: 'GET',
      responseType: 'blob', // 파일 다운로드를 위한 설정
    });
  
    // 파일 다운로드를 위한 코드
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Scoop.exe');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };
return (
<div>
<button onClick={downloadFile}>Download</button>
</div>
);
}

export default ShowMySpec;









