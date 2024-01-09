import express from "express";
import Tag from "../models/Tag.js";


const router = express.Router();
// create tag
router.post(
    "/create-tag", async (req, res, next) => {
        try {
            // All the variables for tags now we can customize
            // create tag
            const { name } = req.body;

            const tagDoc = await Tag.create({
                name
            })

            res.status(201).json({
                message: "Create Successfully",
                success: true,
                tagDoc,
            });
        } catch (error) {
            return res.status(404).json({
                success: false,
                error: error.message
            });
        }
    })

// get all tags of a shop
router.get(
    "/get-all-tag",
    async (req, res, next) => {
        try {
            const tag = await Tag.find({});
            res.status(201).json({
                success: true,
                tag
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message
            });
        }
    })

// delete tag of a shop
router.delete("/delete-tag/:id", async (req, res, next) => {
    try {
        const tagId = req.params.id;

        const tag = await Tag.findByIdAndDelete(tagId);

        if (!tag) {
            return res.status(400).json({
                success: false,
                error: "tag is not found with this id",
            });
        }

        res.status(201).json({
            success: true,
            message: "tag deleted successfully!",
            tag,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
});

// Update tag of a shop
router.put(
    "/update-tag/:id",
    async (req, res, next) => {
        try {
            const tagId = req.params.id;
            
            const { name } = req.body;

            const tag = await Tag.findById(tagId);

            if (!tag) {
                return res.status(400).json({
                    success: false,
                    error: "tag is not found with this id",
                });
            }

            // Update tag
            tag.name = name;
            await tag.save();

            res.status(200).json({
                success: true,
                message: "tag updated successfully!",
                tag,
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    }
);



export default router;