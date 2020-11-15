const { error } = require("../../helper/error")

module.exports = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next)
        } catch (exception) {
            var idUser = null;
            if (req.authenticatedUser)
                idUser = req.authenticatedUser.idUser

            await error(req.query, req.params, req.body, exception.message, arguments.callee.name,
                req.originalUrl, req.method, idUser);
            return res.status(400).send({ message: "Erro ao realizar operação", error: exception.message });
        }
    }
}