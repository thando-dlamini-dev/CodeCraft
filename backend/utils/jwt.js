import jwt from "jsonwebtoken";

export const createJWT = (payload, options = {}) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
      issuer: process.env.JWT_ISSUER,
      ...options
    });
  };

//returns true if token is valid
export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
