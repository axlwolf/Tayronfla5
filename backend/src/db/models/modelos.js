const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const modelos = sequelize.define(
    'modelos',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

nombre: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  modelos.associate = (db) => {

    db.modelos.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.modelos.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return modelos;
};

