const express = require('express');
const bodyParser = require('body-parser');
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;
const app = express();

const checkJwt = auth({
    audience: 'https://book-tracker-abrunst.herokuapp.com',
    issuerBaseURL: `https://dev-cp5ml92r.us.auth0.com/`,
});

app.get('/api/public', function(req, res) {
    res.json({
        message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: process.env.SECRET,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
// };

// app.use(auth(config));

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

const db = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`DB Connected and server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });