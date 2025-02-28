import { Platform } from 'react-native';
import { getTokenUsingCookie, getTokenUsingStorage, getUserIdUsingCookie, getUserIdUsingStorage } from '~/apiCalls/tokenHandling';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5028' : 'http://localhost:5028';


export async function getUserById(){
    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    const id = Platform.OS === 'android' ? await getUserIdUsingStorage() : getUserIdUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/User/1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            return { success: false, error: data.error };
        }
        console.log(id);
        
        console.log('data:', data);
        

        return { success: true, data: data };
    }
    
    catch (error: any) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}