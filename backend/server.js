const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Database connection
const db = mysql.createConnection({
  host: 'mariadb',
  user: 'root',
  password: 'secret',
  database: 'github_data'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// CRUD routes for Pull Requests
app.get('/pull-requests', (req, res) => {
  db.query(`SELECT * FROM pull_requests WHERE url = "${githubUrl}"`, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/pull-requests/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM pull_requests WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

app.post('/pull-requests', (req, res) => {
  const { title, state, author, created_at, updated_at } = req.body;
  const query = 'INSERT INTO pull_requests (title, state, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, state, author, created_at, updated_at], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, message: 'Pull request created' });
  });
});

app.put('/pull-requests/:id', (req, res) => {
  const id = req.params.id;
  const { title, state, author, updated_at } = req.body;
  const query = 'UPDATE pull_requests SET title = ?, state = ?, author = ?, updated_at = ? WHERE id = ?';
  db.query(query, [title, state, author, updated_at, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Pull request updated' });
  });
});

app.delete('/pull-requests/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM pull_requests WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Pull request deleted' });
  });
});

// CRUD routes for Comments
app.get('/comments', (req, res) => {
  db.query(`SELECT * FROM comments WHERE url = "${githubUrl}"` , (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM comments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

app.post('/comments', (req, res) => {
  const { body, created_at, updated_at, author } = req.body;
  const query = 'INSERT INTO comments (body, created_at, updated_at, author) VALUES (?, ?, ?, ?)';
  db.query(query, [body, created_at, updated_at, author], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, message: 'Comment created' });
  });
});

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const { body, updated_at, author } = req.body;
  const query = 'UPDATE comments SET body = ?, updated_at = ?, author = ? WHERE id = ?';
  db.query(query, [body, updated_at, author, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Comment updated' });
  });
});

app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  db.query(`DELETE FROM comments WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Comment deleted' });
  });
});

// CRUD routes for Commits
app.get('/commits', (req, res) => {
  console.log("calisti");
  db.query(`SELECT * FROM commits WHERE url = "${githubUrl}"`, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results);
  });
});

app.get('/commits/:id', (req, res) => {
  const id = req.params.id; // Extracts the id from the URL
  console.log(`Received request for commit with ID: ${id}`); // Log the extracted id

  db.query('SELECT * FROM commits WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error during query execution:', err); // Log the error details
      return res.status(500).send(err);
    }
    console.log('Query results:', results); // Log the query results
    res.json(results[0]);
  });
});

app.post('/commits', (req, res) => {
  const { sha, message, created_at, updated_at, author } = req.body;
  const query = 'INSERT INTO commits (sha, message, created_at, updated_at, author) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [sha, message, created_at, updated_at, author], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Commit created' });
  });
});

app.put('/commits/:id', (req, res) => {
  const id = req.params.id;
  const { sha, message, updated_at, author } = req.body;
  const query = 'UPDATE commits SET sha = ?, message = ?, updated_at = ?, author = ? WHERE id = ?';
  db.query(query, [sha, message, updated_at, author, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Commit updated' });
  });
});

app.delete('/commits/:sha', (req, res) => {
  const sha = req.params.sha;
  db.query('DELETE FROM commits WHERE sha = ?', [sha], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Commit deleted' });
  });
});

//Github API integration

// Fetch Pull Requests and store them in the database
let githubUrl;

app.post('/fetch-data', (req, res) => {
  githubUrl = req.body.url;
  console.log(githubUrl);
  
  // Logic to fetch data from the given GitHub URL
  axios.get(githubUrl)
    .then(response => {
      // Process the response data as needed
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error fetching data from GitHub:', error);
      res.status(500).json({ error: 'Failed to fetch data from GitHub' });
    });
});

// Fetch Pull requests and store them in the database
async function FetchAndStorePullRequests(url) {
  try {
    const response = await axios.get(`${url}/pulls`);
    const pullRequests = response.data;
    console.log("pulls calisti");

    pullRequests.forEach(pr => {
      const {id, title, state, user, created_at, updated_at } = pr;
      const query =   `INSERT INTO pull_requests (id, url, title, state, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      db.query(query, [id, `${githubUrl}`, title, state, user.login, created_at, updated_at], (err) => {
        if (err) console.error('Error inserting pull request:', err);
      });
    });
  } catch (error) {
    console.error('Error fetching pull requests:', error);
  }
}

// Fetch Comments and store them in the database
async function FetchAndStoreComments(url) {
  try {
    const response = await axios.get(`${url}/comments`);
    const comments = response.data;
    console.log("comments calisti.");

    comments.forEach(comment => {
      const {id, body, user, created_at, updated_at } = comment;
      const query = `INSERT INTO comments (id, url, body, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(query, [id, `${githubUrl}`, body, user.login, created_at, updated_at], (err) => {
        if (err) console.error('Error inserting comment:', err);
      });
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

// Fetch Commits and store them in the database
async function FetchAndStoreCommits(url) {
  try {
    const response = await axios.get(`${url}/commits`);
    const commits = response.data;
    console.log("commits calisti");

    commits.forEach(committed => {
      const { sha, commit: { message, author } } = committed;
      const query = `INSERT INTO commits (sha, url, message, author, created_at) VALUES (?, ?, ?, ?, ?)`;
      db.query(query, [sha, `${githubUrl}`, message, author.name, author.date], (err) => {
        if (err) console.error('Error inserting commit:', err);
      });
    });
  } catch (error) {
    console.error('Error fetching commits:', error);
  }
}

app.get('/fetch-data', async (req, res) => {
  try{
    await Promise.all([
     FetchAndStorePullRequests(githubUrl),
     FetchAndStoreComments(githubUrl),
     FetchAndStoreCommits(githubUrl)
  ])}
  catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Failed to fetch data.', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
