const express = require('express');
const app = express();

app.use(express.static('./dist/ohmyrun-frontend'));

app.get('/*', function(req, res) {
res.sendFile('index.html', {root: 'dist/ohmyrun-frontend'});
});

app.listen(process.env.PORT || 8080);
