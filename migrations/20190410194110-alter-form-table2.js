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

let updateSQLString = 'UPDATE public.form_table2 SET ? = ? WHERE ? = ?';

exports.up = function(db) {
  // add int columns
  db.addColumn('form_table2', 'climate_int', { type: 'int' });
  db.addColumn('form_table2', 'human_int', { type: 'int' });
  // copy data to int columns
  db.runSql("UPDATE public.form_table2 SET climate_int = 1 WHERE climate = '1'");
  db.runSql("UPDATE public.form_table2 SET climate_int = 0 WHERE climate = '0'");
  db.runSql("UPDATE public.form_table2 SET human_int = 1 WHERE human = '1'");
  db.runSql("UPDATE public.form_table2 SET human_int = 0 WHERE human = '0'");
  // drop columns with string(varchar) type
  db.removeColumn('form_table2', 'climate');
  db.removeColumn('form_table2', 'human');
  // rename columns
  db.renameColumn('form_table2', 'climate_int', 'climate');
  db.renameColumn('form_table2', 'human_int', 'human');
  return null;
};

exports.down = function(db) {
  // add string columns
  // copy data to string columns
  // drop columns with int type
  // rename columns
  return null;
};

exports._meta = {
  version: 1,
};
