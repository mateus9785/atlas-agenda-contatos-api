const mongoose = require('mongoose');

module.exports = function(uri){
    mongoose.connect(uri, { useNewUrlParser : true, useUnifiedTopology: true});

    mongoose.set('useFindAndModify',false);
    mongoose.set('useCreateIndex',true);

    mongoose.connection.on('connected',function(){
        console.log('Mongoose! conectado a mongoDB');
    });

    mongoose.connection.on('disconnected',function(){
        console.log('Mongoose! desconectado a mongoDB');
    });

    mongoose.connection.on('error',function(error){
        console.log('Mongoose! erro : ' + error);
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log('Mongoose! Desconectado pelo termino da aplicacao');
            process.exit(0);
        });
    })
}