import { FastifyInstance } from "fastify";
import { createOlympiad } from "../controllers/olympiad/createOlympiad";
import { getAllOlympiads } from "../controllers/olympiad/getAllOlympiads";
import { updateOlympiad } from "../controllers/olympiad/updateOlympiad";
import { getOlympiadById } from "../controllers/olympiad/getOlympiadById";
import { deleteOlympiad } from "../controllers/olympiad/deleteOlympiad";
import { getMaterials } from "../controllers/materials/getMaterials";
import { getSimulated } from "../controllers/olympiad/getSimulated";

export async function olympiadRoutes(app: FastifyInstance) {
    app.post('/olympiads/create', createOlympiad)
    app.get('/olympiads/getAll', getAllOlympiads)
    app.get('/olympiads/getById/:id', getOlympiadById)
    app.patch('/olympiads/update/:id', updateOlympiad)
    app.delete('/olympiads/delete/:id', deleteOlympiad)

    app.get('/olympiads/materials', getMaterials)
    app.get('/olympiads/:id/simulated', getSimulated)
}