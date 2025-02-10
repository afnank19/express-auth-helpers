import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * Generates access and refresh tokens
 *
 * @param {Object} payload - Custom payload to be included in the JWT provided by the caller
 * @param {Object} time - Object containing expiry times for both tokens
 * @param {string} time.accessToken - Expiry time for the access token
 * @param {string} time.refreshToken - Expiry time for the refresh token
 * @returns {Object} - Object containing both access and refresh tokens
 */
export const createAndSignTokens = (payload, time, creds) => {
  const aToken = jwt.sign(payload, creds.a_key, {
    expiresIn: time.accessToken,
  });

  const rToken = jwt.sign(payload, creds.r_key, {
    expiresIn: time.refreshToken,
  });

  return { aToken, rToken };
};

/**
 * The function generates a hash using bcrypt from a given password
 *
 * @param {string} password - provided by the user when registering
 * @returns {string} The hashed password.
 */
export const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error("An error occurred");
  }
};

/**
 *
 * @param {string} password - provided by the user when logging in
 * @param {string} hash - retrieved from the db, to compare with
 * @returns {boolean} True or false based on password matching.
 */
export const verifyPassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't verify credentials");
  }
};
