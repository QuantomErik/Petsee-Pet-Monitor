>Din sprint backlog bör innehålla:
>
>* Analys av föregående iteration; en kort text kring vad som gick bra och vad som inte gick så bra.
>* Tidsrapport – skattad vs. verklig tid för varje mål, totalt arbetad tid i iterationen och projektet. _I denna kurs ska du rapportera **all** tid du lägger på projektet. Detta inkluderar teoriinläsning, dokumentation med mera._
>* Mål för iterationen i form av nedbrutna och tidsskattade krav från kravspecifikationen.
>* ”Burndown chart” – ej obligatoriskt
>
>### Enkelt exempel
**Sprint backlog v4**
**Analys av föregående iteration.**
Man kan nu göra inlägg i bloggen och texten i dessa kan formateras. Dock tog det lite längre tid än förväntat (framförallt valideringen) och därför har funktionaliteten för likes flyttats fram till denna vecka. Hade även lite problem med att få leveransen att fungera till driftsmiljön, men det visade sig vara ett lösenord till databasen som var fel, så jag ska nu implementera en miljövariabel på produktionsservern och på den lokala servern.

#### Tidsrapport

| Uppgift                                            | Krav                  | Teststatus                        | Skattad tid | Verklig tid |
|----------------------------------------------------|-----------------------|-----------------------------------|-------------|-------------|
| Delta vid kursintroduktion                         |                       |                                   | 2           | 2           |
| Skapa formulär för att skriva ett inlägg           | 2 – Skapa blogginlägg | [2 ✅ , 2 ❌](/Testning/Testrapport) | 5           | 8           |
| Validering av inlägg                               | 2 – Skapa blogginlägg | [1 ✅](/Testning/Testrapport)       | 1           | 5           |
| Fixa formatering (fetstil, kursiv, understrykning) | 2 – Skapa blogginlägg |                                   | 8           | 6           |
| Gör grafik för like knapp                          | 3 – Gilla blogginlägg | Ej påbörjat                       | 2           |             |
| …                                                  | …                     | …                                 | …           | …           |
|                                                    |                       | Summa                             | 18          | 21          |
|                                                    |                       | Tid sedan föregående iteration    |             | 46          |
|                                                    |                       | Tid totalt i projektet            |             | 67          |
