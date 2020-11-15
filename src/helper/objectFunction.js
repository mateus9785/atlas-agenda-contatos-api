const { verifyNullEmptyUndefined } = require("./validation");

const objectFunction = {
    updateFieldsChanges(objectInDataBase, objectSaved) {
        for (var key in objectSaved) {
            if (!verifyNullEmptyUndefined(objectSaved[key]))
                objectInDataBase[key] = objectSaved[key];
        }

        return objectInDataBase;
    },
    objectOnlyAllowedFields(objects, keys) {
        const list = [];
        if(Array.isArray(objects) && verifyNullEmptyUndefined(objects.length))
            return objects;

        if(!Array.isArray(objects))
            objects = [objects];

        objects.forEach(object => {
            var result = {};
            keys.forEach(key => {
                result[key] = object[key];
            });
            list.push(result)
        });

        return list.length > 1 ? list : list[0];
    }
}

module.exports = objectFunction;