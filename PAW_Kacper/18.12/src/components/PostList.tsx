import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Pobierz dane z API
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await response.json();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Lista postów</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
