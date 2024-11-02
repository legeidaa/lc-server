import { ApiError } from "../middlewares/error";

export const checkReqFields = (...fields: unknown[]) => {
  if (!fields || fields.length === 0) {
    throw new ApiError(400, "No fields provided");
  }

  const isAllFieldsExist = fields.every((field) => field !== undefined && field !== null);
  if (!isAllFieldsExist) {
    throw new ApiError(400, "All fields are required");
  }
};
