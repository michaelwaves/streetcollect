import React from 'react';
import Image from 'next/image';

interface PostProps {
    postId: string;
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
    location: {
        latitude: number;
        longitude: number;
    };
    upvotes: number;
    onUpvote: () => void;
    onDownvote: () => void;
}

const Post: React.FC<PostProps> = ({
    postId,
    userId,
    title,
    description,
    imageUrl,
    location,
    upvotes,
    onUpvote,
    onDownvote,
}) => {
    const openGoogleMaps = () => {
        const { latitude, longitude } = location;
        const mapsUrl = `https://www.google.com/maps/place/${latitude},${longitude}`;
        window.open(mapsUrl, '_blank');
    };

    return (
        <div className="border rounded-lg p-4 mb-4">
            <Image src={imageUrl} alt={title} width={400} height={400} className="rounded-lg mb-4" />
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{description}</p>

            <div className="flex items-center mb-2">
                <button className="mr-2 bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded" onClick={onUpvote}>
                    Upvote
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded" onClick={onDownvote}>
                    Downvote
                </button>
            </div>

            <div className="flex items-center text-gray-500 cursor-pointer" onClick={openGoogleMaps}>
                <svg
                    className="w-4 h-4 fill-current mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 7c-1.11 0-2-.89-2-2s.89-2 2-2 2 .89 2 2-.89 2-2 2z" />
                </svg>
                {`(${location.latitude}, ${location.longitude})`}
            </div>

            <div className="mt-2 text-gray-600">Upvotes: {upvotes}</div>
        </div>
    );
};

export default Post;