import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export interface JwtTokenResult {
  success: boolean;
  decoded?: any;
  name?: string;
  message?: string;
}

export const createJwtToken = async (userId: number) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30m" });
  console.log('Token created:', token); // Log the created token
  return token;
};

export const checkJwtToken = (token: string): Promise<JwtTokenResult> => {
  console.log('Token to verify:', token); // Log the token to be verified
  return new Promise((resolve) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        let { name, message } = err;
        console.log('Token validation error:', err); // Log the error details
        resolve({
          name: name,
          message: message,
          success: false
        });
      } else {
        resolve({
          success: true,
          decoded: decoded
        });
      }
    });
  });
};
