
/**
 * Validates a username.
 * @param {string} username - The username to be validated.
 * @returns {(string|boolean)} - Returns an error message if the username is invalid, otherwise returns true.
 */
export function isUsernameValid(username) {
    if (!username) {
        return "Username is requiared.";
    }

    if (username.length < 6) {
        return "Username is too short, it must be at least 6 characters.";
    }

    if (username.length > 30) {
        return "Username is too long, it must be at most 30 characters.";
    }

    const pattern = /^[a-zA-Z0-9_]+$/;

    if (!pattern.test(username)) {
        return "Username cannot contain forbidden characters.";
    }

    return true;
}

/**
 * Validates if an email is valid.
 * 
 * @param {string} email - The email to be validated.
 * @returns {(string|boolean)} - Returns an error message if the email is invalid, otherwise returns true.
 */
export function isEmailValid(email) {

    if (!email) {
        return "Email is required.";
    }

    if (email.length > 80) {
        return "Email must be at most 80 characters.";
    }

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,80}$/;
    
    if (!pattern.test(email)) {
        return "Email is not valid.";
    }

    return true;
}

/**
 * Validates the password based on the following criteria:
 * - Password is required.
 * - Password must be at least 6 characters long.
 * - Password must be at most 120 characters long.
 * - Password must contain at least one number, one lowercase letter, and one uppercase letter.
 *
 * @param {string} password - The password to be validated.
 * @returns {(string|boolean)} - Returns an error message if the password is invalid, otherwise returns true.
 */
export function isPasswordValid(password) {
    if (!password) {
        return "Password is required.";
    }

    if (password.length < 6) {
        return "Password is too short, it must be at least 6 characters.";
    }

    if (password.length > 120) {
        return "Password is too long, it must be at most 120 characters.";
    }

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,120}$/;

    if (!pattern.test(password)) {
        return "Password must contain at least one number, one lowercase and one uppercase letter.";
    }

    return true;
}
