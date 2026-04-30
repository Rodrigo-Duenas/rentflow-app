export const successResponse = (data: unknown) => ({
  status: "success",
  data,
});

export const errorResponse = (message: string, code: string) => ({
  status: "error",
  message,
  code,
});
