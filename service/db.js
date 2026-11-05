const loki = require('lokijs');
const db = new loki('library.db');

function initDatabase(cb){
    db.loadDatabase({}, err => {
        if(err){
            return cb(err);
        }

        let monkeysModel = db.getCollection('monkeys');
        if(monkeysModel === null){
            monkeysModel = db.addCollection('monkeys');
        }
        let bananasModel = db.getCollection('bananas');
        if(bananasModel === null){
            bananasModel = db.addCollection('bananas');
        }
        
        db.saveDatabase(err => {
            return cb(err, {db, monkeys: monkeysModel, bananas: bananasModel});
        });
    });
}

module.exports.initDatabase = initDatabase;

