const knex = require('knex');
exports.up = async(knex) => {
  await knex.schema.createTable('Account', (table) => {
    table.increments().notNullable();
    table.string('email',254).notNullable().unique();
    table.string('name').notNullable();
    table.string('password').notNullable();

  });
  await knex.schema.createTable('Record', (table) => {
    table.increments().notNullable();
    table.float('amount');
    table.string('type');
    table.string('category')
    table.string('description')
    table.timestamps(false, true);
    table.integer('Account_id').unsigned().references('id').inTable('Record')
  });
};

exports.down = async(knex) => {
  await knex.schema.dropTable('Record');
  await knex.schema.dropTable('Account');
};
