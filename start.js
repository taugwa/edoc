const { exec } = require('child_process'); 
// Start backend server 
const backendProcess = exec('node backend/index.js'); // Start frontend server
const frontendProcess = exec('npm start', { cwd: 'notes' }); // Handle process exit
process.on('SIGINT', () => { backendProcess.kill(); frontendProcess.kill(); process.exit(); });