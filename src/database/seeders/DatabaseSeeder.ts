import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";
import { artistSeeder } from "./ArtistSeeder";
import { appointmentSeeder } from "./AppointmentSeeder";

(async () => {
	console.log("-----------------------------------------------");
	console.log("🌱 Starting seeders...");
	console.log("-----------------------------------------------");

	await roleSeeder();
	await userSeeder();
	await artistSeeder();
	await appointmentSeeder()

	console.log("-----------------------------------------------");
})();
