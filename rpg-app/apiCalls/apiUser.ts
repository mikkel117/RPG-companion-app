import { Platform } from 'react-native';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5028' : 'http://localhost:5028';


export async function getUser(){
    
}