import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "ingredients";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").primary();
      table.string("openfoodfact_id").notNullable();
      table.text("product_name", "longtext").notNullable();
      table.float("kcal").notNullable();
      table.float("fat").notNullable();
      table.float("saturated_fat").notNullable();
      table.float("carbohydrates").notNullable();
      table.float("sugars").notNullable();
      table.float("proteins").notNullable();
      table.float("salt").notNullable();
      table.text("img", 'longtext').notNullable();

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
