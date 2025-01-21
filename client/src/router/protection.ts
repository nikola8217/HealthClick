function checkIsAuth(to: any, from: any, next: any) {
    const auth = localStorage.getItem('token'); 
    
    if (!auth) {
        next('/'); 
    } else {
        next(); 
    }
}

function checkIsGuest(to: any, from: any, next: any) {
    const auth = localStorage.getItem('token'); 
    
    if (auth) {
        next('/appointments'); 
    } else {
        next(); 
    }
}

export {
    checkIsAuth,
    checkIsGuest,
};
