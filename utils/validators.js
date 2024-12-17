const isValidUsername = (username) => {
    return (username && username.length >= 3);
}

const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return name && nameRegex.test(name);
};