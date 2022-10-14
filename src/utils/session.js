export const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem("state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("state", serializedState);
    } catch (err) {
        //ignoring write erros
    }
};
export const isLoggedIn = () => {
    const visitor = loadState();
    return (visitor && visitor.state === 'loggedin') ? true : false;
}

export const isAdmin = () => {
    const visitor = loadState();
    if (visitor && visitor.user) {
        return visitor.user.isAdmin;
    } else {
        return false;
    }
}
export const removeState = () => {
    sessionStorage.removeItem('state');
}
