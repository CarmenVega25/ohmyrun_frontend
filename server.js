const express = require('express');
const app = express();

app.use(express.static('./dist/ohmyrun'));

app.get('/*', function(req, res) {
res.sendFile('index.html', {root: 'dist/ohmyrun/'});
});

app.listen(process.env.PORT || 8080);
