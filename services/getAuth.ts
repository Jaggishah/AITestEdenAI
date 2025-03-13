import axios from 'axios';

export const userInfo = async (token: string) => { 
    try{
    const response = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    { headers: { Authorization: `Bearer ${token}` } },
  )
  return response.data;
} catch (e){
    return e
}
};
