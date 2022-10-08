import Knex from "knex";

export const knex = Knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "37313159",
    database: "bank",
  },
  pool:{
    min:1,
    max:10
  }
});
