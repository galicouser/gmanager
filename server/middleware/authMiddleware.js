import jwt from 'jsonwebtoken'; // Import jwt using ES module syntax

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = verified; // Attach the decoded token to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware; // Default export for ES modules
