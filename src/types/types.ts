export interface CreateCustomerRequestBody {
   username: string;
    email: string;
    password: string;
    date_of_birth: string;;
 }

 export interface LoginUserRequestBody {
    email: string;
    password: string;
 }
 
 export interface TokenData {
    userId: string;
    userRoles: string[];
 }