import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "instructions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("title");
      table.integer("order");
      table.text("description", "longtext");

      // Relations
      table.uuid("recipe_id").references("recipes.id").onDelete('cascade');

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
