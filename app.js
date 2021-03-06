const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('622e61d650602ac1626fad7a')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Shivam_117:atthetution@node-course.ufu3x.mongodb.net/shop?retryWrites=true&w=majority')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name : 'Shivam',
        email : 'shivam.com',
        cart : {
          items : []
        }
      })
      user.save()
    }
  });
  app.listen(process.env.PORT||3000, (req, res) => {
    console.log("Server Up and running at port 3000");
  });
}).catch(err =>{
  console.log(err);
});