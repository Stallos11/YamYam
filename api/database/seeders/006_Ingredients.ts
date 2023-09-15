import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Ingredient from "App/Models/Ingredient";
import product from "../../myjsonfile.json";

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
        id: '1',
        openfoodfact_id: p.openfoodfact_id,
        product_name: p.product_name,
        kcal: p.kcal.toFixed(2),
        fat: p.fat.toFixed(2),
        saturatedFat: p.saturated_fat.toFixed(2),
        carbohydrates: p.carbohydrates.toFixed(2),
        sugars: p.sugars.toFixed(2),
        proteins: p.proteins.toFixed(2),
        salt: p.salt.toFixed(2),
        img: p.img,
        created_at: randomDate(
          new Date("2023-01-01 00:00:00"),
          new Date("2023-02-02 23:59:59")
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
      await Ingredient.createMany(arr).then(() => {
        console.clear();
        process.stdout.write("\u001b[1A\u001b[2K");
        process.stdout.write(
          `${Math.round(((i + 1) / promises.length) * 100).toFixed(2)}% done`
        );
      }).catch(err => console.error('err', err));
    });

    await Promise.allSettled(promises).then(() => { });
  }
}
