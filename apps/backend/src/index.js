require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// TEMP in-memory storage (we replace with DB later)
let workflows = [];

// Health check
app.get('/', (req, res) => {
  res.send('Backend running');
});

// SAVE WORKFLOW
app.post('/workflows', (req, res) => {
  const workflow = req.body;

  workflows.push({
    id: Date.now().toString(),
    ...workflow,
  });

  res.json({ success: true });
});

// GET WORKFLOWS
app.get('/workflows', (req, res) => {
  res.json(workflows);
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'));