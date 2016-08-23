const app = require('./server/router.js');

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server up running on LocalHost: ${PORT}`);
});
