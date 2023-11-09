interface User {
    uid: string;
    photoURL?: string;
    name: string;
    email: string;
    sc: string;
}

interface Post {
    postID: string;
    userID: string;
    title: string;
    description?: string;
    imageURL: string;
    upvotes: string;
    location: {
        latitude: number;
        longitude: number;
    }
}