export const BASE_URL = "https://the-help.vercel.app/";

//User API's
export const USER_BASE_URL = BASE_URL + "user/";
export const SIGN_UP = USER_BASE_URL + "add_user";
export const SIGN_IN = USER_BASE_URL + "login_user";
export const UPDATE_PASSWORD = USER_BASE_URL +"reset_password/"

//Client API's
export const CLIENT_BASE_URL = BASE_URL + "client/";
export const ADD_CLIENT = CLIENT_BASE_URL + "add_client_by_user";
export const GET_CLIENT_LIST = CLIENT_BASE_URL + "get_client_by_user";
export const GET_CLIENT_BY_ID = CLIENT_BASE_URL;
//Service API's
export const SERVICE_BASE_URL = BASE_URL + "service/";
export const ADD_SERVICE = SERVICE_BASE_URL + "add_service_with_base64";
export const GET_SERVICE_LIST = SERVICE_BASE_URL + "get_services";

//Invoice API's
export const INVOICE_BASE_URL = BASE_URL + "invoice/";
export const ADD_INVOICE = INVOICE_BASE_URL + "add_invoice";
export const GET_INVOICE_LIST = INVOICE_BASE_URL + "get_invoices_by_user";
export const GET_INVOICE_BY_ID = INVOICE_BASE_URL;


//Appointment API's
export const APPOINTMENT_BASE_URL = BASE_URL + "appointment/";
export const ADD_APPOINTMENT = APPOINTMENT_BASE_URL + "add_appointment";
export const GET_APPOINTMENT_LIST =
  APPOINTMENT_BASE_URL + "get_appointments_by_user";
  export const GET_ALL_APPOINTMENT_LIST =
  APPOINTMENT_BASE_URL + "get_all_appointments_by_user";