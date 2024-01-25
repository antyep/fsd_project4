import { User } from "../../models/User";
import { Artist } from "../../models/Artist";
import { AppDataSource } from "../data-source";
import { faker } from "@faker-js/faker";
import { artistUser } from "./TestUsers";

export function createRandomArtist(user: User): Artist {
    return {
        user: user,
        name: faker.internet.userName(),
    };
}

export const artistSeeder = async () => {
    try {
        console.log("🔵 Seeding artists...");
        await AppDataSource.initialize();

		const userRepository = AppDataSource.getRepository(User);
		const users = await userRepository.findBy({ username: artistUser.username });

		const ARTISTS: Artist[] = [];
		users.forEach(user => {
			const artist = createRandomArtist(user);
			ARTISTS.push(artist);
		});

        const artistRepository = AppDataSource.getRepository(Artist);

        await artistRepository.save(ARTISTS);

        console.log("Seeding artists successfully completed");
    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        await AppDataSource.destroy();
    }
};