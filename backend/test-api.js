const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');

    // Test signup
    console.log('1. Testing signup...');
    const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Signup successful:', signupResponse.data.message);
    const token = signupResponse.data.token;

    // Test login
    console.log('\n2. Testing login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful:', loginResponse.data.message);

    // Test protected route
    console.log('\n3. Testing protected route...');
    const historyResponse = await axios.get(`${BASE_URL}/file/history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Protected route accessible:', historyResponse.data);

    console.log('\n🎉 All tests passed! API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 