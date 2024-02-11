const fs = require('fs');

// Read the template file
fs.readFile('src/environments/environment.sample.ts', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading template file:', err);
    return;
  }

  // Replace placeholders with actual environment variable values
  const environment = data.replace(/##API_URL##/g, process.env.GITHUB_TOKEN || 'default-token');
  // Add more replacements as needed for other environment variables

  // Write the environment file
  fs.writeFile('src/environments/environment.prod.ts', environment, 'utf8', err => {
    if (err) {
      console.error('Error writing environment file:', err);
      return;
    }
    console.log('Environment file generated successfully!');
  });
  fs.writeFile('src/environments/environment.ts', environment, 'utf8', err => {
    if (err) {
      console.error('Error writing environment file:', err);
      return;
    }
    console.log('Environment file generated successfully!');
  });
});
