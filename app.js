// Import necessary modules
const express = require('express');
const axios = require('axios');
const path = require('path');

// Initialize express app
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up static folder for public assets (like CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// API Key for NewsAPI (replace with your own key)
const API_KEY = 'your_newsapi_key_here';

// Route for homepage that displays latest news
app.get('/', async (req, res) => {
  try {
    // Make a GET request to NewsAPI for the latest news
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    
    // Extract articles from the response
    const articles = response.data.articles;

    // Render the 'index' EJS view with the articles
    res.render('index', { articles });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
