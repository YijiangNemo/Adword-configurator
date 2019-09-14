const Sequelize = require('sequelize');
const db = require('../models/index')


db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        // console.log(typeof db.Configurator)
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


const sql_OP={
    findbyId: function (id) {
        return new Promise((resolve, reject) => {
            let res_data;
            let res_status;
            let res_msg;
            let query={}
            if(id){
                query.id = id
            }
            db.Configurator.findAll({
                where: query,
                raw : true
            }).then(res=>{
                res_data = res
                res_status = 200;
                res_msg = 'found'
                resolve({data: res_data, status: res_status, msg: res_msg})
            }).catch(e=>{
                console.log(e)
                res_data = []
                res_status = 500;
                res_msg = e.message
                reject({data: res_data, status: res_status, msg: res_msg})
            })
        })

    },
    addSettings: function (data) {

        return new Promise((resolve, reject) => {
            let res_data;
            let res_status;
            let res_msg;
            db.Configurator.create(data).then(res=>{
                res_data = res.dataValues
                res_status = 200;
                res_msg = 'update success'
                resolve({data: res_data, status: res_status, msg: res_msg})
            }).catch(e=>{
                console.log(e)
                res_data = []
                res_status = 500;
                res_msg = e.message
                reject({data: res_data, status: res_status, msg: res_msg})
            })
        })
    },
    updateSettings: function (id,data) {

        return new Promise((resolve, reject) => {
            let res_data;
            let res_status;
            let res_msg;
            db.Configurator.update(data,{
                where: {
                    id: id
                }
            }).then(res=>{
                console.log(res)
                if(res[0]!==0){
                    db.Configurator.findAll({
                        where: {id:id},
                        raw : true
                    }).then(res=>{
                        console.log(res)
                        res_data = res[0]
                        res_status = 201;
                        res_msg = 'update success'
                        resolve({data: res_data, status: res_status, msg: res_msg})
                    }).catch(e=>{
                        console.log(e)
                        res_data = []
                        res_status = 500;
                        res_msg = e.message
                        reject({data: res_data, status: res_status, msg: res_msg})
                    })
                }
                else {
                    res_data = res
                    res_status = 404;
                    res_msg = 'not found'
                    reject({data: res_data, status: res_status, msg: res_msg})
                }


            }).catch(e=>{
                res_data = []
                res_status = 500;
                res_msg = e.message
                reject({data: res_data, status: res_status, msg: res_msg})
            })
        })
    },
}

module.exports = sql_OP;
