import { useParams } from 'react-router-dom';

const Post = () => {
    const { id } = useParams();

    return (
        <div className="post-detail">
            <h1>Post Title {id}</h1>
            <p>Full content of post {id}...</p>
        </div>
    );
};

export default Post;
