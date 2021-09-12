export const storeUserRole = (role:string) => {
    window.localStorage.setItem('user-role', role);
}

export const getUserRole = () =>{
    return window.localStorage.getItem('user-role'); 
}

export const removeUserRole =() => {
    window.localStorage.removeItem('user-role');
}
