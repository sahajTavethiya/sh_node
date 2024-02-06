
let commonFunctions = require('../commonFunctions');
// const request = require('request');
const encryption = require('../request_process');



validateDAToken = async (req , res , next)=>{
    let datoken = req.headers.daauthorization;
    console.log(req.headers.daauthorization);
    if(!datoken){
        return res.status(403).send({
            message: "Invalid Domain Access!"
          }); 
    }
    let response = await commonFunctions.validateAccessTokenForDA(datoken);
    console.log(response);
    if(response?.code == "INVALID_ACCESS_TOKEN")
    {
        return res.status(403).send({
            message: "Invalid Domain Token or Token Expired!"
        });
    }else{
        if(response){
            req.body.dakey = response.dakey;
            req.body.databaseObj = undefined;//getDaFromArray(response.dakey);
            console.log("database from Local -",req.body.databaseObj);
            if(req.body.databaseObj == undefined){
                
                const mongoHelper = require("../../Database/mongodb-helper");
                let databaseAccess = await mongoHelper.getDatabaseAccessFromDA(response.dakey);
                if(databaseAccess != false ){
                    req.body.databaseObj = databaseAccess;
                    // DomainDataArray.push(databaseAccess);// to use for further request.
                }
                else{
                    return res.status(403).send({
                        message: "Invalid Domain Token or Token Expired!"
                    }); 
                }
            }
            next();
        }
        else{
            //next();
            return res.status(403).send({
                message: "Invalid Domain Token or Token Expired!"
            });
        }
    }
}

verifyUserToken = async (req , res , next) =>{
    let token = req.headers.authorization;//req.headers["x-access-token"];
    //console.log(req.headers.authorization);
    if (!token) {
        return res.status(403).send({
          message: "No token provided!"
        });
    }
   let response = await commonFunctions.validateAccessToken(token);
    console.log("Check")
   console.log("this is a validate token",response);
//    console.log("Check")

   if(response && response.code == "INVALID_ACCESS_TOKEN")
   {
    return res.status(403).send({
        message: "Invalid Token or Token Expired!"
      });
   }
   else
    if(response){
        req.body.user_id = response.user_id;
        req.body.roleId = response.RoleId;
        next();
    }
    else{
        next();
    }
}
ifverifyUserToken = async (req , res , next) =>{
    let token = req.headers.authorization || "unknown";//req.headers["x-access-token"];
    console.log(req.headers.authorization);
    console.log(token);
    if (token == "unknown" ) {
        req.headers.authorization =  token;
        // return res.status(403).send({
        //   message: "No token provided!"
        // });
        next();
        
    }
    else{
        let response = await commonFunctions.validateAccessToken(token);
        console.log(response);
         if(response){
             req.body.user_id = response.userid;
             next();
         }
         else{
             next();
         }
    }
}
checkIPLocation = async(req , res , next)=>{
    // request()
    // const IP = require('ip');
    // const ipAddress = IP.address();
    const ipAddress = req.header('x-forwarded-for') ||  req.socket.remoteAddress;
    // console.log("Requested IP Address",ipAddress);
    // console.log("http://ip-api.com/json/"+ipAddress);
    req.body.IP = ipAddress;
    req.body.country = req.body.country || req.query.country ;
    // console.log("req body",req.body);
    next();
    // request("http://ip-api.com/json"+ipAddress ,async (err , respo)=>{
    //     req.body.IP = ipAddress;
    //     console.log("IP data",respo.body)
    //     console.log("IP Website",respo.statusCode);
        
    //     // console.log(JSON.parse(respo));
    //     // if(respo.statusCode == 200){
    //     //     console.log(JSON.parse(respo.body));
    //     //     req.body.country = JSON.parse(respo.body).country_name;
    //     // }
    //     // else{
    //         req.body.country = "UNKNOWN";
    //     // }
    //     //{"callingCode":"91","city":"Surat","countryCapital":"New Delhi","country_code":"IN","country_name":"India","currency":"INR","currencySymbol":"₹","emojiFlag":"🇮🇳","flagUrl":"https://ip-api.io/images/flags/in.svg","ip":"103.218.110.31","is_in_european_union":false,"latitude":21.1888,"longitude":72.8293,"metro_code":0,"organisation":"Soft World Infonet","region_code":"GJ","region_name":"Gujarat","suspiciousFactors":{"isProxy":false,"isSpam":false,"isSuspicious":false,"isTorNode":false},"time_zone":"Asia/Kolkata","zip_code":"395007"}
        
       
    // })
}
validateRequest = async(req ,res , next)=>{
    if(req.query.debug){}else{
    encryption.decrypt(req.body.data, function (decryptresponse) {
                let decryptbody = JSON.parse(decryptresponse);
                req.body = decryptbody;
            })
    }
    next();
}
convert_Ency = async (req , res)=>{
    if(req.query.convertTo == "dec"){
        let crString = req.body.data;
        // console.log(crString);
        encryption.decrypt(crString, function (decryptresponse) {
            let decryptbody = JSON.parse(decryptresponse);
            req.body = decryptbody;
            res.status(200).send({mst : "enc data done.",data : decryptbody});
        })
    }
    else if(req.query.convertTo == "enc"){
        let crString = JSON.stringify(req.body.data);
        encryption.encrypt(crString, function (decryptresponse) {
            res.status(200).send({mst : "dec data done.",data : decryptresponse});
        })
    }
}

function getDaFromArray(dakey){
    // return new Promise((resolve , reject)=>{
        let arLenth = DAArray .length;
        let ifFound = false ;
        let i = 0;
        if(arLenth == 0){
            return undefined;
        }
        DomainDataArray.forEach((element)=>{
            i++;
            if(element.accessToken == dakey){
                isFound = true ;
               return element;
            }

            if(arLenth == i && !ifFound){
              return  undefined;
            }
        })

    // })
}

module.exports = {validateDAToken,verifyUserToken
     , ifverifyUserToken , checkIPLocation , validateRequest ,convert_Ency};