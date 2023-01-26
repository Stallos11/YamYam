import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import RecipeCategory from "./RecipeCategory";
import RecipeType from "./RecipeType";
import RecipeIngredient from "./RecipeIngredient";
import Favourite from "./Favourite";
import Rating from "./Rating";
import Config from "@ioc:Adonis/Core/Config";

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public preparationTime: number;

  @column()
  public cookingTime: number;

  @column()
  public difficulty: 1 | 2 | 3 | 4 | 5;

  @column()
  public eatersAmount: number;

  @column()
  public userId: string;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;

  @belongsTo(() => RecipeCategory)
  public recipeCategory: BelongsTo<typeof RecipeCategory>;

  @column()
  public recipeTypeId: string;

  @belongsTo(() => RecipeType)
  public recipeType: BelongsTo<typeof RecipeType>;

  @hasMany(() => RecipeIngredient)
  public ingredients: HasMany<typeof RecipeIngredient>;

  @hasMany(() => Favourite)
  public favourites: HasMany<typeof Favourite>;

  @hasMany(() => Rating)
  public ratings: HasMany<typeof Rating>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(recipe: Recipe) {
    if (Config.get("app.enableUuidGeneration")) recipe.id = uuidv4();
  }
}
