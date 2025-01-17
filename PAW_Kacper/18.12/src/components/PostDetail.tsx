import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, User } from '../types';

const PostDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Pobierz ID z parametrów URL
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            // Pobierz post
            const fetchPostAndUser = async () => {
                const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postResponse.json();
                setPost(postData);

                // Pobierz użytkownika tworzącego post
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);
            };

            fetchPostAndUser();
        }
    }, [id]);

    if (!post || !user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <h2>Utworzony przez: {user.name}</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default PostDetail;
