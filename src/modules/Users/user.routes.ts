import { Router } from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";


// TODO: route -> controller -> service


const router = Router();


router.post("/", userControllers.createUser)

router.get("/", auth("admin"), userControllers.getAllUsers)

router.get("/:id", userControllers.getSingleUser)

router.put("/:id", userControllers.userUpdate)

router.delete("/:id", userControllers.userDelete)

export const userRoutes = router;