const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma.category.create({ data: { name } });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.get("/", async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        });
        if (!category) return res.status(404).json({ error: "Kategoria nie znaleziona" });
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });
        res.json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});


router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.category.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Błąd serwera" });
    }
});

module.exports = router;
