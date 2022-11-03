const { Model, DataTypes, Sequelize } = require('sequelize');

// Nombre de la tabla
const ORDER_PRODUCT_TABLE = 'oders_products';

// Campos de la tabla
const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'orders',
      key: 'id',
    },
    onUpdate: ' CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: 'products',
      key: 'id',
    },
    onUpdate: ' CASCADE',
    onDelete: 'SET NULL',
  }
};

// este modelo tiene todas las formas/metodos con las/os que vamos a hacer las querys :D
// estatico significa que no necesito una declaracion para acceder a los metodos
class OrderProduct extends Model {
  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'OrderProduct',
      timestamps: false,
    };
  }
}

module.exports = { ORDER_PRODUCT_TABLE, OrderProductSchema, OrderProduct };
