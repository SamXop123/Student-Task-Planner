require('dotenv').config();
const admin = require('./config/firebaseAdmin');

console.log('\n🔍 Testing Firebase Admin SDK Configuration...\n');

if (admin.apps.length > 0) {
  console.log('✅ Firebase Admin SDK is initialized');
  console.log('📋 Project ID:', admin.app().options.credential.projectId);
  console.log('\n✨ All Firebase credentials are loaded correctly!\n');
} else {
  console.log('❌ Firebase Admin SDK is NOT initialized');
  console.log('⚠️  Check your .env file\n');
}

process.exit(0);

