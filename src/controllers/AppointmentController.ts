import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
import { User } from "../models/User";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";

export class AppointmentController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const appointmentRepository = AppDataSource.getRepository(Appointment);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allAppointments, count] = await appointmentRepository.findAndCount({
            skip: (currentPage - 1) * itemsPerPage,
            take: itemsPerPage,
            select: {
               id: true,
            },
         });
         res.status(StatusCodes.OK).json({
            count,
            skip: itemsPerPage,
            page: currentPage,
            results: allAppointments,
         });
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
         const data = req.body;

         const appointmentRepository = AppDataSource.getRepository(Appointment);
         const newAppointment = await appointmentRepository.save(data);
         res.status(StatusCodes.CREATED).json(newAppointment);
      } catch (error) {
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
			id: Number(userId)
		});

		if (user) {
			const appointmentRepository = AppDataSource.getRepository(Appointment);

			let { page, skip } = req.query;

			let currentPage = page ? +page : 1;
			let itemsPerPage = skip ? +skip : 10;

			const [appointments, count] = await appointmentRepository.findAndCount({
				skip: (currentPage - 1) * itemsPerPage,
				take: itemsPerPage,
				where: {
					user: user
				},
			});

			if (!appointments) {
				return res.status(StatusCodes.NOT_FOUND).json({
					message: "Appointments not found",
				});
			}
			res.status(StatusCodes.OK).json({
				count,
				skip: itemsPerPage,
				page: currentPage,
				results: appointments,
			});

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