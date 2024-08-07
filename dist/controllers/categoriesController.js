"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesController = void 0;
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const categoryService_1 = require("../services/categoryService");
const categoriesController = {
    index: async (req, res) => {
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            const paginatedCategories = await categoryService_1.categoryService.findAllPaginated(page, perPage);
            return res.json(paginatedCategories);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /categories/:id
    show: async (req, res) => {
        const { id } = req.params;
        try {
            const category = await categoryService_1.categoryService.findByIdWithCourses(id);
            return res.json(category);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
exports.categoriesController = categoriesController;
//# sourceMappingURL=categoriesController.js.map