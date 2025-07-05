const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const registros = sequelize.define(
    'registros',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

fecha_hora: {
        type: DataTypes.DATE,

      },

tiempo_registrado: {
        type: DataTypes.INTEGER,

      },

cumplimiento: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

diferencia_tiempo: {
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

  registros.associate = (db) => {

    db.registros.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.registros.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return registros;
};

