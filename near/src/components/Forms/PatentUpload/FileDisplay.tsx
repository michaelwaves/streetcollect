import { useState, useEffect } from "react";

interface FileDisplayProps {
    fileList: FileList | null;
}

interface FilePreview {
    name: string;
    preview: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ fileList }) => {
    const [filePreviews, setFilePreviews] = useState<FilePreview[]>([]);

    useEffect(() => {
        let reader, isCancel = false;
        if (fileList) {
            for (let i = 0; i < fileList.length; i++) {
                const file = fileList[i];
                reader = new FileReader();

                reader.onload = (e) => {
                    const preview = e.target?.result as string;
                    setFilePreviews([...filePreviews, { name: file.name, preview }]);
                };

                reader.readAsDataURL(file);
            }
            return () => {
                isCancel = true;
                if (reader! && reader.readyState === 1) {
                    reader.abort();
                }

            }

        }
    }, [fileList]);

    return (
        <div id="file-preview">
            {filePreviews.map((filePreview, index) => (
                <div key={index}>
                    {/*   <img src={filePreview.preview} alt={filePreview.name} /> */}
                    <p>{filePreview.name}</p>
                </div>
            ))}
        </div>
    );
};

export default FileDisplay;