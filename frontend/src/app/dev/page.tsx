"use client"

import Post from "@/components/posts/Post";
import POSTDATA from "@/data/POSTDATA";

const post = POSTDATA[0];

function Home() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center">
                <Post
                    postId={post.postId}
                    userId={post.userId}
                    title={post.title}
                    description={post.description}
                    imageUrl={post.imageUrl}
                    location={post.location}
                    upvotes={post.upvotes}
                    onUpvote={() => { alert("Upvote") }}
                    onDownvote={() => { alert("Downvote") }}
                />
            </div>
        </div>
    );
}

export default Home;