import Factory from "@ioc:Adonis/Lucid/Factory";
import RecipeCategory from "App/Models/RecipeCategory";
import RecipeType from "App/Models/RecipeType";
import User from "App/Models/User";
import { v4 as uuidv4 } from "uuid";

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

  if (+month > 12) month = '12'
  if (+day > 28) day = '25'

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

//@ts-ignore
export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    id: uuidv4(),
    email: faker.internet.email(),
    firstname: faker.internet.userName(),
    password: faker.internet.password(),
    role: "user",
    provider: "database",
    createdAt: randomDate(
      new Date("2022-01-01 00:00:00"),
      new Date("2023-02-04 23:59:59")
    ),
    updatedAt: randomDate(
      new Date("2023-01-01 00:00:00"),
      new Date("2023-02-04 23:59:59")
    ),
  };
}).build();

//@ts-ignore
export const RecipeTypeFactory = Factory.define(RecipeType, ({ faker }) => {
  return {
    id: uuidv4(),
    type: "Type " + faker.address.cityName(),
    createdAt: randomDate(
      new Date("2023-01-01 00:00:00"),
      new Date("2023-02-04 23:59:59")
    ),
    updatedAt: randomDate(
      new Date("2023-01-01 00:00:00"),
      new Date("2023-02-08 23:59:59")
    ),
  };
}).build();

export const RecipeCategoriesFactory = Factory.define(
  RecipeCategory,
  //@ts-ignore
  ({ faker }) => {
    return {
      id: uuidv4(),
      category: "Category " + faker.address.cityName(),
      createdAt: randomDate(
        new Date("2023-01-01 00:00:00"),
        new Date("2023-02-04 23:59:59")
      ),
      updatedAt: randomDate(
        new Date("2023-01-01 00:00:00"),
        new Date("2023-02-08 23:59:59")
      ),
    };
  }
).build();
