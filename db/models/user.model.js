const {Model, DataTypes, Sequelize} = require('sequelize');


const USER_TABLE = 'users';


const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,

  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    field: 'created_at',
  }
};

class UserModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: false,
      modelName: 'User',
    }
  }

  static associate(models) {
    // UserModel.hasMany(models.TaskModel, {
    //   foreignKey: 'userId',
    //   as: 'tasks',
    // });
  }


}


module.exports = {
  UserSchema,
  UserModel,
  USER_TABLE
}
