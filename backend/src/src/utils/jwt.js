const jwt = require("jsonwebtoken");

const generateToken = (id, expiresIn = "2h") => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn,
      },
      (error, token) => {
        if (error) {
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateToken,
};
