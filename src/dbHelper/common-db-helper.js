const dbRequest = require('tedious').Request;
const dbDataType = require('tedious').TYPES
const util = require('../util/dbConstant').devEnv();

module.exports.getByCategory= async function login(connection, data){
    console.log(data);
    let category_STR = data.categories.join(',').toString();
    console.log("this is a string",category_STR);
    console.log("login", "common-db-helper.js for register new trip");
   
    let resData = [];
    try {
      const result = await new Promise((resolve, reject) => {
        let request = new dbRequest(util.COMMON.GET_BY_CATEGORY, (err, count, rows) => {
          if (err) {
            connection.close();
            reject(err);
          } else {
            connection.close();
            resolve(resData);
          }
        });
  
        request.addParameter('CategoryName', dbDataType.VarChar, category_STR);
        // request.addParameter('Password', dbDataType.VarChar, data.password );
        // request.addOutputParameter('Status', dbDataType.Int);
        // request.addOutputParameter('Msg', dbDataType.VarChar);
  
    //     request.on('returnValue', (parameterName, value, metadata) => {
    //       if (parameterName === 'Status') {
    //           resData.statusCode = value;
    //       }
    //    //   Uncomment this section if 'Msg' is expected in the output
    //       if (parameterName === 'MSG') {
    //           resData.StatusDescription = value;
    //       }
    //     });
        request.on('row',function(columns){
            let userDetails = {};
          columns.forEach(function (column){
          //  console.log(column);
             if(column.value === null){} else{
              userDetails[column.metadata.colName] = column.value
              }
              
          })
          resData.push(userDetails) ;
      });
        connection.callProcedure(request);
      });
  
      return result;
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error('Error in login:', error);
      throw error;
    }
  }