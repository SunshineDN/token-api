const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

module.exports = sequelize.define('Token', {
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  subdomain: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  client_id: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  client_secret: {
    type: DataTypes.STRING(80),
    allowNull: false
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'tokens',
});
