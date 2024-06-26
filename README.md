# 183_backend

## Grundkonzept

Unser Backend besteht aus express und funktioniert, indem eine MotherNode bei Start erstellt wird.

Diese MotherNode handled verschiedene ChildNodes welche je einen User darstellen.

Diese User speichern und handeln die Passwörter.

Wir haben ein React Frontend, in welchem man die möglichkeit hatsich zu Registrieren / ein zu Loggen und seine Passwörter zu verwalten.

Wenn man sich registriert wird auf dem Backend eine neue ChildNode erstellt die einen User darstellt.

In dieser werden alle Passwörter des einzelnen Users gespeichert.

Wenn ein User via FRontend sich einloggt erhält er ein JWT Token, das bei jedem weitern API Call abgefragt wird.

Wenn es nicht mehr gültig oder nicht zu dem User gehört, wird der Request blockiert.

Wenn der Request durchkommt, wird zum Beispiel eine Liste von Passwörtnern zurückgegeben,
diese werden dann wieder im Frontend decrypted und für den User bereitgestellt.

![Not found](./resources/Grundkonzept.png "Grundkonzept")

## How to use

Man Klont dieses und das Fronted repositiory auf seinen Computer und führt

1. `npm clean install`
2. `npm run start`

Um das Backend zu testen, kann man auch bei gegebenen Zugriff, die Postamn Collection nutzen.

Als erstes muss man sich via dem /Register Endpoint einen Bearer Token holen.

Danach kann man diesen in der Collection unter Variables als token mitgeben. Siehe Grafik:

![Not found](./resources/postman_vairables.png "Postman Collection Variable")

Danach kann man die bereit gestellten Endpoints benutzen.

## Reflexion 30.05.2024

Wir konnten grosse Fortschritte machen heute mit dem Backend, wir haben uns auch bereits entschieden wie wir in der Zukunft weiter machen werden, und was noch fehlt.

Jedoch haben wir gerade eine Änderung im backend, wegen der die Endpoints nicht mehr funktionieren. Das ist aber korrekt, da das Problem eigentlich ist, dass das Passwort hashing noch nicht fertig funktioniert.

Was heisst, dass der User sich lediglich nicht Authorisieren / Authentisieren kann.

Wir sind überzeugt, dass unser Projekt ein Gutes Resultat erreichen wird.

Leider konnten wir daher im Frontend nicht viel weiteres machen, da nur noch die Endpoints fehelen.

## Reflexion 06.06.2024

Wir machten gute Fortschritte mit unserem Projekt, vor allem was das zusammenspiel vom Frontend und Backend laufen.

Wir sind sehr zuversichtlich, dass wir mit unserem Projekt fertig werden.

Dazu glauben wir, dass wir es schaffen werden, dass Projekt direkt im Web zu hosten.

Gegen Ende haben wir aber unsere Zeit mehr darauf konzentriert zu Planen was noch fehlt und was wie wir diese Dinge lösen können.
