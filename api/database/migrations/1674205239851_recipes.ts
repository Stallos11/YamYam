import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "recipes";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("name");
      table.text("description");
      table.integer("preparation_time");
      table.integer("cooking_time");
      table.enum("difficulty", [1, 2, 3, 4, 5]).defaultTo(1).notNullable();
      table.integer("eaters_amount");

      // relations
      table.uuid("user_id").references("users.id");
      table.uuid("recipe_category").references("recipe_categories.id");
      table.uuid("recipe_type").references("recipe_types.id");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
