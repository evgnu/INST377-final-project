const express = require('express');
// const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
dotenv.config();

// app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);
app.use(express.static(__dirname + '/public'));
app.get('/home', (req, res) => {
    res.sendFile(this.path.join(__dirname, 'public', 'home.html'));
});

module.exports = app;