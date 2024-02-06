const e = require('express');

const dbRequest = require('tedious').Request;
const dbDataType = require('tedious').TYPES
const util = require('../util/dbConstant').devEnv();
const commonController = require('../module/common/controller/commonController')
module.exports.adminLogin= async function login(connection, data){
  console.log(data);
  console.log("login", "admin-db-helper.js for register new trip");
  let userDetails = {};
  let resData = {};
  try {
    const result = await new Promise((resolve, reject) => {
      let request = new dbRequest(util.ADMIN.ADMIN_LOGIN, (err, count, rows) => {
        if (err) {
          connection.close();
          reject(err);
        } else {
          connection.close();
          resolve(resData);
        }
      });

      request.addParameter('EmailId', dbDataType.VarChar, data.email);
      request.addParameter('Password', dbDataType.VarChar, data.password );
      request.addOutputParameter('Status', dbDataType.Int);
      request.addOutputParameter('Msg', dbDataType.VarChar);

      request.on('returnValue', (parameterName, value, metadata) => {
        if (parameterName === 'Status') {
            resData.statusCode = value;
        }
     //   Uncomment this section if 'Msg' is expected in the output
        if (parameterName === 'MSG') {
            resData.StatusDescription = value;
        }
      });
      request.on('row',function(columns){
            
        columns.forEach(function (column){
           if(column.value === null){} else{
            userDetails[column.metadata.colName] = column.value
            }
            resData.userDetails = userDetails;
        })
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
module.exports.addUser=async (connection , data)=>{

    // let db = await dbConnectHelper.getConnectionDefault();
    console.log(data);
    console.log("addUser","admin-db-helper.js for register new user");
    return new Promise((resolve , reject)=>{
        let request = new dbRequest(util.ADMIN.ADD_USER,function(err , count , rows ){
            if(err){
                //console.log(request);
                connection.close();
                reject(err);
            } else{
                connection.close();
                resolve(data)
            }
        });
        request.addParameter('UserId',dbDataType.Int , data.UserId);
        request.addParameter('FirstName',dbDataType.VarChar , data.Name);
        request.addParameter('LastName',dbDataType.VarChar , data.lastName);
        request.addParameter('EmailId',dbDataType.VarChar,data.EmailId);
        request.addParameter('Password',dbDataType.VarChar,data.Password);
        request.addParameter('RoleId',dbDataType.Int,data.RoleId);
        request.addParameter('BOD',dbDataType.DateTime,data.BirthDate);
        request.addParameter('IsActive',dbDataType.Bit,data.IsActive);
        // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
        request.addOutputParameter('Status', dbDataType.Int);
      request.addOutputParameter('Msg', dbDataType.VarChar);

        request.on('returnValue',function(parameterName , value , metadata){
            if (parameterName === 'Status') {
                data.statusCode = value;
              }
           //   Uncomment this section if 'Msg' is expected in the output
              if (parameterName === 'MSG') {
                data.StatusDescription = value;
              }
        })
        
        connection.callProcedure(request);
    })
}
module.exports.addOrder = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  console.log("addOrder","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.ADD_ORDER,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });

      
      
      request.addParameter('WorkTypeId',dbDataType.Int , data.WorkTypeId);
      request.addParameter('ClientId',dbDataType.Int , data.ClientId);
      request.addParameter('DesignId',dbDataType.Int,data.DesignId);
      request.addParameter('TotalItem',dbDataType.Int,data.TotalItem);
      request.addParameter('AmountPerOneItem',dbDataType.Int,data.AmountPerOneItem );
    //  request.addParameter('TotalAmount',dbDataType.Int,data.totalAmount);
      request.addParameter('ProductId',dbDataType.Int,data.ProductId);
      request.addParameter('HSN_Code',dbDataType.Int,data.HSN_Code);
      request.addParameter('BillNo',dbDataType.Int,data.BillNo);
      request.addParameter('ImageName',dbDataType.VarChar,data.ImageName || null);
      request.addParameter('SizeId',dbDataType.Int,data.SizeId);
      request.addParameter('StatusId',dbDataType.Int,data.StatusId);
      request.addParameter('Qty',dbDataType.VarChar,data.Qty);
      request.addParameter('UOM',dbDataType.Int,data.UOM);



      
      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);

      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
      })
      
      connection.callProcedure(request);
  })
}
module.exports.addClient = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  console.log("addOrder","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.ADD_CLIENT,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });

      
      
      request.addParameter('ClientName',dbDataType.VarChar , data.ClientName);
      request.addParameter('EmailId',dbDataType.VarChar , data.EmailId);
      request.addParameter('Mobile',dbDataType.VarChar,data.Mobile);
      request.addParameter('Address',dbDataType.VarChar,data.Address);
      request.addParameter('GST_No',dbDataType.VarChar,data.GST_No);
      request.addParameter('StateAndCode',dbDataType.VarChar,data.StateAndCode);


     
      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);

      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
      })
      
      connection.callProcedure(request);
  })
}
module.exports.assignTaskToEmployee = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  console.log("assignTask","admin-db-helper.js for add new Order");
  console.log("sahaj");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.ASSIGN_TASK,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });
      // request.addParameter('AssignToId',dbDataType.Int , data.assignToId);
      // request.addParameter('AssignById',dbDataType.Int , data.assignById);
      // request.addParameter('OrderId',dbDataType.Int,data.orderId);
      // request.addParameter('ProductId',dbDataType.Int,data.productId);
      // request.addParameter('SubProudctId',dbDataType.Int,data.subProudctId || null);
      // request.addParameter('AssignTotalPiece',dbDataType.Int,data.assignTotalPiece);
      // request.addParameter('WorkRatePerPiece',dbDataType.Int,data.workRatePerPiece || null);
      
       request.addParameter('AssignTaskTableType',dbDataType.TVP, AssignTask(data.AssignTaskTableType ));



      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);

      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
      })
      
      connection.callProcedure(request);
  })
}
function AssignTask(data){

    let tdata = [];
    // data.forEach
    data.forEach(ele => {
        tdata.push([ele.tblId,ele.assignToId , ele.assignById , ele.orderId , ele.productId ,
            ele.assignTotalPiece,ele.workRatePerPiece,ele.isDelete]);
    });
    var table_details = {'Columns':[
      {'name' :'TblId','type':dbDataType.Int},
        {'name' :'AssignToId','type':dbDataType.Int},
        {'name' :'AssignById','type':dbDataType.Int},
        {'name' :'OrderId','type':dbDataType.Int},
        {'name' :'ProductId','type':dbDataType.Int},
        {'name' :'AssignTotalPiece','type':dbDataType.Int},
        {'name' :'WorkRatePerPiece','type':dbDataType.Int},
        {'name' :'IsDelete','type':dbDataType.Int}

    ]}
    var table = {
        columns : table_details['Columns'],
        rows : tdata
    }
    return table;
  }
module.exports.getNoOfPiecewantToAssign = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  console.log("assignTask","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.GET_NO_OF_PIECE_WANT_ASSIGN,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });

      request.addParameter('UserId',dbDataType.Int , data.user_id);
      request.addParameter('OrderId',dbDataType.Int , data.orderId);
      request.addParameter('RoleId',dbDataType.Int , data.roleId);

      
      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);
    request.addOutputParameter('AvailableItem', dbDataType.Int);
      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
            if (parameterName === 'AvailableItem') {
              data.AvailableItem = value;
            }
      })
      
      connection.callProcedure(request);
  })
}

module.exports.addStock = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  let userDetails = {};
  let resData = {};
  try{
  console.log("addStock","admin-db-helper.js for add new stock");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.ADD_STOCK,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
      request.on('row',function(columns){
            
        columns.forEach(function (column){
           if(column.value === null){} else{
            userDetails[column.metadata.colName] = column.value
            }
            resData.userDetails = userDetails;
        })
    });
      
      
      request.addParameter('StockItemId',dbDataType.Int , data.StockItemId);
      request.addParameter('NoOfItem',dbDataType.Int , parseInt(data.NoOfItem));
      request.addParameter('Rate',dbDataType.Float,parseFloat(data.Rate));
      request.addParameter('SizeId',dbDataType.Int,data.SizeId);   
      request.addParameter('ColourId',dbDataType.Int,data.ColourId);      
      request.addParameter('MeterPerItem',dbDataType.Int,data.MeterPerItem);      

      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('MSG', dbDataType.VarChar);

      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }

      })
      
      connection.callProcedure(request);

  });
} catch (error) {
  // Handle any errors that occur during the operation
  console.error('Error in login:', error);
  throw error;
}
}
module.exports.getAssignListByOrderId = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  let userDetails = {};
  let resData = [];
  try{
  console.log("getAssignListByOrderId","admin-db-helper.js for add new stock");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.GET_ASSIGN_LIST_BY_ORDER_ID,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
      request.on('row',function(columns){
        let reportDetails = {};
    columns.forEach(function (column){
      
       if(column.value === null){} else{
        
        reportDetails[column.metadata.colName] = column.value
        }
        
    })
    resData.push(reportDetails);
});
      
      request.addParameter('UserId',dbDataType.Int , data.user_id);
      request.addParameter('OrderId',dbDataType.Int , data.OrderId);


      // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
    //   request.addOutputParameter('Status', dbDataType.Int);
    // request.addOutputParameter('MSG', dbDataType.VarChar);

    //   request.on('returnValue',function(parameterName , value , metadata){
    //       if (parameterName === 'Status') {
    //           data.statusCode = value;
    //         }
    //      //   Uncomment this section if 'Msg' is expected in the output
    //         if (parameterName === 'MSG') {
    //           data.StatusDescription = value;
    //         }

    //   })
      
      connection.callProcedure(request);

  });
} catch (error) {
  // Handle any errors that occur during the operation
  console.error('Error in login:', error);
  throw error;
}
}
module.exports.OrderReport = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("OrderReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.COMMON.ORDER_REPORT,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });

      request.addParameter('WorkTypeId',dbDataType.VarChar , commonController.arrayToCommaSeparatedString(data.workTypeId));
      request.addParameter('DesignIds',dbDataType.VarChar ,commonController.arrayToCommaSeparatedString(data.designId));
      request.addParameter('ClientIds',dbDataType.VarChar,commonController.arrayToCommaSeparatedString(data.clientId));
      request.addParameter('ProductIds',dbDataType.VarChar,commonController.arrayToCommaSeparatedString(data.productId));
      request.addParameter('BillNo',dbDataType.VarChar,data.billNo);      
      request.addParameter('StatusIds',dbDataType.VarChar,commonController.arrayToCommaSeparatedString(data.statusId));
      request.addParameter('FromDate',dbDataType.DateTime,data.fromDate);
      request.addParameter('ToDate',dbDataType.DateTime,data.toDate);      


  //     // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
  //   //   request.addOutputParameter('Status', dbDataType.Int);
  //   // request.addOutputParameter('Msg', dbDataType.VarChar);

  //     // request.on('returnValue',function(parameterName , value , metadata){
  //     //     if (parameterName === 'Status') {
  //     //         data.statusCode = value;
  //     //       }
  //     //    //   Uncomment this section if 'Msg' is expected in the output
  //     //       if (parameterName === 'MSG') {
  //     //         data.StatusDescription = value;
  //     //       }
  //     // })
      request.on('row',function(columns){
            console.log("its here 123",columns)
            let reportDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            reportDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(reportDetails);
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

module.exports.GetOrderDetailById = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("OrderReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.COMMON.GET_ORDER_DETAIL,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });

      
      
      request.addParameter('OrderId',dbDataType.Int , data.OrderId);

      request.on('row',function(columns){
            let reportDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            reportDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(reportDetails);
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

module.exports.getClientReport = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("OrderReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.COMMON.GET_CLIENT_REPORT,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });

      
      
     // request.addParameter('OrderId',dbDataType.Int , data.OrderId);

      request.on('row',function(columns){
            let reportDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            reportDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(reportDetails);
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

module.exports.UserReport = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("UserReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      console.log("sahaj123")
      let resData = [];
          let request = new dbRequest(util.ADMIN.GET_USER_REPORT,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
     // request.addParameter('OrderId',dbDataType.Int , data.OrderId);

      request.on('row',function(columns){
            let reportDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            reportDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(reportDetails);
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
module.exports.GetUserDetailById = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("GetUserDetailById","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.ADMIN.GET_USER_DETAIL_BY_ID,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
     request.addParameter('UserId',dbDataType.Int , data.UserId);

      request.on('row',function(columns){
            let userDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            userDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(userDetails);
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
module.exports.GetStockReport = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("StockReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.ADMIN.GET_STOCK_REPORT_GRID,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
     // request.addParameter('OrderId',dbDataType.Int , data.OrderId);

      request.on('row',function(columns){
            let reportDetails = {};
        columns.forEach(function (column){
          
           if(column.value === null){} else{
            
            reportDetails[column.metadata.colName] = column.value
            }
            
        })
        resData.push(reportDetails);
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

module.exports.getOrderListForAdminToAssignManager = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("StockReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.ADMIN.ASSIGN_TASK_TO_MANAGER,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });
      request.addParameter('UserId',dbDataType.Int , data.user_id);

      request.on('row',function(columns){
            let reportDetails = {};
        columns.forEach(function (column){
           if(column.value === null){} else{
            reportDetails[column.metadata.colName] = column.value
            }
        })
        resData.push(reportDetails);
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

module.exports.AddSell = async (connection , data)=>{
  console.log("addSell","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.ADD_SELL,function(err , count , rows ){
          if(err){
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });        
      request.addParameter('CustomerName',dbDataType.VarChar , data.CustomerName);
      request.addParameter('SellingTableType',dbDataType.TVP , saveSell(data.SellingTableType));
      request.addParameter('EmailId',dbDataType.VarChar,data.EmailId);
      request.addParameter('Address',dbDataType.VarChar,data.Address);
      request.addParameter('Mobile',dbDataType.VarChar,data.Mobile);
      request.addParameter('GST_No',dbDataType.Int,data.GST_No);
      request.addParameter('StateAndCode',dbDataType.VarChar,data.StateAndCode);
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);

      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
      })
      
      connection.callProcedure(request);
  })
}

function saveSell(data){

  let tdata = [];
  // data.forEach
  data.forEach(ele => {
      tdata.push([ele.tblId,ele.sellingMaterId , ele.hsn_Code , ele.qty , ele.workRatePerPiece ,
         ele.completedByEmployee, ele.note,ele.isDelete]);
  });
  var table_details = {'Columns':[
    {'name' :'TblId','type':dbDataType.Int},
      {'name' :'SellingMaterId','type':dbDataType.Int},
      {'name' :'HSN_Code','type':dbDataType.Int},
      {'name' :'Qty','type':dbDataType.Int},
      {'name' :'Rate','type':dbDataType.Decimal(10,2)},
      {'name' :'ProductId','type':dbDataType.Bit},
      {'name' :'DesignId','type':dbDataType.VarChar},
      {'name' :'ColourId','type':dbDataType.Int},
      {'name' :'SizeId','type':dbDataType.Int},
      {'name' :'IsGst','type':dbDataType.Int},
      {'name' :'IsDelete','type':dbDataType.Int}
  ]}
  var table = {
      columns : table_details['Columns'],
      rows : tdata
  }
  return table;
}

module.exports.getCurrentAvailableSellProdcuts = async (connection , data)=>{
  let resData = []
  console.log("getCurrentAvailableSellProdcuts","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.GET_LIST_FOR_SELL,function(err , count , rows ){
          if(err){
              connection.close();
              reject(err);
          } else{
              connection.close();
              data.listData = resData;
              resolve(data)
          }
      });
      request.on('row',function(columns){
        let userDetails = {};
    columns.forEach(function (column){
      
       if(column.value === null){} else{
        
        userDetails[column.metadata.colName] = column.value
        }
        
    })
    resData.push(userDetails);
});
      connection.callProcedure(request);
  })
}

module.exports.GetSellListForGrid = async (connection , data)=>{
  let resData = []
  console.log("GetSellListForGrid","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.ADMIN.GET_SELL_LIST_FOR_GEID,function(err , count , rows ){
          if(err){
              connection.close();
              reject(err);
          } else{
              connection.close();
              data.listData = resData;
              resolve(data)
          }
      });
      request.on('row',function(columns){
        let userDetails = {};
    columns.forEach(function (column){
      
       if(column.value === null){} else{
        
        userDetails[column.metadata.colName] = column.value
        }
        
    })
    resData.push(userDetails);
});
      connection.callProcedure(request);
  })
}
