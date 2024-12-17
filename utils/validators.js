const isValidUsername = (username) => {
    return (username && username.length >= 3);
}

const isValidName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return name && nameRegex.test(name);
};

const isValidPassword = (pwd) => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return pwd && pwd.length >= 8 && hasUppercase && hasNumber;
};

const isValidPasswordConf = (pwd, pwdConf) => pwd === pwdConf;

const isValidPasswords = (pwd, pwdConf) => {
    if (!isValidPassword(pwd)) {
        return false;
    }

    return !isValidPasswordConf(pwd, pwdConf);
}