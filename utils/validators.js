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

    return isValidPasswordConf(pwd, pwdConf);
}

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
};

const isValidInformation = (data) => {
    const errors = [];

    if (!isValidUsername(data.username)) {
        errors.push("Username must be at least 3 characters.");
    }
    if (!isValidName(data.name)) {
        errors.push("Name must contain only letters and spaces.");
    }
    if (!isValidPassword(data.password)) {
        errors.push("Password must be at least 8 characters.");
    }
    if (!isValidPasswordConf(data.password, data.passwordConf)) {
        errors.push("Passwords do not match.");
    }
    if (!isValidEmail(data.email)) {
        errors.push("Invalid email format.");
    }

    return errors.length > 0 ? errors : null;
};

module.exports = {
    isValidUsername,
    isValidName,
    isValidPassword,
    isValidPasswordConf,
    isValidEmail,
    isValidInformation,
};