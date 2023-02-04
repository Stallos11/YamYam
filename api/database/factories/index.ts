import Factory from "@ioc:Adonis/Lucid/Factory";
import User from "App/Models/User";
import { DateTime } from "luxon";
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
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    id: uuidv4(),
    email: faker.internet.email(),
    firstname: faker.internet.userName(),
    password: faker.internet.password(),
    role: "user",
    provider: "database",
    createdAt: randomDate(
      new Date("2023-01-01 00:00:00"),
      new Date("2023-02-04 23:59:59")
    ),
    updatedAt: randomDate(
      new Date("2023-01-01 00:00:00"),
      new Date("2023-02-04 23:59:59")
    ),
  };
}).build();
