import { roleSeeder } from "./RoleSeeder";
import { userSeeder } from "./UserSeeder";

(async () => {
	console.log("-----------------------------------------------");
	console.log("🌱 Starting seeders...");
	console.log("-----------------------------------------------");

	await roleSeeder();
	await userSeeder();

	console.log("-----------------------------------------------");
})();
