const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();


router.post("/", async (req, res) => {
    const { content, postId } = req.body;
    try {
        const comment = await prisma.comment.create({
            data: { content, postId },
        });
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.get("/", async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({
            include: { post: true },
        });
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(id) },
            include: { post: true },
        });
        if (!comment) return res.status(404).json({ error: "Komentarz nie znaleziony" });
        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: { content },
        });
        res.json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.comment.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

module.exports = router;
