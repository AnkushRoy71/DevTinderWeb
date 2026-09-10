export interface LoginRequestModel {
  email: string;
  password: string;
}

export interface RegisterRequestModel extends LoginRequestModel {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}
