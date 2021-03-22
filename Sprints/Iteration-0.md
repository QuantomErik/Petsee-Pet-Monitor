>Sprint backlog (iterationsplan) är en detaljerad plan för en iteration, i detta fall en vecka. Den upprättas med input från t.ex. Risklistan, Kravspecifikation, Vision, Testrapport och återkoppling från kund/slutanvändare. Denna plan uppdateras och skattas kontinuerligt under iterationen/sprinten. En grafisk status (burndownchart) kan göras om det tillför någon intressant information. Då iterationsplanen och framför allt tidsskattningar och burndownchart skall hållas uppdaterade kontinuerligt så är det ganska smidigt att antingen dela iterationsplanen i två dokument (ett för text och ett kalkylark) eller bara ha det i ett kalkylark. Att klara av att rapportera sin tid är ett obligatoriskt moment i kursen. Rapporter i efterhand godkännes ej! Slarva inte med detta!!
>
>Din sprint backlog bör innehålla:
>
>* Analys av föregående iteration; en kort text kring vad som gick bra och vad som inte gick så bra.
>* Tidsrapport – skattad vs. verklig tid för varje mål, totalt arbetad tid i iterationen och projektet.
>* Mål för iterationen i form av nedbrutna och tidsskattade krav från kravspec.
>* Burndownchart – ej obligatoriskt
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
