import { UserRoles } from "../../constants/UserRoles";
import { Role } from "../../models/Role";
import { AppDataSource } from "../data-source";

export const roleSeeder = async () => {
	try {
		console.log("🔵 Seeding roles...");
		await AppDataSource.initialize();
		const roleRepository = AppDataSource.getRepository(Role);
		const roles: Role[] = [UserRoles.ADMIN, UserRoles.ARTIST, UserRoles.CUSTOMER];

		await roleRepository.save(roles);

		console.log("Seeding roles successfully completed");
	} catch (error) {
		console.error("Error seeding the database:", error);
	} finally {
		await AppDataSource.destroy();
	}
};
