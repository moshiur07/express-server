import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import { initDB, pool } from "./config/db";
import { userRoutes } from "./modules/Users/user.routes";
import { todosRoutes } from "./modules/Todos/todos.routes";
const app = express()
const port = config.port
// ! Parser
app.use(express.json())
// ! DB
initDB()
//! Routes:
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})
//! Users CRUD
app.use("/users", userRoutes)

// todos CRUD
app.use("/todos", todosRoutes)
// ! 404 not found
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "NO path found",
        path: req.path
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
