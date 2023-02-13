const express = require('express');
const app = express();

app.use(express.static('./dist/ohmyrun_frontend'));

app.get('/*', function(req, res) {
res.sendFile('index.html', {root: 'dist/ohmyrun_frontend/'});
});

app.listen(process.env.PORT || 8080);
