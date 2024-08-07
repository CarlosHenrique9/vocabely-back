"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteService = void 0;
const Favorite_1 = require("../models/Favorite");
exports.favoriteService = {
    findByUserId: async (userId) => {
        const favorites = await Favorite_1.Favorite.findAll({
            attributes: [['user_id', 'userId']],
            where: { userId },
            include: {
                association: 'Course',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        });
        return {
            userId,
            courses: favorites.map(favorite => favorite.Course)
        };
    },
    create: async (userId, courseId) => {
        const favorite = await Favorite_1.Favorite.create({
            userId,
            courseId
        });
        return favorite;
    },
    delete: async (userId, courseId) => {
        await Favorite_1.Favorite.destroy({
            where: {
                userId,
                courseId
            }
        });
    },
    isFavorited: async (userId, courseId) => {
        const favorite = await Favorite_1.Favorite.findOne({
            where: {
                userId,
                courseId
            }
        });
        return favorite !== null;
    }
};
//# sourceMappingURL=favoriteService.js.map