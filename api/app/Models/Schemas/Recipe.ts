export const recipeSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
        },
        name: {
            type: "string",
            example: "Sherman_Flatley56",
        },
        description: {
            type: "string",
            example: "Sherman_Flatley56",
        },
        preparationTime: {
            type: "number",
            example: 10,
        },
        cookingTime: {
            type: "number",
            example: 10,
        },
        difficulty: {
            type: "number",
            example: 1,
        },
        eatersAmount: {
            type: "number",
            example: 1,
        },
        userId: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
        },
        recipeTypeId: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
        },
        image: {
            type: "string",
            example: "Sherman_Flatley56",
        },
        recipeCategoryId: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
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