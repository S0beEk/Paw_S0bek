const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;


app.use(express.json());


app.post("/posts", async (req, res) => {
    const { title, content, categoryId } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, content, categoryId },
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Błąd podczas tworzenia wpisu:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


app.get("/posts", async (req, res) => {
    const posts = await prisma.post.findMany({
        include: { category: true, comments: true },
    });
    res.json(posts);
});

app.post("/categories", async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({ data: { name } });
        res.status(201).json(category);
    } catch (error) {
        console.error("Błąd podczas tworzenia kategorii:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


app.post("/comments", async (req, res) => {
    const { content, postId } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: { content, postId },
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error("Błąd podczas tworzenia komentarza:", error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});
