# 183_backend

## Grundkonzept

Unser Backend besteht aus express und funktioniert, indem eine MotherNode bei Start erstellt wird.

Diese MotherNode handled verschiedene ChildNodes welche je einen User darstellen.

Diese User speichern und handlen die Passwörter.

Bevor Passwörter gespeichert werden werden diese natürlich via Masterpasswort encrypted.

User Backend läuft dann auf einem dedizierten Server.

Das Frontend greift dann via REST calls auf das backend zu.

## How to use

Um das Backend zu testen, kann man bei gegebenen Zugriff, die Postamn Collection nutzen.

Als erstes muss man sich via dem /Register Endpoint einen Bearer Token holen.

Danach kann man diesen in der Collection unter Variables als token mitgeben. Siehe Grafik:

![Not found](backend/resources/postman_vairables.png "Postman Collection Variable")

Danach kann man die bereit gestellten Endpoints benutzen.

## Reflexion 30.05.2024

Wir konnten grosse Fortschritte machen heute mit dem Backend, wir haben uns auch bereits entschieden wie wir in der Zukunft weiter machen werden, und was noch fehlt.

Jedoch haben wir gerade eine Änderung im backend, wegen der die Endpoints nicht mehr funktionieren. Das ist aber korrekt, da das Problem eigentlich ist, dass das Passwort hashing noch nicht fertig funktioniert.

Was heisst, dass der User sich lediglich nicht Authorisieren / Authentisieren kann.

Wir sind überzeugt, dass unser Projekt ein Gutes Resultat erreichen wird.

Leider konnten wir daher im Frontend nicht viel weiteres machen, da nur noch die Endpoints fehelen.
