/*
 Standard API response format

 Success Response
 {
   success: true,
   message: "",
   data: {},
   meta: {}
 }

 Error Response
 {
   success: false,
   message: "Error message"
 }
*/

export const successResponse = (res, data, message = "Success", meta = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
    meta
  });
};

export const createdResponse = (res, data, message = "Created") => {
  return res.status(201).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, message = "Something went wrong", status = 500) => {
  return res.status(status).json({
    success: false,
    message
  });
};