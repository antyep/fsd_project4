import { roleSeeder } from "./RoleSeeder";

(async () => {
	console.log("-----------------------------------------------");
	console.log("🌱 Starting seeders...");
	console.log("-----------------------------------------------");

	await roleSeeder();

	console.log("-----------------------------------------------");
})();
