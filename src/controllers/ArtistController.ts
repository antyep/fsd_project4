import { Controller } from "./Controller";
import { Request, Response } from "express";
import { Artist } from "../models/Artist";
import { AppDataSource } from "../database/data-source";
import { StatusCodes } from "http-status-codes";

export class ArtistController implements Controller {
   async getAll(req: Request, res: Response): Promise<void | Response<any>> {
      try {
         const artistRepository = AppDataSource.getRepository(Artist);

         let { page, skip } = req.query;

         let currentPage = page ? +page : 1;
         let itemsPerPage = skip ? +skip : 10;

         const [allArtists, count] = await artistRepository.findAndCount({
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
            results: allArtists,
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
         const data = req.body;

         const artistRepository = AppDataSource.getRepository(Artist);
         const newUser = await artistRepository.save(data);
         res.status(StatusCodes.CREATED).json(newUser);
      } catch (error) {
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