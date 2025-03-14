import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost, addComment } from "../api/api";
import { useParams } from "react-router-dom";
import { useState } from "react";

const PostDetails = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
  });

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["post", id]); // odśwież dane
      setAuthor("");
      setText("");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author && text) {
      mutation.mutate({ postId: id, author, text });
    }
  };

  if (isLoading) return <p>Ładowanie posta...</p>;
  if (error) return <p>Błąd: {error.message}</p>;

  return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>

        <h3>Komentarze:</h3>
        <ul>
          {post.comments.map(comment => (
              <li key={comment.id}>
                <strong>{comment.author}:</strong> {comment.text}
              </li>
          ))}
        </ul>

        <h3>Dodaj komentarz:</h3>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
          />
          <br />
          <textarea
              placeholder="Treść komentarza"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
          />
          <br />
          <button type="submit">Dodaj komentarz</button>
        </form>
      </div>
  );
};

export default PostDetails;
