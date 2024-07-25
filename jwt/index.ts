import jwt from "jsonwebtoken";

// Retrieve the JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// Interface for the result of JWT token verification
export interface JwtTokenResult {
  success: boolean;
  decoded?: any;
  name?: string;
  message?: string;
}

// Function to create a JWT token for a given user ID
export const createJwtToken = async (userId: number) => {
  // Sign the token with the user ID and secret, set to expire in 30 minutes
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30m" });
  console.log('Token created:', token); // Log the created token
  return token;
};

// Function to verify a given JWT token
export const checkJwtToken = (token: string): Promise<JwtTokenResult> => {
  console.log('Token to verify:', token); // Log the token to be verified
  return new Promise((resolve) => {
    // Verify the token using the secret
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // If there's an error, log it and resolve with an error result
        let { name, message } = err;
        console.log('Token validation error:', err); // Log the error details
        resolve({
          name: name,
          message: message,
          success: false
        });
      } else {
        // If verification is successful, resolve with the decoded token
        resolve({
          success: true,
          decoded: decoded
        });
      }
    });
  });
};
