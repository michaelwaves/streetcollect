"use client"
import { useState } from "react";

const UploadPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const handleSubmit = () => {
        alert("Upload")
        // Here you can handle the form submission, including uploading the image to your server or storage.
        // Use `title`, `description`, `image`, and `location` states to send data to your backend.
        // Remember to handle errors and loading states appropriately.
    };

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-lg mt-4">
            <h1 className="text-2xl font-semibold mb-4">Upload Post</h1>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Title</label>
                <input
                    type="text"
                    className="mt-1 p-2 w-full border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <textarea
                    className="mt-1 p-2 w-full border rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Image</label>
                <input type="file" className="mt-1" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="mb-4">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={handleDetectLocation}>
                    Detect Location
                </button>
                {location && (
                    <span className="text-gray-600">
                        Location: {location.latitude}, {location.longitude}
                    </span>
                )}
            </div>

            <div>
                <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleSubmit}>
                    Upload
                </button>
            </div>
        </div>
    );
};

export default UploadPost;