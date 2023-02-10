export const chartResponseSchema = {
  type: "object",
  properties: {
    x: {
      type: "string",
      example: "2023-01-01T00:00:00.000Z",
    },
    y: {
      type: "number",
      example: 492,
    },
  },
};
