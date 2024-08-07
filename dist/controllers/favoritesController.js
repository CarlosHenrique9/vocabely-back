"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesController = void 0;
const favoriteService_1 = require("../services/favoriteService");
exports.favoritesController = {
    // GET /favorites
    index: async (req, res) => {
        const userId = req.user.id;
        try {
            const favorites = await favoriteService_1.favoriteService.findByUserId(userId);
            return res.json(favorites);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // POST /favorites
    save: async (req, res) => {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const favorite = await favoriteService_1.favoriteService.create(userId, courseId);
            return res.status(201).json(favorite);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    delete: async (req, res) => {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            await favoriteService_1.favoriteService.delete(userId, Number(courseId));
            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
//# sourceMappingURL=favoritesController.js.map