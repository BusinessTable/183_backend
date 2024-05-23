# 183_backend

## Grundkonzept

Unser Backend besteht aus express und funktioniert, indem eine MotherNode bei Start erstellt wird.

Diese MotherNode handled verschiedene ChildNodes welche je einen User darstellt.

Diese User speichern und handlen die Passwörter.

Bevor Passwörter gespeichert werden werden diese natürlich via Masterpasswort encrypted.

User Backend läift dann auf einen Server.

Das FRontend greift dann via REST calls auf das backend zu.

## How to use

Um das Backend zu testen, kann man bei gegebenen Zugriff, die Postamn Collection nutzen.

Als erstes muss man sich via dem /Register Endpoint einen Bearer Token holen.

Danach kann man diesen in der Collection unter Variables als token mitgeben. Siehe Grafik:

![Not found](backend/resources/postman_vairables.png "Postman Collection Variable")
