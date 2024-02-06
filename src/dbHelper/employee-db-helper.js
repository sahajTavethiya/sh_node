const dbRequest = require('tedious').Request;
const dbDataType = require('tedious').TYPES
const util = require('../util/dbConstant').devEnv();


// module.exports.getTaskList= async function getTaskList(connection, data){
//     console.log("data",data);
//     console.log("getTaskList", "employee-db-helper.js for get task");
//     let taskDetails = {};
//     let resData = {};
//     try {
//       const result = await new Promise((resolve, reject) => {
//         let request = new dbRequest(util.EMPLOYEE.GET_TASK_LIST, (err, count, rows) => {
//           if (err) {
//             connection.close();
//             reject(err);
//           } else {
//             connection.close();
//             resolve(resData);
//           }
//         });
  
//         request.addParameter('UserId', dbDataType.Int, data.user_id);
//         // request.addParameter('Password', dbDataType.VarChar, data.Password);
//         // request.addOutputParameter('Status', dbDataType.Int);
//         // request.addOutputParameter('Msg', dbDataType.VarChar);
  
//     //     request.on('returnValue', (parameterName, value, metadata) => {
//     //       if (parameterName === 'Status') {
//     //           resData.statusCode = value;
//     //       }
//     //    //   Uncomment this section if 'Msg' is expected in the output
//     //       if (parameterName === 'MSG') {
//     //           resData.StatusDescription = value;
//     //       }
//     //     });
//         request.on('row',function(columns){
//               console.log("the req is on")
//           columns.forEach(function (column){
//              if(column.value === null){} else{
//                 taskDetails[column.metadata.colName] = column.value
//               }
//               resData.taskDetails = taskDetails;
//           });
//       });
//         connection.callProcedure(request);
//       });
  
//       return resData;
//     } catch (error) {
//       // Handle any errors that occur during the operation
//       console.error('Error in getTask:', error);
//       throw error;
//     }
//   }

  module.exports.getTaskList= async function getTaskList(connection, data){
    console.log("data",data);
    console.log("getTaskList", "employee-db-helper.js for get task");
    let taskDetails = {};
    let resData = {};
    try {
      const result = await new Promise((resolve, reject) => {
        let request = new dbRequest(util.EMPLOYEE.GET_TASK_LIST, (err, count, rows) => {
          if (err) {
            connection.close();
            reject(err);
          } else {
            connection.close();
            resolve(resData);
          }
        });
  
        request.addParameter('UserId', dbDataType.Int, data.user_id);
        // request.addParameter('Password', dbDataType.VarChar, data.Password);
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
              
          columns.forEach(function (column){
             if(column.value === null){} else{
                taskDetails[column.metadata.colName] = column.value
              }
              resData.taskDetails = taskDetails;
          })
      });
        connection.callProcedure(request);
      });
  
      return result;
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error('Error in getTask:', error);
      throw error;
    }
  }


  module.exports.getRemainingWorkOfTask= async function getTaskList(connection, data){
    console.log("data",data);
    console.log("remaining Work", "employee-db-helper.js for get task");
    let taskDetails = {};
    let resData = {};
    try {
      const result = await new Promise((resolve, reject) => {
        let request = new dbRequest(util.EMPLOYEE.GET_REMAINING_WORK, (err, count, rows) => {
          if (err) {
            connection.close();
            reject(err);
          } else {
            connection.close();
            resolve(resData);
          }
        });
  
        request.addParameter('TaskId', dbDataType.Int, data.taskId);
        // request.addParameter('Password', dbDataType.VarChar, data.Password);
        // request.addOutputParameter('Status', dbDataType.Int);
        // request.addOutputParameter('Msg', dbDataType.VarChar);
  
        request.on('returnValue', (parameterName, value, metadata) => {
          if (parameterName === 'Status') {
              resData.statusCode = value;
          }
       //   Uncomment this section if 'Msg' is expected in the output
          if (parameterName === 'MSG') {
              resData.StatusDescription = value;
          }
          if (parameterName === 'RemainingWork') {
            resData.RemainingWork = value;
        }
        });
        request.on('row',function(columns){
              console.log("the req is on")
          columns.forEach(function (column){
             if(column.value === null){} else{
                taskDetails[column.metadata.colName] = column.value
              }
              resData.taskDetails = taskDetails;
          });
      });
        connection.callProcedure(request);
      });
  
      return resData;
    } catch (error) {
      // Handle any errors that occur during the operation
      console.error('Error in getTask:', error);
      throw error;
    }
  }
