// Development setup script to run both React and PHP servers
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting development servers...\n');

// Check if PHP is available
const checkPHP = spawn('php', ['--version']);
checkPHP.on('error', () => {
  console.error('❌ PHP is not installed or not in PATH.');
  console.log('\n📝 To install PHP:');
  console.log('   Windows: Download from https://windows.php.net/download/');
  console.log('   Mac: brew install php');
  console.log('   Linux: sudo apt-get install php\n');
  process.exit(1);
});

checkPHP.on('close', (code) => {
  if (code === 0) {
    console.log('✅ PHP is available\n');
    startServers();
  }
});

function startServers() {
  // Start PHP server on port 8000
  console.log('📡 Starting PHP server on http://localhost:8000...');
  const phpServer = spawn('php', ['-S', 'localhost:8000', '-t', path.join(__dirname, 'public')], {
    cwd: path.join(__dirname, 'public'),
    stdio: 'inherit'
  });

  phpServer.on('error', (err) => {
    console.error('❌ Failed to start PHP server:', err);
    process.exit(1);
  });

  // Start React dev server
  console.log('⚛️  Starting React development server...\n');
  const reactServer = spawn('npm', ['start'], {
    stdio: 'inherit',
    shell: true
  });

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down servers...');
    phpServer.kill();
    reactServer.kill();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    phpServer.kill();
    reactServer.kill();
    process.exit(0);
  });
}

