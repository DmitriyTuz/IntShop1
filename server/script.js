const { Type, Brand } = require('./models/index');

const test = async () => {
    try {

    console.log(__dirname);



    } catch(e) {
        throw (e)
    }
}

test().then((a)=>{
    console.log(a)
    process.exit()
})