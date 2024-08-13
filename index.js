const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); 

const authenticatedUser = { email: 'admin@admin.com', password: 'admin123' }; 

app.post('/login', (req,res) => {
    const { content } = req.body;
    const { email, password } = content;
    if (authenticatedUser.email != email || authenticatedUser.password != password) {
        return res.status(401).send('Unauthorized');
    }
    return res.status(200).send('SignIn Successful');
});

app.listen(3003, () => {
    console.log('Moderate Jokes Service running on port 3003');
});


