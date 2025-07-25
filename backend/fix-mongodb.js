const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB Connection Fix Tool');
console.log('==============================');
console.log('');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('❌ .env file not found. Creating one...');
  fs.writeFileSync('.env', 'PORT=5000\nMONGO_URI=mongodb://localhost:27017/excel_analytics\nJWT_SECRET=your_super_secret_jwt_key_change_this_in_production');
}

// Read current .env file
let envContent = fs.readFileSync('.env', 'utf8');

console.log('📋 Current .env file:');
console.log(envContent);
console.log('');

console.log('🔍 Issue: MongoDB is not running locally');
console.log('💡 Solution: Use MongoDB Atlas (free cloud database)');
console.log('');

console.log('📝 To fix this, you have 2 options:');
console.log('');
console.log('Option 1: Set up MongoDB Atlas (Recommended)');
console.log('  1. Go to: https://www.mongodb.com/atlas');
console.log('  2. Create a free account');
console.log('  3. Create a cluster (FREE tier)');
console.log('  4. Get your connection string');
console.log('  5. Update MONGO_URI in .env file');
console.log('');
console.log('Option 2: Install local MongoDB');
console.log('  1. Download from: https://www.mongodb.com/try/download/community');
console.log('  2. Install and start MongoDB service');
console.log('');

rl.question('Do you want to set up MongoDB Atlas now? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('');
    console.log('🚀 Setting up MongoDB Atlas...');
    console.log('');
    console.log('1. Open this link: https://www.mongodb.com/atlas');
    console.log('2. Create a free account');
    console.log('3. Create a cluster (choose FREE tier)');
    console.log('4. Set up database user (save username/password)');
    console.log('5. Allow network access from anywhere');
    console.log('6. Get your connection string');
    console.log('');
    
    rl.question('Paste your MongoDB Atlas connection string here: ', (connectionString) => {
      if (connectionString && connectionString.includes('mongodb+srv://')) {
        // Update .env file with Atlas connection string
        const newEnvContent = envContent.replace(
          /MONGO_URI=.*/,
          `MONGO_URI=${connectionString}`
        );
        
        fs.writeFileSync('.env', newEnvContent);
        
        console.log('');
        console.log('✅ Connection string updated!');
        console.log('');
        console.log('Now run: npm run dev');
        console.log('');
        console.log('You should see: "✅ MongoDB connected"');
        
      } else {
        console.log('❌ Invalid connection string. Please try again.');
      }
      rl.close();
    });
    
  } else {
    console.log('');
    console.log('📋 Manual Setup Instructions:');
    console.log('1. Install MongoDB locally, OR');
    console.log('2. Set up MongoDB Atlas and update .env file');
    console.log('');
    console.log('Current .env file location: backend/.env');
    rl.close();
  }
}); 