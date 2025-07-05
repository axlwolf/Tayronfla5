const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const configuraciones = sequelize.define(
    'configuraciones',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

tiempo_objetivo: {
        type: DataTypes.INTEGER,

      },

tiempo_luz_amarilla: {
        type: DataTypes.INTEGER,

      },

tiempo_luz_roja: {
        type: DataTypes.INTEGER,

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

  configuraciones.associate = (db) => {

    db.configuraciones.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.configuraciones.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return configuraciones;
};

