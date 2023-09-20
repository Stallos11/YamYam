import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "recipe_ingredients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.collate('utf8mb4_bin')
      table.increments("id").primary();
      table.float("amount");
      table.string("unit");

      // Relations
      table.uuid("recipe_id").references("recipes.id").onDelete('cascade');
      table.uuid("ingredient_id").references("ingredients.id").onDelete('cascade');

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
