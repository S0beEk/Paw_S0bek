const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


router.post("/", async (req, res) => {
    const { title, content, categoryId } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, content, categoryId },
        });
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.get("/", async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { category: true, comments: true },
        });
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: { category: true, comments: true },
        });
        if (!post) return res.status(404).json({ error: "Wpis nie znaleziony" });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, content, categoryId } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { title, content, categoryId },
        });
        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

module.exports = router;
