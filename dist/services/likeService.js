"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeService = void 0;
const models_1 = require("../models");
exports.likeService = {
    create: async (userId, courseId) => {
        const like = await models_1.Like.create({
            userId,
            courseId
        });
        return like;
    },
    delete: async (userId, courseId) => {
        await models_1.Like.destroy({
            where: {
                userId,
                courseId
            }
        });
    },
    isLiked: async (userId, courseId) => {
        const like = await models_1.Like.findOne({
            where: {
                userId,
                courseId
            }
        });
        return like !== null ? true : false;
    }
};
//# sourceMappingURL=likeService.js.map