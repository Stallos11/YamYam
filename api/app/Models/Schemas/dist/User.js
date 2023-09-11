"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
exports.userSchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
            example: "fba03160-e9c7-42de-aac6-ac26f50f52d2"
        },
        firstname: {
            type: "string",
            example: "Sherman_Flatley56"
        },
        role: {
            type: "string",
            items: ["user", "admin"],
            example: "user"
        },
        email: {
            type: "string",
            example: "Bailee75@hotmail.com"
        },
        provider: {
            type: "string",
            example: "database"
        },
        remember_me_token: {
            type: "string",
            example: null
        },
        created_at: {
            type: "string",
            example: "2023-01-29T04:24:59.000+01:00"
        },
        updated_at: {
            type: "string",
            example: "2023-01-29T04:24:59.000+01:00"
        }
    }
};
