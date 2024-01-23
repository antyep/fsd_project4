import bcrypt from "bcrypt";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { AppDataSource } from "../data-source";
import { faker } from "@faker-js/faker";

export function createRandomUser(): User {
	return {
	  id: faker.number.int({min: 50, max: 10000}),
	  username: faker.internet.userName(),
	  email: faker.internet.email(),
	  password_hash: bcrypt.hashSync(faker.internet.password(), 10), 
      roles: [UserRoles.CUSTOMER],
	};
  }
  
  export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
	count: 20,
  });

export const userSeeder = async () => {
	try {
		console.log("🔵 Seeding users...");
		await AppDataSource.initialize();
		const userRepository = AppDataSource.getRepository(User);

		const newUser: User = {
			username: "admin",
			email: "miau@gmail.com",
			password_hash: bcrypt.hashSync("root", 10),
			roles: [UserRoles.ADMIN],
		};
		await userRepository.save(newUser);
		await userRepository.save(USERS);


		console.log("Seeding users successfully completed");
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		await AppDataSource.destroy();
	}
};
