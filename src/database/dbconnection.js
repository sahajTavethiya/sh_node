'use strict'

// const { Connection } = require('tedious');

const Connection = require('tedious').Connection;

// const dbConfig = require("../../config/dbconf");
// const config = {
//     server: 'localhost,54880', // or the correct server name or IP address
//     authentication: {
//       type: 'ntlm', // Use 'ntlm' for Windows Authentication
//     },
//     options: {
//       database: 'shree hari enterprise',
//       encrypt: false, // Set to false if SSL is not configured on SQL Server
//     },
//   };
  
// let config = {
//     server :'localhost',// "192.168.104.234:1433",
//     authentication : {
//         type : 'default',
//         options : {
//             userName : 'sa' ,
//             password : '12345678'
//         }
//     },
//     options :{
//         "port": 1433,
//         database : "shree hari enterprise",
//         encrypt : false ,
//         "trustServerCertificate": true,
//         multiSubnetFailover : true ,
//         connectTimeout : 10000 ,
//         requestTimeout : 10000 , 
//         enableArithAbort : true 
//     }
// };

let config = {
    server : "",
    authentication : {
        type : 'default',
        options : {
            userName : '' ,
            password : ''
        }
    },
    options :{
        database : "",
        encrypt : false ,
        multiSubnetFailover : true ,
        connectTimeout : 10000 ,
        requestTimeout : 10000 , 
        enableArithAbort : true 
    }
};
// const tcpConfig = {
//     server: process.env.MSSQL_SERVER,
//     authentication: {
//       type: 'default',
//       options: {
//         userName: process.env.MSSQL_DBUSER,
//         password: process.env.MSSQL_DBPASS
//       }
//     },
//     options: {
//       encrypt: true, // Use encryption if necessary
//       database: process.env.MSSQL_DBNAME,
//      // port: 1433 , // Default SQL Server TCP port
//       multiSubnetFailover : true ,
//         connectTimeout : 10000 ,
//         requestTimeout : 10000 , 
//         enableArithAbort : true 
//     }
//   };

module.exports.getConnection = (DB_server , DB_user , DB_password , DB_name) =>{
    console.log("itd here")
    // config.server = DB_server ;
    // config.authentication.options.userName = DB_user;
    // config.authentication.options.password = DB_password;
    // config.options.database = DB_name;
try {
    const connect = new Connection(config);
    return new Promise(function (resolve , reject){
        console.time("DB connection initiated")
        connect.connect();
        connect.on('connect',function(err){
            if(err){
                console.log('DB Connection Error',err);
                reject(false)
            } else {
                // console.log('DB Connected Dharmesh',connect.state.name);
                console.log('DB Connected ',connect.state.name);
                resolve(connect)
            }
        });
        console.timeEnd('DB connection initiated');
    })
} catch (error) {
    console.log(error);
}

   
}
module.exports.getConnectionDefault = () =>{
    console.log(process.env.MSSQL_SERVER);
    config.server = process.env.MSSQL_SERVER ;
    config.authentication.options.userName = process.env.MSSQL_DBUSER;
    config.authentication.options.password = process.env.MSSQL_DBPASS;
    config.options.database = process.env.MSSQL_DBNAME;

try {
    const connect = new Connection(config);
    return new Promise(function (resolve , reject){
        console.time("DB connection initiated")
        connect.connect();
        connect.on('connect',function(err){
            if(err){
                console.log('DB Connection Error',err);
                reject(false)
            } else {
                // console.log('DB Connected Dharmesh',connect.state.name);
                console.log('DB Connected ',connect.state.name);
                resolve(connect)
            }
        });
        console.timeEnd('DB connection initiated');
    })
} catch (error) {
    console.log(error);
}

}