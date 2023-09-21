import { expect, test } from 'vitest'

const nutriments = ['kcal', 'carbohydrates', 'fat', 'saturated_fat', 'proteins', 'salt', 'sugars'];
const coefs = {
    mg: 0.00001,
    g: 0.01,
    kg: 10,
    mL: 0.00001,
    cL: 0.001,
    L: 10
}

const getNutriments = (ingredients, totalPersons) => {
    let result = {};

    nutriments.forEach(nutri => {
        result[nutri] = ingredients.reduce((acc, val) => {
            //@ts-ignore
            const total = val[nutri] * val.amount * coefs[val.unit] * totalPersons;
            return acc + total
        }, 0).toFixed(3)
    })

    return result;
}

const ingredients = [{ "id": "03b9916d-cd27-4d20-86e6-641902c61423", "openfoodfact_id": "3017620421006", "product_name": "Pâte à tartiner Nutella noisettes et cacao - 750g", "kcal": 539, "fat": 30.9, "saturated_fat": 10.6, "carbohydrates": 57.5, "sugars": 56.3, "proteins": 6.3, "salt": 0.11, "img": "https://images.openfoodfacts.org/images/products/301/762/042/1006/front_fr.250.400.jpg", "created_at": "2023-01-31T23:31:53.000+00:00", "updated_at": "2023-01-30T22:43:17.000+00:00", "unit": "g", "amount": 1000 }]

test('ingredient macros should be right for one person', () => {
    expect(getNutriments(ingredients, 1)).toEqual({
        "carbohydrates": "575.000",
        "fat": "309.000",
        "kcal": "5390.000",
        "proteins": "63.000",
        "salt": "1.100",
        "saturated_fat": "106.000",
        "sugars": "563.000",
    })
})

test('ingredient macros should be doubled for 2 persons', () => {
    expect(getNutriments(ingredients, 2)).toEqual({
        "carbohydrates": "1150.000",
        "fat": "618.000",
        "kcal": "10780.000",
        "proteins": "126.000",
        "salt": "2.200",
        "saturated_fat": "212.000",
        "sugars": "1126.000",
    })
})

test('ingredient macros should be invalid', () => {
    expect(getNutriments(ingredients, 2)).not.toEqual({
        "carbohydrates": "1150",
    })
})