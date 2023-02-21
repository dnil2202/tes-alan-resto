const { Sequelize } = require ('sequelize');
const { dbSeq } = require ('../config/sequilize');

const { DataTypes } = Sequelize;

const FoodModel = dbSeq.define('food_list',{
    name:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.STRING
    },
    img:{
        type:DataTypes.STRING(200)
    },
    isDelete:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    freezeTableName : true,
    timestamps:true,
    createdAt: false,
    updatedAt: false
}
);

module.exports = { FoodModel };

