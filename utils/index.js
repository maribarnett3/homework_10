var utilsModules = {
    convertEmptyValuesToNull: function (req) {
        for (const key in req) {
            if (req.hasOwnProperty(key)) {
                // if value is empty delete or set to null
                if (!req[key].trim()) req[key] = null;
            }
        }
        return req;
    },
    grabKeys: function(req){
        var resp=[]
        for (const key in req) {
            if (req.hasOwnProperty(key)) {
                resp.push(key)
            }
        }
        return resp;
    },
    grabVals: function(req){
        var resp=[]
        for (const key in req) {
            if (req.hasOwnProperty(key)) {
                resp.push(req[key])
            }
        }
        return resp;
    }
}

module.exports = utilsModules;