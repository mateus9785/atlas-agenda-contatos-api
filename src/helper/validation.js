const validation = {
    verifyNullEmptyUndefined(value){
        return (value === null) || (value === "") || (value === undefined);
    },
};

module.exports = validation;