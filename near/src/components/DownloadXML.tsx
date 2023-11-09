import React, { useState } from 'react';
import { render } from 'react-dom';
import { js2xml } from 'xml-js';

const DownloadButton = (jsonData: any) => {
    /* const [jsonData, setJsonData] = useState({
}); */

    const handleDownload = () => {
        const xmlData = js2xml(jsonData, { compact: true, spaces: 4 });

        const element = document.createElement('a');
        element.href = URL.createObjectURL(new Blob([xmlData], { type: 'text/xml' }));
        element.download = 'data.xml';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <button onClick={handleDownload}><h3>Download XML</h3></button>
    );
};


export default DownloadButton;