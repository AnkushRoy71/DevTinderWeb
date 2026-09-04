export interface ApiResponseModel<T> {
  status: number;
  message: string;
  data: T;
  error: any;
};