/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone_number").notNullable();
        table.string("password").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("item", (table) => {
        table.increments("id").primary();
        table.string("brand").notNullable();
        table.string("citizenship").notNullable();
        table.string("type").notNullable();
        table.string("nickname").notNullable();
        table.string("size").notNullable();
        table.string("photo").notNullable();
        table.string("birthdate").notNullable();
        table.string("address").notNullable();
        table.string("serial_num").notNullable();
        table.boolean("active").notNullable();
        table
          .integer("user_id")
          .unsigned()
          .references("user.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable("item").dropTable("user");
  }