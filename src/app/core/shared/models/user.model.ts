export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  photoUrl?: string;
  about?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
