const dbRequest = require('tedious').Request;
const dbDataType = require('tedious').TYPES
const util = require('../util/dbConstant').devEnv();
module.exports.saveDailyWork = async (connection , data)=>{

    // let db = await dbConnectHelper.getConnectionDefault();
    console.log("its here",data);
    console.log("saveDailyWork","admin-db-helper.js for add new Order");
    return new Promise((resolve , reject)=>{
        let request = new dbRequest('saveDailyWorkStatus',function(err , count , rows ){
            if(err){
                //console.log(request);
                connection.close();
                reject(err);
            } else{
                connection.close();
                resolve(data)
            }
        });        
       // request.addParameter('UserId',dbDataType.Int , data.employeeId);
        request.addParameter('OrderId',dbDataType.Int , data.OrderId);
        request.addParameter('DailyWorkTable',dbDataType.TVP , saveDailyWork(data.DailyWorkBasicDetail.DailyWorkBasicDetail));
     //   request.addParameter('TotalCompeletePiece',dbDataType.Int,data.totalCompeletePiece);
     //   request.addParameter('Notes',dbDataType.VarChar,data.notes);
        request.addParameter('ManagerBy',dbDataType.Int,data.user_id);
     //   request.addParameter('CompletedByEmployee',dbDataType.Bit,data.completedByEmployee);

        // request.addParameter('vchrAddress',dbDataType.VarChar , data.address);
        request.addOutputParameter('Status', dbDataType.Int);
      request.addOutputParameter('Msg', dbDataType.VarChar);
      request.addOutputParameter('RemainingWork', dbDataType.Int);
  
        request.on('returnValue',function(parameterName , value , metadata){
            if (parameterName === 'Status') {
                data.statusCode = value;
              }
           //   Uncomment this section if 'Msg' is expected in the output
              if (parameterName === 'MSG') {
                data.StatusDescription = value;
              }
              if (parameterName === 'RemainingWork') {
                data.remainingWork = value;
              }
        })
        
        connection.callProcedure(request);
    })
}
// -- for work type - 2 manufacturing
module.exports.addProduction = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log("its here",data);
  console.log("Add Production","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.MANAGER.ADD_PRODUCTION,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });        
      request.addParameter('ManagerId',dbDataType.Int , data.user_id);
      request.addParameter('OrderId',dbDataType.Int , data.orderId);
      request.addParameter('ProductionTableType',dbDataType.TVP , AddProduction(data.ManufacturedProduct));
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

function AddProduction(data){

  let tdata = [];
  // data.forEach
  data.forEach(ele => {
      tdata.push([ele.tblId, ele.productId , ele.designId , ele.noOfPiece , ele.sizeId , ele.colourId,ele.isDelete]);
  });
  var table_details = {'Columns':[
    {'name' :'TblId','type':dbDataType.Int},
      {'name' :'ProductId','type':dbDataType.Int},
      {'name' :'DesignId','type':dbDataType.Int},
      {'name' :'NoOfPiece','type':dbDataType.Int},
      {'name' :'SizeId','type':dbDataType.Int},
      {'name' :'ColourId','type':dbDataType.Int},
      {'name' :'IsDelete','type':dbDataType.Bit}

  ]}
  var table = {
      columns : table_details['Columns'],
      rows : tdata
  }
  return table;
}

function AddSellTableType(data){

  let tdata = [];
  // data.forEach
  data.forEach(ele => {
      tdata.push([ele.tblId, ele.sellingMaterId , ele.hsn_Code , ele.qty , ele.rate , ele.productId,ele.designId,
      ele.colourId,ele.sizeId,ele.isGst,ele.isDelete]);
  });
  var table_details = {'Columns':[
    {'name' :'TblId','type':dbDataType.Int},
      {'name' :'SellingMaterId','type':dbDataType.Int},
      {'name' :'HSN_Code','type':dbDataType.Int},
      {'name' :'Qty','type':dbDataType.Int},
      {'name' :'Rate','type':dbDataType.Money},
      {'name' :'ProductId','type':dbDataType.Int},
      {'name' :'DesignId','type':dbDataType.Int},
      {'name' :'ColourId','type':dbDataType.Int},
      {'name' :'SizeId','type':dbDataType.Int},
      {'name' :'IsGst','type':dbDataType.Bit},
      {'name' :'IsDelete','type':dbDataType.Bit}
  ]}
  var table = {
      columns : table_details['Columns'],
      rows : tdata
  }
  return table;
}
module.exports.addSell = async (connection , data)=>{
try {
  
  // let db = await dbConnectHelper.getConnectionDefault();
  console.log("its here",data);
  console.log("Add Sell","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.MANAGER.ADD_SELL,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(data)
          }
      });        
      request.addParameter('CustomerName',dbDataType.VarChar , data.customerName);
      request.addParameter('EmailId',dbDataType.VarChar , data.emailId);
      request.addParameter('Address',dbDataType.VarChar , data.address);
      request.addParameter('Mobile',dbDataType.VarChar , data.mobile);
      request.addParameter('GST_No',dbDataType.VarChar , data.gstNo);
      request.addParameter('IsGst',dbDataType.Int , data.isGst);
      request.addParameter('StateAndCode',dbDataType.VarChar , data.stateAndCode);
      request.addParameter('SellingTableType',dbDataType.TVP , AddSellTableType(data.sellingTableType));
      request.addOutputParameter('Status', dbDataType.Int);
    request.addOutputParameter('Msg', dbDataType.VarChar);
      request.addOutputParameter('SellMasterTblId',dbDataType.Int);
      request.on('returnValue',function(parameterName , value , metadata){
          if (parameterName === 'Status') {
              data.statusCode = value;
            }
         //   Uncomment this section if 'Msg' is expected in the output
            if (parameterName === 'MSG') {
              data.StatusDescription = value;
            }
            if (parameterName === 'SellMasterTblId') {
              data.SellingMasterId = value;
            }
      })
      
      connection.callProcedure(request);
  })
  
} catch (error) {
  console.log("error1",error);
}
}
module.exports.getProductionDataFromOrderId = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log("its here",data);
  let resData = [];
  console.log("Get Production Data","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.MANAGER.GET_PRODUCTION_DATA,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              resolve(resData)
          }
      });        
      request.addParameter('OrderId',dbDataType.Int , data.orderId);


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
  })
}

function saveDailyWork(data){

  let tdata = [];
  // data.forEach
  data.forEach(ele => {
      tdata.push([ele.tblId,ele.assignTaskMasterId , ele.userId , ele.completePiece , ele.workRatePerPiece ,
         ele.completedByEmployee, ele.note,ele.isDelete]);
  });
  var table_details = {'Columns':[
    {'name' :'TblId','type':dbDataType.Int},
      {'name' :'AssignTaskMasterId','type':dbDataType.Int},
      {'name' :'UserId','type':dbDataType.Int},
      {'name' :'CompletePiece','type':dbDataType.Int},
      {'name' :'WorkRatePerPiece','type':dbDataType.Int},
      {'name' :'CompletedByEmployee','type':dbDataType.Bit},
      {'name' :'Note','type':dbDataType.VarChar},
      {'name' :'IsDelete','type':dbDataType.Int},
  ]}
  var table = {
      columns : table_details['Columns'],
      rows : tdata
  }
  return table;
}

module.exports.addSelledProduct = async (connection , data)=>{
  console.log("addSelledProduct","admin-db-helper.js for add new Order");
  return new Promise((resolve , reject)=>{
      let request = new dbRequest(util.MANAGER.ADD_SELLED_ITEMS,function(err , count , rows ){
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
      request.addParameter('ProductionId',dbDataType.Int , data.ProductionId);
      request.addParameter('sellPieces',dbDataType.Int , data.sellPieces);
      request.addParameter('AmountPerPiece',dbDataType.Int , data.AmountPerPiece);
      request.addParameter('IsGst',dbDataType.Int,data.IsGst);
      request.addParameter('BillNo',dbDataType.Int,data.BillNo);

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
module.exports.getDataForMakeInvoiceForManufacture = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  let customerData =[];
    let productData =[];
  let resData = [];
  console.log("StockReport","admin-db-helper.js for add new stock");
  let errorMSG = null
  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
      
          let request = new dbRequest(util.MANAGER.GET_DATA_FOR_SELLING_INVOICE,function(err , count , rows ){
          if(err){
              //console.log(request);
              connection.close();
              reject(err);
          } else{
              connection.close();
              data.customerData = customerData;
              data.productData = productData;
              data.error = errorMSG;
              resolve(data)
          }
      });
      request.addParameter('SellingMasterId',dbDataType.Int , data.SellingMasterId);

      let val = false ;
      let i = 0;
      request.on('row',function(columns){
          let userDetails = {};
          i = 0;
          columns.forEach(function (column){
              i++;
             if(column.value === null){} else{
              if(i == 1){
                  if(column.metadata.colName == 'CustomerName'){
                      val = true ;
                  }
                  else
                  {
                      val = false ;
                  }
              }
              userDetails[column.metadata.colName] = column.value
              //console.log(column.value);
              }
              // data.userDetails = userDetails;
          })
          console.log(userDetails);
          if(val){
            customerData.push(userDetails);
          }
          else
          productData.push(userDetails);
      });
      connection.callProcedure(request);
    });

    return result;
  } catch (error) {
    // Handle any errors that occur during the operation
    errorMSG = error.massage
    console.error('Error in login:', error);
    throw error;
  }
}
module.exports.getOrderListToAssignEmployee = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("StockReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.MANAGER.GET_ORDER_LIST_TO_ASSIGN_EMPLOYEE,function(err , count , rows ){
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
module.exports.getTotalSubmitWorkDetailByOrderId = async (connection , data)=>{

  // let db = await dbConnectHelper.getConnectionDefault();
  console.log(data);
  
  let resData = [];
  console.log("StockReport","admin-db-helper.js for add new stock");

  try {
    const result = await new Promise((resolve, reject) => {
      let resData = [];
          let request = new dbRequest(util.MANAGER.GET_TOTAL_SUBMIT_WORK_DETAIL,function(err , count , rows ){
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