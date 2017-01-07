const app = require('./server/router.js');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server up running on localhost:' + port);
});
