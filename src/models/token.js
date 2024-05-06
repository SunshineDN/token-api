import { DataTypes } from 'sequelize';
import { sequelize } from '../config/index.js';

export default sequelize.define('Token', {
  client_id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false
  },
  client_secret: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  token_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  redirect_uri: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expires_in: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'tokens',
});
