module.exports.devEnv =() =>{
    return {
        User :{
            CREATEUSER :'pi_CreateUser',
            USERLOGIN:'ps_userlogin',
            REMAININGAMT :'ps_getremainingAmt',
            CREATEPARTY :'pi_CreateParty',
            CREATEDRIVER : 'pi_createdriver',
            DRIVERLIST :'ps_getalldriver',
            DRIVERDELETE :'pd_deletedriver',
            PARTYLIST :'ps_getallparty',
            PARTYDELETE :'pd_deleteparty',
            PARTYREMAININGAMT :'ps_partyremainingAmt',
        },
        Business :{
            CREATEBUSINESS : 'pi_CreateBusiness',
        },
        Truck :{
            CREATETRUCK : 'pi_createTruck',
            LIST :'ps_getalltruck',
            DELETE :'pd_deletetruck'
        },
        Trip :{
            CREATETRIP : 'pi_createTrip',
            GETALLTRIPTYPE : 'ps_getalltriptype',
            GETALLTRIPSTATUS : 'ps_getalltripstatus',
            EDITTRIP : 'pu_editTrip',
            EDITTRIPSTATUS : 'pu_editTripStatus',
            DELETE : 'pd_deletetrip',
            GETALLTRIP :'ps_getalltrip',
            GETTRIPBYID :'ps_gettripbyId'

        },
        TRANSACTIONTYPE :{
            INCOMETYPELIST : 'ps_incometype_list',
            EXPENSETYPELIST : 'ps_expensetype_list',
            ADVANCETYPELIST : 'ps_advancetype_list'

        },
        TRANSACTION :{
            AddTRANSACTION : 'pi_transaction_add',
            ADDDOUBLETRANSACTION : 'pi_double_transaction_add',
            DELETETRANSACTION :'pd_deleteTransaction',
            GETALLTRANSACTION : 'ps_getAlltransactions'
        },
        ADMIN :{
            ADMIN_LOGIN : 'CheckUser',
            ADD_USER : 'AddUser',
            ADD_ORDER: 'AddOrder',
            ADD_CLIENT : 'AddClient',
            ADD_STOCK: 'AddStock',
            GET_ASSIGN_LIST_BY_ORDER_ID:'getAssignListByOrderId',
            ASSIGN_TASK : 'AssignTaskToEmployee',
            GET_NO_OF_PIECE_WANT_ASSIGN :'getNoOfPiecewantToAssign',
            GET_USER_REPORT : 'GetUserReport',
            GET_USER_DETAIL_BY_ID : 'getUserDetailById',
            GET_STOCK_REPORT_GRID :'GetStockReportGrid',
            ASSIGN_TASK_TO_MANAGER : 'getOrderListForAdminToAssignManager',
            ADD_SELL : 'AddSell',
            GET_LIST_FOR_SELL : 'getCurrentAvailableSellProdcuts',
            GET_SELL_LIST_FOR_GEID : 'GetSellListForGrid'
        },
        EMPLOYEE :{
            GET_TASK_LIST : 'getTaskList',
            SAVE_DAILY_WORK : 'saveDailyWorkStatus',
            GET_REMAINING_WORK : 'getRemainingTaskByTaskId'
        },
        MANAGER :{
            ADD_PRODUCTION : 'AddProduction',
            SAVE_DAILY_WORK : 'saveDailyWorkStatus',
            // Old (currently we are not using)
            ADD_SELLED_ITEMS :'AddSellIteams',
            ADD_SELL : 'AddSell',
            GET_ORDER_LIST_TO_ASSIGN_EMPLOYEE:'getOrderListToAssignEmployee',
            GET_TOTAL_SUBMIT_WORK_DETAIL:'getTotalSubmitWorkDetailByOrderId',
            GET_PRODUCTION_DATA :'getProductionDataFromOrderId',
            GET_DATA_FOR_SELLING_INVOICE :'getDataForMakeInvoiceForManufacture'
        },
        COMMON : {
         GET_BY_CATEGORY :'getLookUpMaster',
         ORDER_REPORT : 'getOrderReport',
         GET_ORDER_DETAIL : 'getOrderDetailById',
         GET_CLIENT_REPORT : 'getClientReportGrid',
        }   
    }
    };