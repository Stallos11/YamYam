import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  column,
  computed,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Recipe from "./Recipe";

export default class Ingredient extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public openfoodfactId: string;

  @column()
  public productName: string;

  @column()
  public kcal: number;

  @column()
  public fat: number;

  @column()
  public saturatedFat: number;

  @column()
  public carbohydrates: number;

  @column()
  public sugars: number;

  @column()
  public proteins: number;

  @column()
  public salt: number;

  @column()
  public img: string;

  @manyToMany(() => Recipe, {
    pivotTable: 'recipe_ingredients',
    pivotTimestamps: true,
  })
  public recipes: ManyToMany<typeof Recipe>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed()
  public get unit() {
    const ingredientUnit = this.$extras.pivot_unit
    return ingredientUnit
  }

  @computed()
  public get amount() {
    const ingredientAmount = this.$extras.pivot_amount
    return ingredientAmount
  }

  @beforeCreate()
  public static async createUUID(ingredient: Ingredient) {
    ingredient.id = uuidv4();
  }
}
