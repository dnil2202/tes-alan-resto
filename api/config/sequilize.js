const { Sequelize} = require('sequelize')

// Koneksi database

const dbSeq = new Sequelize({
    dialect:'mysql',
    host:process.env.DB_HOST,
    username:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD
    }
);

// cek Koneksi

const checkSeq = async()=>{
    try {
        await dbSeq.authenticate()
        console.log('Success Connect Database')
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    dbSeq,checkSeq
}