const express = require('express');
const router = express.Router();

const reservations = {};

// Helper pour valider un créneau
function isValidTimeSlot(date) {
    const day = date.getDay(); // 0 = Dimanche, 6 = Samedi
    const hour = date.getHours();
    const minutes = date.getMinutes();

    // La salle est ouverte du lundi (1) au samedi (6) entre 10h00 et 22h00
    if (day === 0 || hour < 10 || hour >= 22 || minutes % 45 !== 0) {
        return false;
    }
    return true;
}

// Endpoint pour récupérer les réservations d'un terrain
router.get('/:terrainId/reservations', (req, res) => {
    const { terrainId } = req.params;

    if (!reservations[terrainId]) {
        return res.status(200).json([]);
    }

    res.status(200).json(reservations[terrainId]);
});

// Endpoint pour créer une réservation
router.post('/:terrainId/reservations', (req, res) => {
    const { terrainId } = req.params;
    const { pseudo, date } = req.body;

    if (!pseudo || !date) {
        return res.status(400).json({ message: "Pseudo et date sont requis." });
    }

    const reservationDate = new Date(date);

    if (!isValidTimeSlot(reservationDate)) {
        return res.status(400).json({ message: "Créneau horaire invalide. Réservez du lundi au samedi entre 10h et 22h, par tranches de 45 minutes." });
    }

    if (!reservations[terrainId]) {
        reservations[terrainId] = [];
    }

    // Vérifie si le créneau est déjà réservé
    const existingReservation = reservations[terrainId].find(res => res.date === date);
    if (existingReservation) {
        return res.status(400).json({ message: "Créneau déjà réservé." });
    }

    // Ajoute la réservation
    reservations[terrainId].push({ pseudo, date });
    res.status(201).json({ message: "Réservation créée avec succès.", reservation: { pseudo, date } });
});

// Endpoint pour supprimer une réservation
router.delete('/:terrainId/reservations', (req, res) => {
    const { terrainId } = req.params;
    const { date } = req.body;

    if (!date) {
        return res.status(400).json({ message: "Date est requise pour supprimer une réservation." });
    }

    if (!reservations[terrainId]) {
        return res.status(404).json({ message: "Aucune réservation pour ce terrain." });
    }

    const reservationIndex = reservations[terrainId].findIndex(res => res.date === date);
    if (reservationIndex === -1) {
        return res.status(404).json({ message: "Aucune réservation trouvée pour cette date." });
    }

    reservations[terrainId].splice(reservationIndex, 1);
    res.status(200).json({ message: "Réservation supprimée avec succès." });
});

module.exports = router;
