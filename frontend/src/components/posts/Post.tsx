import React from 'react';
import Image from 'next/image';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi'
import { SlLocationPin } from 'react-icons/sl'
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

            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-2">{description}</p>
            <Image src={imageUrl} alt={title} width={400} height={400} className="rounded-lg mb-4" />
            <div className="flex items-center mb-2 flex-row gap-4 justify-center">
                <button className=" bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded" onClick={onUpvote}>
                    <BiUpArrow />
                </button>
                <div className="mt-2 text-gray-600">{upvotes}</div>
                <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-4 rounded" onClick={onDownvote}>
                    <BiDownArrow />
                </button>
                <div className="flex items-center text-gray-500 cursor-pointer" onClick={openGoogleMaps}>
                    <SlLocationPin className="bg-s-3 w-8 h-8 rounded-full p-2 text-white" />
                </div>

            </div>


        </div>
    );
};

export default Post;