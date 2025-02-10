import jwt from "jsonwebtoken";

export function authenticateAction(options = {}) {
  const secret = options.secret;

  return function verifyAuthToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];

      if (!authHeader) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const accessToken = req.headers.authorization.split(" ")[1];

      if (accessToken === undefined) {
        res
          .status(401)
          .json({ message: "Unauthorized: No credentials provided" });
        return;
      }

      console.log("Verifying token: ", accessToken);
      console.log("With secret:", secret);

      jwt.verify(accessToken, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: "Invalid or expired token" });
        }
        // Attach the decoded payload to the request object for further use
        req.user = decoded;
        next();
      });
    } catch (error) {
      res.status(401).json({ message: "Unauthorized buddy" });
      return;
    }
  };
}
