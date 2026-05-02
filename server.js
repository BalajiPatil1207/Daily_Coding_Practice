const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path to logs directory
const LOGS_DIR = path.join(__dirname, 'logs');

// Ensure logs directory exists
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR);
}

// API to save a daily log and sync with Git
app.post('/api/save-log', (req, res) => {
  const { date, question, answer, category, folderName } = req.body;
  
  // Determine base directory based on category
  let baseDir = '';
  let extension = '.js';

  if (category === 'javascript') {
    baseDir = path.join(__dirname, 'frontend', 'vanilla-js');
    extension = '.js';
  } else if (category === 'python') {
    baseDir = path.join(__dirname, 'python');
    extension = '.py';
  } else if (category === 'html') {
    baseDir = path.join(__dirname, 'frontend', 'tailwind-practice');
    extension = '.html';
  } else {
    baseDir = path.join(__dirname, 'logs');
    extension = '.md';
  }

  // Create full path with folderName (e.g., frontend/vanilla-js/day1)
  const targetDir = folderName ? path.join(baseDir, folderName) : baseDir;
  
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${question.replace(/\s+/g, '_').toLowerCase()}${extension}`;
  const filePath = path.join(targetDir, fileName);

  // For logs folder, keep it as markdown, for others just save the raw code
  const fileContent = category === 'logs' 
    ? `# Daily Log: ${date} 🚀\n\n## 🧩 Question\n${question}\n\n## 💻 Solution\n\`\`\`${category}\n${answer}\n\`\`\``
    : answer;

  // 1. Save file locally
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'File save fail zali!' });
    }

    // 2. Git Sync
    const gitCommand = `git add . && git commit -m "Practice: ${folderName}/${fileName}" && git push origin main`;

    exec(gitCommand, (gitErr) => {
      if (gitErr) {
        return res.json({ message: 'Saved locally, but Git sync failed.', status: 'partial_success' });
      }
      res.json({ message: 'Folder created, File saved ani GitHub var push zali! 🚀', status: 'success' });
    });
  });
});

// API to list all logs
app.get('/api/logs', (req, res) => {
  fs.readdir(LOGS_DIR, (err, files) => {
    if (err) return res.status(500).json({ error: 'Logs read fail!' });
    const logs = files.filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''));
    res.json(logs);
  });
});

// API to run code (Python/Node)
app.post('/api/run-code', (req, res) => {
  const { code, language } = req.body;
  const tempFile = language === 'python' ? 'temp_script.py' : 'temp_script.js';
  const command = language === 'python' ? `python ${tempFile}` : `node ${tempFile}`;

  fs.writeFile(tempFile, code, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to create temp file' });

    exec(command, (execErr, stdout, stderr) => {
      // Cleanup temp file
      fs.unlinkSync(tempFile);
      
      res.json({
        output: stdout,
        error: stderr || (execErr ? execErr.message : null)
      });
    });
  });
});

// Helper function to get recursive file tree
const getFileTree = (dir, baseDir = dir) => {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dashboard') {
        results.push({
          name: file,
          isDir: true,
          children: getFileTree(filePath, baseDir)
        });
      }
    } else {
      if (!file.includes('package') && !file.includes('server.js')) {
        results.push({
          name: file,
          path: path.relative(__dirname, filePath),
          isDir: false
        });
      }
    }
  });
  return results;
};

// API to get all practice files
app.get('/api/file-tree', (req, res) => {
  try {
    const tree = getFileTree(__dirname);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file tree' });
  }
});

// API to get file content
app.get('/api/get-file', (req, res) => {
  const { filePath } = req.query;
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    res.json({ content });
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
