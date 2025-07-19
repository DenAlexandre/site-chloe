node index.js

curl -X GET http://localhost:3000/reservation

curl -X POST http://localhost:3000/reservation -H 'Content-Type: application/json' -d '{"name" : "Denis", "nbr_personne" : 2, "phone_number" : "uhiuh", "date_heure" : "ihjoi"}' 