export function getToken(){
 return localStorage.getItem("token");
}

export function getUser(){
 const u=localStorage.getItem("user");
 return u?JSON.parse(u):null;
}

export function isLoggedIn(){
 return !!getToken();
}

export function isAdmin(){
 const u=getUser();
 return u && u.role==="ADMIN";
}

export function hasSubscription(){
 const u=getUser();
 return u && u.subscriptionStatus==="PAID";
}