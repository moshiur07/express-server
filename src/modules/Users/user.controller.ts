import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userService.createUser(name, email)

        res.status(201).json({
            message: "Data Inserted",
            data: result.rows[0]
        })

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        // service
        const result = await userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: " Data retrieved successfully ",
            data: result.rows,
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.getSingleUser(req.params.id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        } else {
            res.status(200).json({
                success: true,
                message: " user found successfully ",
                data: result.rows[0],
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const userUpdate = async (req: Request, res: Response) => {
    const { name, email } = req.body
    try {
        const result = await userService.userUpdate(name, email, req.params.id!)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        } else {
            res.status(200).json({
                success: true,
                message: " user updated successfully ",
                data: result.rows[0],
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const userDelete = async (req: Request, res: Response) => {
    try {
        const result = await userService.userDelete(req.params.id!)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User does not exist"
            })
        } else {
            res.status(200).json({
                success: true,
                message: " user deleted successfully ",
                data: null,
            })
        }

    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const userControllers = {
    createUser, getAllUsers, getSingleUser, userUpdate, userDelete
}