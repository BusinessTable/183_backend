# 183_backend

## Grundkonzept

Unser Backend besteht aus express und funktioniert, indem eine MotherNode bei Start erstellt wird.

Diese MotherNode handled verschiedene ChildNodes welche je einen User darstellt.

Diese User speichern und handlen die Passwörter.

Bevor Passwörter gespeichert werden werden diese natürlich via Masterpasswort encrypted.

User Backend läift dann auf einen Server.

Das FRontend greift dann via REST calls auf das backend zu.
