import { User } from "../../models/User";
import { Artist } from "../../models/Artist";
import { Appointment } from "../../models/Appointment";
import { AppDataSource } from "../data-source";
import { faker } from "@faker-js/faker";
import { customerUser, artistUser } from "./TestUsers";

export const appointmentSeeder = async () => {
    try {
        console.log("🔵 Seeding appointments...");
        await AppDataSource.initialize();
        const appointmentRepository = AppDataSource.getRepository(Appointment);
		const userRepository = AppDataSource.getRepository(User);
		const artistRepository = AppDataSource.getRepository(Artist);

		const user = await userRepository.findOneBy({ username: customerUser.username })
		const artist = await artistRepository.find({ take: 1 })

		if (!user || !artist) {
			console.log("User or artist not found")
			return;
		}

		const appointment = new Appointment()
		appointment.date = faker.date.future()
		appointment.user = user
		appointment.artist = artist[0]

        await appointmentRepository.save(appointment);

        console.log("Seeding appointments successfully completed");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await AppDataSource.destroy();
    }
};