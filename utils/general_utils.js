/**
 * General Utility file
 */
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
 /**
  * 
  */
module.exports.pdf_search_replace = (struct, pdfdata) => {
    let keys = Object.keys(struct);
    keys.forEach(function (item) {
        pdfdata = pdfdata.replace(new RegExp('\\*\\|' + item + '\\|\\*', 'g'), struct[item]);
    });
    return pdfdata;
};

/**
 * 
 */
module.exports.createREQUEST = (request, reqdata, headers, httpreq, url) => {
    return new Promise((resolve, reject) => {
        request.post(url, {
            json: {
                inputObj: reqdata
            },
            headers: headers
        }, (error, resp, body) => {
            if (error) {
                console.log(error);
                reject(err);
            }
            if ('outputObj' in body){
                resolve(body);
            }else{
                reject(body.error);
            }
            // console.log(body);
            resolve(body);
        });
    }).catch((err)=>{
        console.log(err);
        return {errorObj:err};
    });
};

exports.generateCsvFile = function(filename,header,records){

    return new Promise((resolve,reject)=>{
        console.log('Enter in module')
        const csvWriter = createCsvWriter({
            path: filename,
            header: header
        });
        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('Exit from module');
                resolve(filename)
        });
    })

}