import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Ingredient from "App/Models/Ingredient";
import product from "../../cleaned_products.json";
// import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import { DateTime } from "luxon";

export default class IngredientSeeder extends BaseSeeder {
  // @ts-ignore
  // @enableUuidGeneration()
  public async run() {
    function randomDate(start: Date, end: Date) {
      let date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, "0");
      let day = date.getDate().toString().padStart(2, "0");
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      let seconds = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    //@ts-ignore
    const products = product.map((p) => {
      return {
        id: p.id,
        openfoodfact_id: p.openfoodfact_id,
        product_name: p.product_name,
        product_name_en: p.product_name_en,
        product_name_fr: p.product_name_fr,
        product_name_de: p.product_name_de,
        created_at: randomDate(
          new Date("2023-01-01 00:00:00"),
          new Date("2023-02-04 23:59:59")
        ),
        updated_at: randomDate(
          new Date("2023-01-01 00:00:00"),
          new Date("2023-02-04 23:59:59")
        ),
      };
    });

    let arrays = [];
    const size = 100;

    //@ts-ignore
    while (products.length > 0) arrays.push(products.splice(0, size));


    var promises = arrays.map(async (arr, i) => {
      await Ingredient.updateOrCreateMany("id", arr).then((e) => {
        console.clear();
        process.stdout.write("\u001b[1A\u001b[2K"); // move cursor up and clear current line
        process.stdout.write(
          `${Math.round(((i + 1) / promises.length) * 100).toFixed(2)}% done`
        );
      });
    });

    await Promise.allSettled(promises).then((res) => {
    });
  }
}
