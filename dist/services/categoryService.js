"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const models_1 = require("../models");
exports.categoryService = {
    findAllPaginated: async (page, perPage) => {
        const offset = (page - 1) * perPage;
        const { count, rows } = await models_1.Category.findAndCountAll({
            attributes: ['id', 'name', 'position'],
            order: [['position', 'ASC']],
            limit: perPage,
            offset
        });
        return {
            categories: rows,
            page,
            perPage,
            total: count
        };
    },
    findByIdWithCourses: async (id) => {
        const categoryWithCourses = await models_1.Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'courses',
                attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            }
        });
        return categoryWithCourses;
    }
};
//# sourceMappingURL=categoryService.js.map