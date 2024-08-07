"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const models_1 = require("../models");
function filterLastEpisodesByCourse(episodes) {
    const coursesOnList = [];
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!coursesOnList.includes(episode.courseId)) {
            coursesOnList.push(episode.courseId);
            currentList.push(episode);
            return currentList;
        }
        const episodeFromSameCourse = currentList.find(ep => ep.courseId === episode.courseId);
        if (episodeFromSameCourse.order > episode.order)
            return currentList;
        const listWithoutEpisodeFromSameCourse = currentList.filter(ep => ep.courseId !== episode.courseId);
        listWithoutEpisodeFromSameCourse.push(episode);
        return listWithoutEpisodeFromSameCourse;
    }, []);
    return lastEpisodes;
}
exports.userService = {
    findByEmail: async (email) => {
        const user = await models_1.User.findOne({
            attributes: [
                'id',
                ['first_name', 'firstName'],
                ['last_name', 'lastName'],
                'phone',
                'birth',
                'email',
                'password'
            ],
            where: { email }
        });
        return user;
    },
    create: async (attributes) => {
        const user = await models_1.User.create(attributes);
        return user;
    },
    update: async (id, attributes) => {
        const [affectedRows, updatedUsers] = await models_1.User.update(attributes, { where: { id }, returning: true });
        return updatedUsers[0];
    },
    updatePassword: async (id, password) => {
        const [affectedRows, updatedUsers] = await models_1.User.update({
            password
        }, {
            where: { id },
            individualHooks: true,
            returning: true
        });
        return updatedUsers[0];
    },
    getKeepWatchingList: async (id) => {
        const userWithWatchingEpisodes = await models_1.User.findByPk(id, {
            include: {
                association: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong'],
                    ['course_id', 'courseId']
                ],
                include: [{
                        association: 'Course',
                        attributes: [
                            'id',
                            'name',
                            'synopsis',
                            ['thumbnail_url', 'thumbnailUrl']
                        ],
                        as: 'course'
                    }],
                through: {
                    as: 'watchTime',
                    attributes: [
                        'seconds',
                        ['updated_at', 'updatedAt']
                    ]
                }
            }
        });
        if (!userWithWatchingEpisodes)
            throw new Error('Usuário não encontrado.');
        getKeepWatchingList: async (id) => {
            const userWithWatchingEpisodes = await models_1.User.findByPk(id, {
                include: {
                    association: 'Episodes',
                    attributes: [
                        'id',
                        'name',
                        'synopsis',
                        'order',
                        ['video_url', 'videoUrl'],
                        ['seconds_long', 'secondsLong'],
                        ['course_id', 'courseId']
                    ],
                    include: [{
                            association: 'Course',
                            attributes: [
                                'id',
                                'name',
                                'synopsis',
                                ['thumbnail_url', 'thumbnailUrl']
                            ],
                            as: 'course'
                        }],
                    through: {
                        as: 'watchTime',
                        attributes: [
                            'seconds',
                            ['updated_at', 'updatedAt']
                        ]
                    }
                }
            });
            if (!userWithWatchingEpisodes)
                throw new Error('Usuário não encontrado.');
            const keepWatchingList = filterLastEpisodesByCourse(userWithWatchingEpisodes.Episodes);
            // @ts-ignore
            keepWatchingList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);
            return keepWatchingList;
        };
    }
};
//# sourceMappingURL=userService.js.map