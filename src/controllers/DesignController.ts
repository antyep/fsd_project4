import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Design } from "../models/Design";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";

export class DesignController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const designRepository = AppDataSource.getRepository(Design);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allDesigns, count] = await designRepository.findAndCount({
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
            results: allDesigns,
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

         const designRepository = AppDataSource.getRepository(Design);
         const design = await designRepository.findOneBy({
            id: id,
         });

         if (!design) {
            return res.status(StatusCodes.NOT_FOUND).json({
               message: "Design not found",
            });
         }

         res.status(StatusCodes.OK).json(design);
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while getting design",
         });
      }
   }

   async create(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const data = req.body;

         const designRepository = AppDataSource.getRepository(Design);
         const newUser = await designRepository.save(data);
         res.status(StatusCodes.CREATED).json(newUser);
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating design",
         });
      }
   }

   async update(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;
         const data = req.body;

         const designRepository = AppDataSource.getRepository(Design);
         await designRepository.update({ id: id }, data);

         res.status(StatusCodes.ACCEPTED).json({
            message: "Design updated successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while updating design",
         });
      }
   }

   async delete(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const id = +req.params.id;

         const designRepository = AppDataSource.getRepository(Design);
         await designRepository.delete(id);

         res.status(StatusCodes.OK).json({
            message: "Design deleted successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while deleting design",
         });
      }
   }
}