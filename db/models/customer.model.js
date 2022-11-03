const {Model, DataTypes, Sequelize} = require('sequelize');

// Nombre de la tabla
const CUSTOMER_TABLE = 'customer';

// Campos de la tabla
const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  userId: {
    field: 'user_id',
    allowNull:false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: ' CASCADE',
    onDelete: 'SET NULL'
  }
}


// este modelo tiene todas las formas/metodos con las/os que vamos a hacer las querys :D
// estatico significa que no necesito una declaracion para acceder a los metodos
class Customer extends Model {
  static associate(models){
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {as: "orders", foreignKey: "customerId"})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'Customer',
      timestamps: false
    }
  }
}

module.exports = {CUSTOMER_TABLE, CustomerSchema, Customer}
