var express = require("express");
var router = express.Router();

var reservations = [];

// Route pour réserver un terrain
router.post("/", (req, res) => {
  const { terrain, heure } = req.body;
  if (!terrain || !heure) {
    return res.status(400).json({ message: "Terrain et heure sont nécessaires." });
  }

  // Simuler une réservation
  reservations.push({ terrain, heure });
  res.status(201).json({ message: "Réservation effectuée!", terrain, heure });
});

// Route pour afficher les réservations
router.get("/", (req, res) => {
  res.status(200).json(reservations);
});

module.exports = router;
