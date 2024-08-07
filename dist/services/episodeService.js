"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodeService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const models_1 = require("../models");
exports.episodeService = {
    streamEpisodeToResponse: (res, videoUrl, range) => {
        const filePath = path_1.default.join(__dirname, '../../uploads', videoUrl);
        const fileStat = fs_1.default.statSync(filePath);
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
            const chunkSize = (end - start) + 1;
            const file = fs_1.default.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        }
        else {
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs_1.default.createReadStream(filePath).pipe(res);
        }
    },
    getWatchTime: async (userId, episodeId) => {
        const watchTime = await models_1.WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                episodeId
            }
        });
        return watchTime;
    },
    setWatchTime: async ({ userId, episodeId, seconds }) => {
        const watchTimeAlreadyExists = await models_1.WatchTime.findOne({
            where: {
                userId,
                episodeId
            }
        });
        if (watchTimeAlreadyExists) {
            watchTimeAlreadyExists.seconds = seconds;
            await watchTimeAlreadyExists.save();
            return watchTimeAlreadyExists;
        }
        else {
            const watchTime = await models_1.WatchTime.create({
                userId,
                episodeId,
                seconds
            });
            return watchTime;
        }
    }
};
//# sourceMappingURL=episodeService.js.map