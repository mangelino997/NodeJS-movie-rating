const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://userMiguel:userMiguel@cluster0.j1en9.mongodb.net/moviesRanking?retryWrites=true&w=majority',
{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log("db connected"))
.catch(err => console.error(err))