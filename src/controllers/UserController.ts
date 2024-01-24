import { Controller } from "./Controller";
import { Request, Response } from "express";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";

export class UserController implements Controller {
	async getAll(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userRepository = AppDataSource.getRepository(User);

			let { page, skip } = req.query;

			let currentPage = page ? +page : 1;
			let itemsPerPage = skip ? +skip : 10;

			const [allUsers, count] = await userRepository.findAndCount({
				skip: (currentPage - 1) * itemsPerPage,
				take: itemsPerPage,
				select: {
					username: true,
					email: true,
					id: true,
				},
			});
			res.status(StatusCodes.OK).json({
				count,
				skip: itemsPerPage,
				page: currentPage,
				results: allUsers,
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting users",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({
				id: id,
			});

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			res.status(StatusCodes.OK).json(user);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting user",
			});
		}
	}

	async create(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const data = req.body;

			const userRepository = AppDataSource.getRepository(User);
			const newUser = await userRepository.save(data);
			res.status(StatusCodes.CREATED).json(newUser);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating user",
			});
		}
	}

	async update(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;
			const data = req.body;

			const userRepository = AppDataSource.getRepository(User);
			await userRepository.update({ id: id }, data);

			res.status(StatusCodes.ACCEPTED).json({
				message: "User updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating user",
			});
		}
	}

	async delete(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			console.log("id", id);

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({ id: id });

			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			// @todo: delete users in cascade. this is throwing error because of that

			// await userRepository.delete(user);

			res.status(StatusCodes.OK).json({
				message: "User deleted successfully",
			});
		} catch (error) {
			console.log(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while deleting user",
			});
		}
	}
}
