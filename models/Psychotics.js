const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our User model
class Psychotics extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Psychotics.init (
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    psycho: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Level: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newPsychoticsData) {
        newPsychoticsData.password = await bcrypt.hash(newPsychoticsData.password, 10);
        return newPsychoticsData;
      },
      async beforeUpdate(updatedPsychoticsData) {
        updatedPsychoticsData.password = await bcrypt.hash(updatedPsychoticsData.password, 10);
        return updatedPsychoticsData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,

    modelName: 'psychotics'
  }
);



module.exports = Psychotics;