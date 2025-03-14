const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

const postsFile = path.join(__dirname, "data", "posts.json");

// GET - Lista postów
app.get("/posts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsFile, "utf8"));
  res.json(posts.map(({ comments, ...rest }) => rest));
});

// GET - Pojedynczy post z komentarzami
app.get("/posts/:id", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsFile, "utf8"));
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
});

// POST - Dodanie komentarza
app.post("/posts/:id/comments", (req, res) => {
  const { author, text } = req.body;
  const posts = JSON.parse(fs.readFileSync(postsFile, "utf8"));
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));

  if (postIndex === -1) {
    return res.status(404).json({ error: "Post not found" });
  }

  const newComment = {
    id: Date.now(),
    author,
    text,
  };

  posts[postIndex].comments.push(newComment);
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2));
  res.status(201).json(newComment);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend API działa na http://localhost:${PORT}`);
});
