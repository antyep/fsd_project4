import bcrypt from "bcrypt";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { AppDataSource } from "../data-source";

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

		console.log("Seeding users successfully completed");
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		await AppDataSource.destroy();
	}
};
