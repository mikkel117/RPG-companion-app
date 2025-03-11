import { Platform } from "react-native";
import { createCharterType } from "~/types";
import { getTokenUsingCookie, getTokenUsingStorage } from './tokenHandling';
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5028' : 'http://localhost:5028';

export async function getCharacterById(id: string) {
    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/Character/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return { success: false, error: data.error };
        }
        return { success: true, data: data };
    } catch (error: any) {
        console.error('Error:', error);
        return { success: false, error: error.message };
    }
}

export async function updateStats(
    intelligence: number | undefined,
    strength: number | undefined,
    dexterity: number | undefined,
    charisma: number | undefined,
    wisdom: number | undefined,
    id: number
){

    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/Character/${id}/stats`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            intelligence: intelligence,
            strength: strength,
            dexterity: dexterity,
            charisma: charisma,
            wisdom: wisdom
        }),
    });
    const data = await response.json();
    console.log(data);
    } catch (error: any) {
        console.error('Error:', error);
     /*    return { success: false, error: error.message }; */
    }
}


export async function updateHealth(health: number, id: string) {
    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/Character/${id}/health`, {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                health: health
            })
        });
        if(!response.ok){
            return { success: false };
        }
        return { success: true };
        } catch (error: any) {
            return { success: false };
        }
}

export async function updateLevel(level: number, id: string) {
    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/Character/${id}/level`, {
            method : 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                level: level
            })
        });
        if(!response.ok){
            return { success: false };
        }
        return { success: true };
        } catch (error: any) {
            return { success: false };
        }
}

export async function createCharterApi(character: createCharterType) {
    const token = Platform.OS === 'android' ? await getTokenUsingStorage() : getTokenUsingCookie();
    try {
        const response = await fetch(`${API_URL}/api/Character`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(character)
        });

        const data = await response.json();
        console.log(data);
    } catch (error: any) {
        console.log('Error:', error);
        
    }
}