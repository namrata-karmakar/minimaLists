import jsonwebtoken from 'jsonwebtoken';

class JWTMiddleware {
  static createToken(): string {
    return jsonwebtoken.sign({}, process.env.SECRET_STRING || "abcpqr", {
      expiresIn: '999h',
    });
  }

  static verifyToken(req, res, next): void {
    const jwt: string = req.headers['x-token-header'];
    if (!jwt) {
      res.status(403).send({ message: 'No token provided!' });
    } else {
      jsonwebtoken.verify(jwt, process.env.SECRET_STRING || "abcpqr", (err) => {
        if (err) {
          res.status(403).send(err);
        } else {
          next();
        }
      });
    }
  }
}

export { JWTMiddleware };
