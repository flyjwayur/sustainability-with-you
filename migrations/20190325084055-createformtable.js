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

exports.up = function(db, callback) {
  return db.createTable(
    'form_table',
    {
      id: { type: 'int', primaryKey: true, notNull: true, autoIncrement: true },
      word0: { type: 'string', length: 30, notNull: true },
      word1: { type: 'string', length: 30, notNull: true },
      word2: { type: 'string', length: 30, notNull: true },
      word3: { type: 'string', length: 30, notNull: true },
      word4: { type: 'string', length: 30, notNull: true },
      word5: { type: 'string', length: 30, notNull: true },
      word6: { type: 'string', length: 30, notNull: true },
      word7: { type: 'string', length: 30, notNull: true },
      word8: { type: 'string', length: 30, notNull: true },
      word9: { type: 'string', length: 30, notNull: true },
      age: { type: 'int', notNull: true },
      gender: { type: 'string', notNull: true },
      country_birth: { type: 'string', length: 50, notNull: true },
      country_residence: { type: 'string', length: 50, notNull: true },
    },
    callback
  );
};

exports.down = function(db, callback) {
  return db.dropTable('form_table', callback);
};

exports._meta = {
  version: 1,
};
