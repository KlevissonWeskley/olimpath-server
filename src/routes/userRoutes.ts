import { FastifyInstance } from "fastify";
import { authenticate } from "../controllers/user/authenticate";
import { getAllUsers } from "../controllers/user/getAllUsers";
import { registerUser } from "../controllers/user/register";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users/register', registerUser)
    app.post('/auth/google/callback', authenticate)
    app.get('/users/getAll', getAllUsers)
}