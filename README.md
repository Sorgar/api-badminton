## Table des matières
- [Installation](#Installation)
- [Conception](#Conception)
  - [Dictionnaire des données](#Dictionnaire)
  - [Tableau récapitulatif des ressources](#Tableau)
- [Commandes](#Commandes)

##Installation
git clone [url du projet]
cd api-badminton
npm install
npm start

url d'entrée : localhost:3000

##Conception 
###Dictionnaire des données
| Nom           | Type  | Description                                |
|:--------------|------:|:------------------------------------------:|
| pseudo        |String | Identifiant de l'utilisateur               |
| date          |String | Date et heure du créneau au format ISO 8601|
| terrain       |String | Identifiant du terrain (A, B, C ou D)      |
| réservations  |Array  | Liste des réservations par terrain         |

###Tableau récapitulatif des ressources
| Ressource     | URL                              | Méthodes HTTP    | Param d'URL  | Commentaire                                        |
|:--------------|---------------------------------:|:-----------------|--------------|---------------------------------------------------:| 
| terrain       |/terrains                         |    GET           | Aucun        | liste terrains dispo                               |
| réservations  |/terrains/:id/reservations        |GET, POST, DELETE |id: A, B, C, D| liste, crée, annule réservation                    |
| réservations  |/terrains/:id/reservation/date=...| GET              | date: date   | filtre les réservations pour un créneau spécifique |


##Commandes 
• Commandes dans le terminal pour intéragir avec le serveur :
Ajouter un créneau :
curl -X POST http://localhost:3000/terrains/A/reservations -H "Content-Type: application/json" -d "{"pseudo": "user1", "date": "2024-12-02T10:45:00"}"

Supprimer un créneau :
curl -X DELETE http://localhost:3000/terrains/A/reservations -H "Content-Type: application/json" -d "{"pseudo": "user1", "date": "2024-12-02T10:45:00"}"

Vérifier réservations : 
curl -X GET http://localhost:3000/terrains/A/reservations
