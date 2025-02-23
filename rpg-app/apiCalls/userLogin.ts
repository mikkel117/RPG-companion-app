export async function login(user: string, password: string) {
  console.log(`Login with ${user}:${password}`);

  try {

    
    const response = await fetch('http://10.0.2.2:5028/api/Auth/login', {
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