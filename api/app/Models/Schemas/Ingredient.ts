export const ingredientSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2",
        },
        openfoodfacts_id: {
            type: "string",
            example: "3017620429484",
        },
        product_name: {
            type: "string",
            example: "Pain de mie complet",
        },
        product_name_en: {
            type: "string",
            example: "Wholemeal bread",
        },
        product_name_de: {
            type: "string",
            example: "Vollkornbrot",
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
