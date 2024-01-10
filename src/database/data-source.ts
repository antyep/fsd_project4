import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateRoles1702301789294 } from "./migrations/01-CreateRoles";
import { CreateUsers1702301796616 } from "./migrations/02-CreateUsers";
import { CreateUsersRoles1702301805968 } from "./migrations/03-CreateUsersRoles";

// -----------------------------------------------------------------------------

export const AppDataSource = new DataSource({
   type: "mysql",
   host: "localhost",
   port: 3307,
   username: "root", //Cambio a datos correctos
   password: "root", //Cambio a datos correctos
   database: "typeorm_academy", //Cambio a datos correctos
   entities: [`${__dirname}/../models/**/*{.js,.ts}`],
   migrations: [`${__dirname}/migrations/**/*{.js,.ts}`],
   // migrations: [
   //    CreateRoles1702301789294,
   //    CreateUsers1702301796616,
   //    CreateUsersRoles1702301805968,
   // ],
   // Estas migraciones cambiaran
   synchronize: false,
   logging: false,
});

// console.log(`${__dirname}/migrations`);