const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, // Aca es de tipo uuid
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Este es para que se genere solito
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    plataformas: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fechaDeLanzamiento: { 
      type: DataTypes.DATE,
      allowNull: false 
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    created:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
   
  }, {timestamps: false});
};
