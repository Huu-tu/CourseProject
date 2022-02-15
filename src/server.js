const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const handlebars = require('handlebars');
// const bodyParser = require('body-parser');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const app = express();
const port = 4000;

const route = require('./routes');
const db = require('./config');

//Connect to db
db.connect();

app.use(methodOverride('_Method'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//HTTP logger
// app.use(morgan('combined'));

//Template Engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: {
      sum: (a, b) => a + b,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
