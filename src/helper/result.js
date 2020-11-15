
function result(data, message, status, pagination){

    const result = {
        response: { 
            data, 
            message,
            pagination
        },
        status: status
    }
    return result;
}

module.exports = result;