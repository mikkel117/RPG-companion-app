import { Platform } from 'react-native';

export async function login(user: string, password: string) {
  const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5028' : 'http://localhost:5028';

  try {
    console.log('fetching');
    
    const response = await fetch(`${API_URL}/api/Auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error };
  }
  
    return { success: true,  ...data };
  }

  catch (error: any) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }


}