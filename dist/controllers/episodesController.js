"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodesController = void 0;
const episodeService_1 = require("../services/episodeService");
exports.episodesController = {
    // GET /episodes/stream
    stream: async (req, res) => {
        const { videoUrl } = req.query;
        const range = req.headers.range;
        try {
            if (typeof videoUrl !== 'string') {
                throw new Error('videoUrl must be of type \'string\'');
            }
            episodeService_1.episodeService.streamEpisodeToResponse(res, videoUrl, range);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /episodes/:id/watchTime
    getWatchTime: async (req, res) => {
        const userId = req.user.id;
        const episodeId = req.params.id;
        try {
            const watchTime = await episodeService_1.episodeService.getWatchTime(userId, Number(episodeId));
            return res.json(watchTime);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // POST /episodes/:id/watchTime
    setWatchTime: async (req, res) => {
        const userId = req.user.id;
        const episodeId = Number(req.params.id);
        const { seconds } = req.body;
        try {
            const watchTime = await episodeService_1.episodeService.setWatchTime({
                episodeId,
                userId,
                seconds
            });
            return res.json(watchTime);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
//# sourceMappingURL=episodesController.js.map