export interface ApiSuccessResponseModel<T> {
  status: number;
  message: string;
  data: T;
};


export interface ApiErrorResponseModel {
  status: number;
  message: string;
  error: any;
}