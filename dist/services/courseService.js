"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = void 0;
const models_1 = require("../models");
const sequelize_1 = require("sequelize");
exports.courseService = {
    findByIdWithEpisodes: async (id) => {
        const courseWithEpisodes = await models_1.Course.findByPk(id, {
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            include: {
                association: 'episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true
            }
        });
        return courseWithEpisodes;
    },
    getRandomFeaturedCourses: async () => {
        const featuredCourses = await models_1.Course.findAll({
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where: {
                featured: true
            }
        });
        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random());
        return randomFeaturedCourses.slice(0, 3);
    },
    getTopTenNewest: async () => {
        const courses = await models_1.Course.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        });
        return courses;
    },
    getTopTenByLikes: async () => {
        const results = await models_1.Course.sequelize?.query(`SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url as thumbnailUrl,
        COUNT(users.id) AS likes
      FROM courses
        LEFT OUTER JOIN likes
          ON courses.id = likes.course_id
          INNER JOIN users
            ON users.id = likes.user_id
      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10;`);
        if (results) {
            const [topTen] = results;
            return topTen;
        }
        else {
            return null;
        }
    },
    findByName: async (name, page, perPage) => {
        const offset = (page - 1) * perPage;
        const { count, rows } = await models_1.Course.findAndCountAll({
            attributes: ['id', 'name', 'synopsis', ['thumbnail_url', 'thumbnailUrl']],
            where: {
                name: {
                    [sequelize_1.Op.iLike]: `%${name}%`
                }
            },
            limit: perPage,
            offset
        });
        return {
            courses: rows,
            page,
            perPage,
            total: count
        };
    }
};
//# sourceMappingURL=courseService.js.map