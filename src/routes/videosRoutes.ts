import { FastifyInstance } from "fastify";
import { markVideoAsWatched } from "../controllers/video-view/markVideoAsWatched";
import { getWatched } from "../controllers/video-view/getWatched";
import { getRecentWatched } from "../controllers/video-view/getRecentWatched";
import { getWatchedVideosFromOlympiad } from "../controllers/video-view/getWatchedVideosFromOlympiad";

export async function videosRoutes(app: FastifyInstance) {
    app.post('/users/:userId/videos/:videoId/view', markVideoAsWatched)
    app.get('/users/:userId/videos/:videoId/view', getWatched)
    app.get('/users/:userId/recent-watched', getRecentWatched)
    app.get('/users/:userId/olympiads/:olympiadId/watched', getWatchedVideosFromOlympiad)
}