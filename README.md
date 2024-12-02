• Accéder au dossier du projet :
cd api-badminton

• Installer les dépendances et lancer le serveur:
npm install
npm run start

• Commandes dans le terminal pour intéragir avec le serveur :
- Réserver un terrain :
    curl -X POST http://localhost:3000/terrains/A/reservations -H "Content-Type: application/json" -d "{"pseudo": "user1", "date": "2024-12-01T10:00:00"}"
- Annuler une réservation
    curl -X DELETE http://localhost:3000/terrains/A/reservations -H "Content-Type: application/json" -d "{"pseudo": "user1", "date": "2024-12-01T10:00:00"}"
- Liste des réservations d'un terrain
    curl -X GET http://localhost:3000/terrains/A/reservations
- Vérifier la disponibilité d'un terrain
    curl -X GET http://localhost:3000/terrains/A/disponibilite
