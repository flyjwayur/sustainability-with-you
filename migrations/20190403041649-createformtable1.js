'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('form_table1', {
    id: { type: 'int', primaryKey: true, notNull: true, autoIncrement: true },
    climate: { type: 'string', length: 30, notNull: true },
    human: { type: 'string', length: 30, notNull: true },
    equality: { type: 'string', length: 30, notNull: true },
    change: { type: 'string', length: 30, notNull: true },
    future: { type: 'string', length: 30, notNull: true },
    global: { type: 'string', length: 30, notNull: true },
    local: { type: 'string', length: 30, notNull: true },
    cancer: { type: 'string', length: 30, notNull: true },
    economy: { type: 'string', length: 30, notNull: true },
    knowledge: { type: 'string', length: 30, notNull: true },
    energy: { type: 'string', length: 30, notNull: true },
    internet: { type: 'string', length: 30, notNull: true },
    system: { type: 'string', length: 30, notNull: true },
    food: { type: 'string', length: 30, notNull: true },
    question: { type: 'string', length: 30, notNull: true },
    age: { type: 'int', notNull: true },
    gender: { type: 'string', notNull: true },
    country_birth: { type: 'string', length: 50, notNull: true },
    country_residence: { type: 'string', length: 50, notNull: true },
  });
};

exports.down = function(db) {
  return db.dropTable('form_table1');
};

exports._meta = {
  version: 1,
};
