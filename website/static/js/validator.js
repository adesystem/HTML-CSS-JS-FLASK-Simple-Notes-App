
/**
 * Validates a username.
 * @param {string} username - The username to be validated.
 * @returns {(string|boolean)} - Returns an error message if the username is invalid, otherwise returns true.
 */
export function isUsernameValid(username) {
    if (!username) {
        return "USERNAME IS REQUIRED";
    }

    if (username.length < 6) {
        return "USERNAME IS TOO SHORT, IT MUST BE AT LEAST 6 CHARACTERS";
    }

    if (username.length > 30) {
        return "USERNAME IS TOO LONG, IT MUST BE AT MOST 30 CHARACTERS";
    }

    const pattern = /^[a-zA-Z0-9_]+$/;

    if (!pattern.test(username)) {
        return "USERNAME CANNOT CONTAIN SPECIAL CHARACTERS";
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
        return "EMAIL IS REQUIRED";
    }

    if (email.length > 80) {
        return "EMAIL MUST BE AT MOST 80 CHARACTERS";
    }

    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,80}$/;
    
    if (!pattern.test(email)) {
        return "EMAIL IS INVALID";
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
        return "PASSWORD IS REQUIRED";
    }

    if (password.length < 6) {
        return "PASSWORD IS TOO SHORT, IT MUST BE AT LEAST 6 CHARACTERS";
    }

    if (password.length > 120) {
        return "PASSWORD IS TOO LONG, IT MUST BE AT MOST 120 CHARACTERS";
    }

    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,120}$/;

    if (!pattern.test(password)) {
        return "PASSWORDD MUST CONTAIN AT LEAST ONE NUMBER, ONE LOWERCASE LETTER, AND ONE UPPERCASE LETTER";
    }

    return true;
}

/**
 * Validates a note's title and content.
 *
 * @param {string} title - The title of the note.
 * @param {string} content - The content of the note.
 * @returns {string|boolean} - Returns a string with an error message if the note is invalid, or true if the note is valid.
 */
export function isNoteValid(title, content) {
    if (!title) {
        return "TITLE IS REQUIRED.";
    }

    if (title.length < 3) {
        return "TITLE IS TOO SHORT, IT MUST BE AT LEAST 3 CHARACTERS.";
    }

    if (title.length > 100) {
        return "TITLE IS TOO LONG, IT MUST BE AT MOST 100 CHARACTERS.";
    }

    if (!content) {
        return "CONTENT IS REQUIRED";
    }

    if (content.length > 65535) {
        return "CONTENT IS TOO LONG, IT MUST BE AT MOST 65535 CHARACTERS.";
    }

    return true;
}