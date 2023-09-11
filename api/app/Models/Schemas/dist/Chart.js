"use strict";
exports.__esModule = true;
exports.chartResponseSchema = void 0;
exports.chartResponseSchema = {
    type: "object",
    properties: {
        x: {
            type: "string",
            example: "2023-01-01T00:00:00.000Z"
        },
        y: {
            type: "number",
            example: 492
        }
    }
};
