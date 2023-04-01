const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('generos', {
    id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,

    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  }, {timestamps: false});
};