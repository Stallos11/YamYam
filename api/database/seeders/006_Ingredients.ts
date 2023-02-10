import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Ingredient from "App/Models/Ingredient";
import product from "../../mapped.json";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import { DateTime } from "luxon";

export default class IngredientSeeder extends BaseSeeder {
  // @ts-ignore
  // @enableUuidGeneration()
  public async run() {
    //@ts-ignore
    const products = product.map((p) => {
      return {
        id: p.id,
        openfoodfact_id: p.openfoodfact_id,
        product_name: p.product_name,
        product_name_en: p.product_name_en,
        product_name_fr: p.product_name_fr,
        product_name_de: p.product_name_de,
        created_at: DateTime.now(),
        updated_at: DateTime.now(),
      };
    });

    let arrays = [];
    const size = 100;

    //@ts-ignore
    while (products.length > 0) arrays.push(products.splice(0, size));

    console.log(arrays.length);

    var promises = arrays.map(async (arr, i) => {
      console.log(i);
      await Ingredient.updateOrCreateMany("id", arr);
    });

    await Promise.allSettled(promises).then(function (results) {
      console.log("finito", results);
    });
  }
}
