
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const generateHeader = {
    generateHeaderBasic(){
        return 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    generateHeaderBearer(token){
        return 'Bearer ' + token;
    }
}

module.exports = generateHeader;