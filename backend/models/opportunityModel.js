const Datastore = require('nedb');
const db = new Datastore({ filename: 'C:/WPD2 - Coursework/backend/db/opportunities.db', autoload: true });

const opportunityModel = {
   find: (query) => {
       return new Promise((resolve, reject) => {
           db.find(query, (err, docs) => {
               if (err) {
                  reject(err);
               } else {
                  resolve(docs);
               }
           });
       });
   },
   
   findOne: (query) => {
       return new Promise((resolve, reject) => {
           db.findOne(query, (err, doc) => {
               if (err) {
                  reject(err);
               } else {
                  resolve(doc);
               }
           });
       });
   }
   


};

module.exports = opportunityModel;
