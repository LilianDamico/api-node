'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cadastros extends Model {
    static associate(models) {
      
    }
  }

  Cadastros.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255] 
      }
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        notEmpty: true,
        len: [11, 11], 
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        isEmail: true, 
        notEmpty: true
      }
    },
    registro: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isNumeric: true,
        len: [10, 11] 
      }
    },
    profissao: {
      type: DataTypes.STRING,
      allowNull: true
    },
    especialidade: {
      type: DataTypes.STRING,
      allowNull: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100] 
      }
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Cadastros', 
    tableName: 'Cadastros', 
    timestamps: true 
  });

  return Cadastros;
};
