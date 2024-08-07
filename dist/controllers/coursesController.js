"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesController = void 0;
const courseService_1 = require("../services/courseService");
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const likeService_1 = require("../services/likeService");
const favoriteService_1 = require("../services/favoriteService");
exports.coursesController = {
    featured: async (req, res) => {
        try {
            const featuredCourses = await courseService_1.courseService.getRandomFeaturedCourses();
            return res.json(featuredCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /courses/newest
    newest: async (req, res) => {
        try {
            const newestCourses = await courseService_1.courseService.getTopTenNewest();
            return res.json(newestCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /courses/search?name=
    search: async (req, res) => {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== 'string')
                throw new Error('name param must be of type string');
            const courses = await courseService_1.courseService.findByName(name, page, perPage);
            return res.json(courses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    show: async (req, res) => {
        const userId = req.user.id;
        const courseId = req.params.id;
        try {
            const course = await courseService_1.courseService.findByIdWithEpisodes(courseId);
            if (!course)
                return res.status(404).json({ message: 'Curso não encontrado' });
            const liked = await likeService_1.likeService.isLiked(userId, Number(courseId));
            const favorited = await favoriteService_1.favoriteService.isFavorited(userId, Number(courseId));
            return res.json({ ...course.get(), favorited, liked });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    popular: async (req, res) => {
        try {
            const topTen = await courseService_1.courseService.getTopTenByLikes();
            return res.json(topTen);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
//# sourceMappingURL=coursesController.js.map