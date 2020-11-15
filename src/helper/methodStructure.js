const { sequelize, Sequelize } = require('../app/models');

const typeTransaction = {
    READ_UNCOMMITTED: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    READ_COMMITTED: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
}

const methodStructure = {
    async transactionSequelize(readCommitted, methodFunction) {
        const transaction = await sequelize.transaction({ 
            isolationLevel: readCommitted ? typeTransaction.READ_COMMITTED : typeTransaction.READ_UNCOMMITTED
        });
        try {

            const result = await methodFunction(transaction);

            await transaction.commit();

            return result;

        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message)
        }
    },
    async controller(req, res, schema, methodFunction, parametersMethod={}) {

        const authenticatedUser = req.authenticatedUser;

        const { error } = await schema.validate({ ...parametersMethod, ...req.params, 
            ...req.query, ...req.body });
        if (error)
            return res.status(400).send({ message: "Erro de validação, verifique!", error:error.details })

        const result = await methodFunction({ ...parametersMethod, ...req.params, 
            ...req.query, ...req.body, authenticatedUser });
        return res.status(result.status).send(result.response);
    },
}

module.exports = methodStructure;