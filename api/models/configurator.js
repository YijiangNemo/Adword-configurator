'use strict';
module.exports = (sequelize, DataTypes) => {
  const Configurator = sequelize.define('Configurator', {
    timeSetting: DataTypes.JSON,
    keywords: DataTypes.JSON,
    sites: DataTypes.JSON
  }, {});
  Configurator.associate = function(models) {
    // associations can be defined here
  };
  return Configurator;
};
