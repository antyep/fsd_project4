import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export const adminUser: User = {
	username: "admin",
	email: "admin@email.com",
	password_hash: bcrypt.hashSync("root", 10),
	roles: [UserRoles.ADMIN],
};
export const customerUser: User = {
	username: "customer",
	email: "customer@email.com",
	password_hash: bcrypt.hashSync("root", 10),
	roles: [UserRoles.CUSTOMER],
};
export const artistUser: User = {
	username: "artist",
	email: "artist@email.com",
	password_hash: bcrypt.hashSync("root", 10),
	roles: [UserRoles.ARTIST],
};

export const TestUsers = [adminUser, customerUser, artistUser];