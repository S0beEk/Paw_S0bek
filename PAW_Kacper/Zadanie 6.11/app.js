const express = require("express");

const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");
const commentsRouter = require("./routes/comments");

const app = express();
const PORT = 3000;


app.use(express.json());


app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/comments", commentsRouter);


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
