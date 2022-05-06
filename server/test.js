'use strict';

//const {User} = require('../models/index')

const userM = require('./models-mongo/userM')
const Baskets = require('./models-mongo/Baskets')


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


    // delete all from users and baskets
/*    async function func1() {

        let users = await userM.find();
        let baskets = await Baskets.find();

        for (let i = 0; i <= users.length - 1; ++i) {
            console.log( `users[${i}] = `, users[i]);
            await userM.deleteOne({name: users[i].name});
//            await Baskets.deleteOne({name: baskets[i].name});
        }

        for (let j = 0; j <= baskets.length - 1; ++j) {
            console.log( `baskets[${j}] = `, baskets[j]);
            await Baskets.deleteOne({name: baskets[j].name});
//            await Baskets.deleteOne({name: baskets[i].name});
        }

        console.log(' users = ', users);
        console.log(' baskets = ', baskets);
    }

func1();*/
