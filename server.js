'use strict';

const App = require('./server/router.js'),
      PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
  console.log(`Server up running on LocalHost: ${PORT}`);
});
