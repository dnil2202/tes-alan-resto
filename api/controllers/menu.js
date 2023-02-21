const e = require('cors');
const { FoodModel } =require('../model');
const { where } = require('sequelize');

module.exports={

    getDataFood : async (req,res)=>{
        try {
            let data = await FoodModel.findAll({
                where:{
                    isDelete:false
                }
            })
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    addFood : async (req,res)=>{
        let data = JSON.parse(req.body.data)
        try {
            await FoodModel.create({...data, img:`/img_food${req.files[0].filename}`})
            res.status(200).send({
                success:true,
                message:'Upload Success'
            })

        } catch (error) {
            res.status(500).send({
                success:false,
                message:'error Upload'
            })
            
        }
    },

    deleteFood : async (req,res)=>{
        try {
            await FoodModel.update(
                {isDelete:true},
                {where:{id:req.params.id}}
            )
            res.status(200).send({
                success:true,
                message:'Delete Success'
            })
        } catch (error) {
            res.status(500).send({
                success:false,
                message:'error Delete'
            })
        }
    }
};