const mongoose = require('mongoose');



const DB = process.env.DATABASE

// mongoose.connect(DB, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// }).then(()=> console.log("database connected.")).catch((err)=> console.log("error" + err.message));



mongoose
.connect(DB).then(()=> {
 console.log("Connected Database");
//  app.listen(PORT, () =>{
//     console.log(`listening on port: ${PORT}`);

// });
})
.catch((error)=>{
console.log(error);
});