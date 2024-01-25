import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Artist } from "../models/Artist";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";
import { paginateAndFetch } from "../utils/paginateAndFetch";

export class ArtistController implements Controller {
	async getAll(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const artistRepository = AppDataSource.getRepository(Artist);
			
			const { results, count, skip, page } = await paginateAndFetch(artistRepository, req.query, {
				select: {
					id: true,
					name: true,
				}
			})

			res.status(StatusCodes.OK).json({
				count,
				skip,
				page,
				results
				
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting artist",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const artistRepository = AppDataSource.getRepository(Artist);
			const artist = await artistRepository.findOneBy({
				id: id,
			});

			if (!artist) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Artist not found",
				});
			}

			res.status(StatusCodes.OK).json(artist);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting artist",
			});
		}
	}

	async create(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const { user_id, name } = req.body;

			const userRepository = AppDataSource.getRepository(User);
			const user = await userRepository.findOneBy({ id: user_id });
			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			const artistRepository = AppDataSource.getRepository(Artist);
			const newArtist = await artistRepository.save({ user: user, name: name });
			// https://stackoverflow.com/a/57432772
			await userRepository.createQueryBuilder().relation(User, "roles").of(user).add(UserRoles.ARTIST.id);

			res.status(StatusCodes.CREATED).json(newArtist);
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating artist",
			});
		}
	}

	async update(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;
			const data = req.body;

			const artistRepository = AppDataSource.getRepository(Artist);
			await artistRepository.update({ id: id }, data);

			res.status(StatusCodes.ACCEPTED).json({
				message: "Artist updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating artist",
			});
		}
	}

	async delete(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const artistRepository = AppDataSource.getRepository(Artist);
			await artistRepository.delete(id);

			res.status(StatusCodes.OK).json({
				message: "Artist deleted successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while deleting artist",
			});
		}
	}
}
