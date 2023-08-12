import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import { enableUuidGeneration } from "App/Decorators/enableUuidGeneration";
import Setting from "App/Models/Setting";

const base64_encode = async () => {
  // read binary data
  const fs = require('fs').promises;
  const contents = await fs.readFile('defaultimg.png', { encoding: 'base64' });

  return contents;
}
export default class SettingSeeder extends BaseSeeder {
  // @ts-ignore
  @enableUuidGeneration()
  public async run() {
    await Setting.updateOrCreate({ id: 'f96cf665-6847-46b7-905e-569b6d45b790' },
      {
        id: "f96cf665-6847-46b7-905e-569b6d45b790",
        defaultRecipeImage: await base64_encode()
      },
    );
  }
}
