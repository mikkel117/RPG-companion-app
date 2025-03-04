import AsyncStorage from '@react-native-async-storage/async-storage';

//using cookies to store token and userId for authentication on the website

export function setCookie(token: string){
    try{
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        const userId = payload.nameid;
        const exp = payload.exp * 1000;

        const expires = new Date(exp).toUTCString();

        document.cookie = `userId=${userId}; expires=${expires}; path=/`;
        document.cookie = `token=${token}; expires=${expires}; path=/`;

        console.log('userId:', payload);
        

    } catch (error) {
        console.log('Error:', error);
    }
}

export function getTokenUsingCookie(): string{
    let token = document.cookie.split(';').find((cookie) => cookie.includes('token'));
    token = token?.split('=')[1];
    if (token){
        return token
    } else {
        return "" 
    }
}

export function getUserIdUsingCookie(): string{
    let userId = document.cookie.split(';').find((cookie) => cookie.includes('userId'));
    userId = userId?.split('=')[1];
    if (userId){
        return userId
    } else {
        return "" 
    }
}

export function clearCookies(){
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const cookieName = cookie.split('=')[0].trim();
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

export function getNewTokenUsingCookie(){
    const token = getTokenUsingCookie();
    if(token){
        const payloadBase64 = token.split('.')[0];
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp * 1000;
        const now = new Date().getTime();
        const timeLeft = exp - now;
        if (timeLeft <= 24 * 60 * 60 * 1000){
            const userId = getUserIdUsingCookie();
            if (userId){
                console.log("token is about to expire, getting new token");
            }
        }
    } else{
        console.log("no token found");
    }
}

//using react-native-keychan to store token and userId for authentication on the app


export async function setTokenUsingStorage(token: string){
    try{
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        const userId = payload.nameid;
        const exp = payload.exp * 1000;

        const expires = new Date(exp).toUTCString();

        const tokendata = JSON.stringify({token, expires});
        const userIdData = JSON.stringify({userId, expires});

        await AsyncStorage.setItem('token', tokendata);
        await AsyncStorage.setItem('userId', userIdData);

    }
    catch (error){
        console.log('Error:', error);
    }
}

export async function getTokenUsingStorage(): Promise<string>{  
    let token = await AsyncStorage.getItem('token');
    token = token ? JSON.parse(token).token : "";
    if (token){
        return token
    } else {
        return "" 
    }
        
}

export async function getUserIdUsingStorage(): Promise<string>{
    let userId = await AsyncStorage.getItem('userId');
    userId = userId ? JSON.parse(userId).userId : "";
    if (userId){
        return userId
    } else {
        return "" 
    }
}

export async function clearTokenUsingStorage(){
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
}

export async function getNewTokenUsingStorage(){
    const token = await getTokenUsingStorage();
    if(token){
        const payloadBase64 = token.split('.')[0];
        const payload = JSON.parse(atob(payloadBase64));
        const exp = payload.exp * 1000;
        const now = new Date().getTime();
        const timeLeft = exp - now;
        if (timeLeft <= 24 * 60 * 60 * 1000){
            const userId = await getUserIdUsingStorage();
            if (userId){
                console.log("token is about to expire, getting new token");
            }
        }
    } else{
        console.log("no token found");
    }
}