import { Request, Response } from "express";
import {
   CreateCustomerRequestBody,
   LoginUserRequestBody,
   TokenData,
} from "../types/types";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";
import { AppDataSource } from "../database/data-source";
import { Customer } from "../models/Customer";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

// -----------------------------------------------------------------------------

export class AuthController {
   async register(
      req: Request<{}, {}, CreateCustomerRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { username, password, email, date_of_birth } = req.body;

      const userRepository = AppDataSource.getRepository(User);
      const customerRepository = AppDataSource.getRepository(Customer);

      try {
         // Crear nuevo usuario
         const newUser: User = {
            username,
            email,
            is_admin: false,
            password_hash: bcrypt.hashSync(password, 10),
            roles: [UserRoles.CUSTOMER],
         };
         await userRepository.save(newUser);

         // Crear un customer
         const newCustomer: Customer = {
            user: newUser
         };
         await customerRepository.save(newCustomer);

         res.status(StatusCodes.CREATED).json({
            message: "Customer created successfully",
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while creating Customer",
         });
      }
   }

   async login(
      req: Request<{}, {}, LoginUserRequestBody>,
      res: Response
   ): Promise<void | Response<any>> {
      const { password, email } = req.body;

      const userRepository = AppDataSource.getRepository(User);

      try {
         // Validar existencia de email y contraseña
         if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Email or password is required",
            });
         }

         // Encontrar un usuario por email
         const user = await userRepository.findOne({
            where: {
               email: email,
            },
            relations: {
               roles: true,
            },
            select: {
               roles: {
                  name: true,
               },
            },
         });

         // Verificar usuario inexistente
         if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Verificar contraseña si el usuario existe
         const isPasswordValid = bcrypt.compareSync(
            password,
            user.password_hash
         );

         // Verificar contraseña valida
         if (!isPasswordValid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
               message: "Bad email or password",
            });
         }

         // Generar token

         const roles = user.roles.map((role) => role.name);

         const tokenPayload: TokenData = {
            userId: user.id?.toString() as string,
            userRoles: roles,
         };

         const token = jwt.sign(tokenPayload, "123", {
            expiresIn: "3h",
         });

         res.status(StatusCodes.OK).json({
            message: "Login successfully",
            token,
         });
      } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while login",
            error,
         });
      }
   }
}