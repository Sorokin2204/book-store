const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./src/models');
const bodyParser = require('body-parser');
const loginRouter = require('./src/routes/login.routes');
const authorRouter = require('./src/routes/author.routes');
const bookRouter = require('./src/routes/book.routes');
const reviewRouter = require('./src/routes/review.routes');

const reset = require('./src/setup');
const { handleError } = require('./src/middleware/customError');
const { default: axios } = require('axios');
const isBetweenTwoDate = require('./src/utils/isBetweenTwoDate');
const getNowDate = require('./src/utils/getNowDate');
const { CustomError, TypeError } = require('./src/models/customError.model');

var corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./images'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then((se) => {
  reset(db);
});

app.use('/v1', loginRouter);
app.use('/v202', authorRouter);
app.use('/v391', bookRouter);
app.use('/v485', reviewRouter);
// app.use('/api', brandRouter);
// app.use('/api', categoryRouter);
// app.use('/api', attributeRouter);
// app.use('/api', productRouter);
// app.use('/api', orderRouter);
app.use(function (req, res, next) {
  throw new CustomError(404, TypeError.PATH_NOT_FOUND);
});
app.use(handleError);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  // axios
  //   .post(
  //     'http://localhost:8080/v202/author/add',
  //     {
  //       firstName: 'fsdf',
  //       lastName: 'fsd',
  //       dateOfBirth: '1/2/2020',
  //       photo: 'https://picsum.photos/200/300',
  //       about: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec suscipit ante. Ut dapibus malesuada magna. Mauris iaculis fermentum erat at consectetur. Donec maximus rutrum pharetra. Ut feugiat, turpis vel interdum egestas, nibh justo volutpat tellus, at eleifend velit ante in sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi venenatis purus et dignissim tempus. Nam ut est sit amet nisi volutpat blandit a non magna. Fusce posuere aliquet leo vel pulvinar. Donec ut tincidunt orci. Praesent ullamcorper eros quis tincidunt pulvinar. Cras ultricies quam sed justo pretium lacinia.

  //  `,
  //     },
  //     { headers: { request_token: 'eyJhbGciOiJIUzI1NiJ9.dXNlcg.-XWrSM03n80Q96omLieZZKQYIJIv9Z8_EBKQ0Zp1t4E' } },
  //   )
  //   .then(function (response) {
  //     console.log('SUCC');
  //   })
  //   .catch(function (error) {
  //     console.log('ERR', error?.response.data);
  //   });
});
