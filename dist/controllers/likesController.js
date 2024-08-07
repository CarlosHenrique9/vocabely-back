"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesController = void 0;
const likeService_1 = require("../services/likeService");
exports.likesController = {
    // POST /likes
    save: async (req, res) => {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const like = await likeService_1.likeService.create(userId, courseId);
            return res.status(201).json(like);
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
            await likeService_1.likeService.delete(userId, Number(courseId));
            return res.status(204).send();
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
//# sourceMappingURL=likesController.js.map