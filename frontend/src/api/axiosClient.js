import axios from "axios";

const client=axios.create({
 baseURL:"https://api.rediscoverulife.com"
});

client.interceptors.request.use(c=>{
 const t=localStorage.getItem("token");
 if(t) c.headers.Authorization="Bearer "+t;
 return c;
});

export default client;