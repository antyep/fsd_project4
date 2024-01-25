import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";
import { Artist } from "../models/Artist";
import { paginateAndFetch } from "../utils/paginateAndFetch";
import { error } from "console";

export class AppointmentController implements Controller {
	async getAll(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const appointmentRepository = AppDataSource.getRepository(Appointment);

			const { results, count, skip, page } = await paginateAndFetch(appointmentRepository, req.query, { 
				select: { id: true },
			})

			res.status(StatusCodes.OK).json({ count, skip, page, results });
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting appointments",
			});
		}
	}

	async getUserAppointments(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userId = req.tokenData?.userId;
			const userRepository = AppDataSource.getRepository(User);

			const user = await userRepository.findOneBy({ id: Number(userId) });
			if (!user) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}

			const appointmentRepository = AppDataSource.getRepository(Appointment);

			const { results, count, skip, page } = await paginateAndFetch(appointmentRepository, req.query, { 
				select: { id: true },
				where: { user }
			})

			res.status(StatusCodes.OK).json({ count, skip, page, results });
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting appointments",
			});
		}
	}

	async getArtistAppointments(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userId = req.tokenData?.userId;

		const artistRepository = AppDataSource.getRepository(Artist);
		const artist = await artistRepository.findOneBy({ user: { id: Number(userId) } });
		if (!artist) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: "Artist not found",
			});
		}

		const appointmentRepository = AppDataSource.getRepository(Appointment);
		const { results, count, skip, page } = await paginateAndFetch(appointmentRepository, req.query, { 
			select: { id: true },
			where: { artist }
		})

		res.status(StatusCodes.OK).json({ count, skip, page, results });
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting appointments",
			});
		}
	}

	async getById(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const appointmentRepository = AppDataSource.getRepository(Appointment);
			const appointment = await appointmentRepository.findOneBy({
				id: id,
			});

			if (!appointment) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Appointment not found",
				});
			}

			res.status(StatusCodes.OK).json(appointment);
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting appointment",
			});
		}
	}

	async create(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const userId = req.tokenData?.userId;
			const { artist_id, datetime } = req.body;
			console.log(error);

			const appointmentRepository = AppDataSource.getRepository(Appointment);
			const userRepository = AppDataSource.getRepository(User);
			const artistRepository = AppDataSource.getRepository(Artist);

			const user = await userRepository.findOneBy({ id: Number(userId) });
			const artist = await artistRepository.findOneBy({ id: artist_id });

			if (!user || !artist) {
				return res.status(StatusCodes.BAD_REQUEST).json({
					message: "User or Artist not found",
				});
			}

			const newAppointment = await appointmentRepository.save({
				user: user,
				artist: artist,
				date: datetime,
			});

			res.status(StatusCodes.CREATED).json(newAppointment);
		} catch (error) {
			console.error(error);
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while creating appointment",
			});
		}
	}

	async update(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;
			const data = req.body;

			const appointmentRepository = AppDataSource.getRepository(Appointment);
			await appointmentRepository.update({ id: id }, data);

			res.status(StatusCodes.ACCEPTED).json({
				message: "Appointment updated successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while updating appointment",
			});
		}
	}

	async delete(req: Request, res: Response): Promise<void | Response<any>> {
		try {
			const id = +req.params.id;

			const appointmentRepository = AppDataSource.getRepository(Appointment);
			await appointmentRepository.delete(id);

			res.status(StatusCodes.OK).json({
				message: "Appointment deleted successfully",
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while deleting appointment",
			});
		}
	}

	async getByUserId(req: Request, res: Response): Promise<void | Response<any>> {
		const userId = req.tokenData.userId;

		try {
			const userRepository = AppDataSource.getRepository(User);

			const user = await userRepository.findOneBy({
				id: Number(userId),
			});

			if (user) {
				const appointmentRepository = AppDataSource.getRepository(Appointment);
				const { results, count, skip, page } = await paginateAndFetch(appointmentRepository, req.query, { 
					where: {
						user: user,
					}
				})
	
				res.status(StatusCodes.OK).json({ count, skip, page, results });
			} else {
				res.status(StatusCodes.NOT_FOUND).json({
					message: "User not found",
				});
			}
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				message: "Error while getting appointments",
			});
		}
	}
}
