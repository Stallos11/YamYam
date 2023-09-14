export const RecipeTypeSchema = {
  type: "object",
  properties: {
      id: {
          type: "string",
          example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
      },
      type: {
          type: "string",
          example: "Petite Faim",
      },
      created_at: {
          type: "string",
          example: "2023-01-29T04:24:59.000+01:00",
      },
      updated_at: {
          type: "string",
          example: "2023-01-29T04:24:59.000+01:00",
      },
  },
};