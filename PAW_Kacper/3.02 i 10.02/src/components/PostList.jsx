import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";
import { Link } from "react-router-dom";

const PostList = () => {
  const { data: posts, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
