const mongoose = require('mongoose');
const Article = require('../models/article');


//COMMENTING OUT USECREATEINDEX. NOT SUPPORTED ANYMORE
mongoose.connect('mongodb://localhost:27017/gameblog', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Article.deleteMany({});
    const entry = new Article({
        title: "It's a me Mariooo",
        game: "Super Mario 64",
        release: 1996,
        console: "Nintendo 64",
        blog: "insert here",
        images: [
            {
              url: 'https://res.cloudinary.com/duil5vwuw/image/upload/v1721679745/gameImages/cvzkw0pehwpo3lphmasy.png',
              filename: 'gameImages/cvzkw0pehwpo3lphmasy',
            },
            {
              url: 'https://res.cloudinary.com/duil5vwuw/image/upload/v1721679745/gameImages/ypwwwrboa5ecntcoo1mz.png',
              filename: 'gameImages/ypwwwrboa5ecntcoo1mz',
            }
          ] 
    });
    await entry.save();
}


seedDB().then(() => {
    mongoose.connection.close();
});