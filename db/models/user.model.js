const {Model, DataTypes, Sequelize} = require('sequelize');

// Nombre de la tabla
const USER_TABLE = 'users';

// Campos de la tabla
const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}


// este modelo tiene todas las formas/metodos con las/os que vamos a hacer las querys :D
// estatico significa que no necesito una declaracion para acceder a los metodos
class User extends Model {
  static associate(models){
    this.hasOne(models.Customer, {as: 'customer', foreignKey: 'userId'});
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = {USER_TABLE, UserSchema, User}
