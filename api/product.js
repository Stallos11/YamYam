const products = require('./cleaned_products.json');
const result = [];
const fs = require('fs');
const axios = require('axios');

let errCount = 0;
let index = 0;

fetchData(index)

async function fetchData(index) {
    const id = products[index].openfoodfact_id;

    axios.get('https://world.openfoodfacts.org/api/v0/product/' + id, {
        timeout: 30000,
    }).then((res) => {
        const infos = res.data;
        if (infos.product.product_name &&
            infos.product.nutriments['carbohydrates_100g'] &&
            infos.product.nutriments['energy-kcal_100g'] &&
            infos.product.nutriments['fat_100g'] &&
            infos.product.nutriments['proteins_100g'] &&
            infos.product.nutriments['salt_100g'] &&
            infos.product.nutriments['saturated-fat_100g'] &&
            infos.product.nutriments['sugars_100g'] &&
            infos.product['image_url']
        ) {
            result.push({
                "openfoodfact_id": infos.code,
                "product_name": infos.product.product_name,
                "kcal": infos.product.nutriments['energy-kcal_100g'],
                "fat": infos.product.nutriments['fat_100g'],
                "saturated_fat": infos.product.nutriments['saturated-fat_100g'],
                "carbohydrates": infos.product.nutriments['carbohydrates_100g'],
                "sugars": infos.product.nutriments['sugars_100g'],
                "proteins": infos.product.nutriments['proteins_100g'],
                "salt": infos.product.nutriments['salt_100g'],
                "img": infos.product['image_url']
            })

            console.log('lgt', result.length);
        }
    }).catch((err) => {
        errCount++;
        console.log('gg les erreurs:', errCount, err)
    }).finally(() => {
        index++
        if (index < products.length - 1) {
            fetchData(index)
        } else {
            var json = JSON.stringify(result);
            fs.writeFile('myjsonfile.json', json, 'utf8', () => console.log('terminado'));
        }
    })
}

