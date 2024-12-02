var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");

const users = [{ pseudo: "admybad", password: "admybad" }];

router.post("/", (req, res) => {
  const { pseudo, password } = req.body;

  const user = users.find(u => u.pseudo === pseudo && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Utilisateur ou mot de passe incorrect." });
  }

  const token = jwt.sign({ pseudo: user.pseudo }, "secretkey", { expiresIn: "1h" });
  res.status(200).json({ message: "Authentification réussie", token });
});

module.exports = router;
