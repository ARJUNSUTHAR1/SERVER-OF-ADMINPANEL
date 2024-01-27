import express from "express";
import CardModel from "../models/CardModel.js";

const router = express.Router();

router.post("/create-card", async (req, res) => {
    try {
        const { mainHeading, isVisible, productsData } = req.body;

        const newCard = new CardModel({
            mainHeading,
            isVisible,
            productsData,
        });

        await newCard.save();

        res.status(201).json({ success: true, message: "Card created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


router.get("/get-all-cards", async (req, res) => {
    try {
        const cards = await CardModel.find();
        res.status(200).json({ success: true, cards });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


router.put("/update-card/:cardId", async (req, res) => {
    try {
        const { mainHeading, isVisible, productsData } = req.body;
        const cardId = req.params.cardId;

        // Find the card by ID and update its fields
        const updatedCard = await CardModel.findByIdAndUpdate(
            cardId,
            { mainHeading, isVisible, productsData },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Card updated successfully", card: updatedCard });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});



router.delete("/delete-card/:cardId", async (req, res) => {
    try {
        const cardId = req.params.cardId;

        // Find the card by ID and delete it
        await CardModel.findByIdAndDelete(cardId);

        res.status(200).json({ success: true, message: "Card deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;