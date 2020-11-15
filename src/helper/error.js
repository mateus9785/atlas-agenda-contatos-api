const mongoose = require("mongoose")

const schema = new mongoose.Schema({  
    parametersQuery: mongoose.Schema.Types.Mixed,  
    parametersUrl: mongoose.Schema.Types.Mixed,  
    parametersBody: mongoose.Schema.Types.Mixed,  
    method: String,
    httpMethod: String,
    error: String,
    registrationDate: Date,
    idUser: Number,
    url: String
}); 

const logMethods = {
    async error(parametersQuery, parametersUrl, parametersBody, error, method, url, httpMethod, idUser) {
        try {
            const Log = mongoose.model('Log', schema, 'atlas');

            var data = new Log({
                parametersQuery,
                parametersBody,
                parametersUrl,
                method,
                httpMethod: httpMethod,
                error,
                registrationDate: new Date(),
                idUser,
                url
            });
    
            data.save();
        } catch (exception) {
            console.log("Erro ao gravar log : ", exception)
        }
    },
}

module.exports = logMethods;