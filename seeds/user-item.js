// import seed data files, arrays of objects
import usersData from "../seed-data/user.js";
import postsData from "../seed-data/item.js";

export async function seed(knex) {
  await knex("item").del();
  await knex("user").del();
  await knex("user").insert(usersData);
  await knex("item").insert(postsData);
}