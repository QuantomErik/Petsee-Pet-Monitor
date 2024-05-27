> I kravspecifikationen beskriver du din applikations olika krav.

## 1. Funktionella krav (Frivilligt)

>Om du har ett behov av att skriva något eller några krav mer i ett sammanhang till exempel som användningsfall (use cases) kan det vara klumpigt att göra det i form av ”issues”. Om du vill kan du i så fall lägga in ett eller flera funktionella krav i kravspecifikationen. Delar av ditt krav kan då länkas till respektive issue i din backlog.

Use Case 1: User Registration
Beskrivning: Användaren ska kunna registrera sig genom att fylla i ett formulär med användarnamn, lösenord och e-postadress.
Input:
Användarnamn: "testuser"
Lösenord: "testpassword"
E-post: "testuser@example.com"
Output: Användaren blir registrerad och omdirigerad till inloggningssidan eller visas ett framgångsmeddelande.

Use Case 2: User Login
Beskrivning: Användaren ska kunna logga in genom att ange sitt användarnamn och lösenord.
Input:
Användarnamn: "peter"
Lösenord: "aaaaaa"
Output: Användaren loggas in och omdirigeras till hemsidan. "Register" och "Login" knappar försvinner från Navbar och "Logout" knapp visas.
Use Case 3: Pet Management
Beskrivning: Användaren ska kunna hantera sina husdjurs information inklusive att lägga till, redigera och ta bort husdjur.
Input:
Lägg till nytt husdjur: Namn: "test"
Redigera husdjur: Byt namn från "test" till "test2"
Ta bort husdjur: "test2"
Output: Nytt husdjur visas på "More" sidan, uppdaterad information visas efter redigering, och husdjur tas bort efter radering.
Use Case 4: Diet Management
Beskrivning: Användaren ska kunna hantera sitt husdjurs diet genom att lägga till, redigera och ta bort måltider.
Input:
Lägg till måltid: Namn: "Kalle", Typ: "Snack", Kvantitet: 10 gram
Redigera måltid: Ändra kvantitet från 5 gram till 10 gram
Ta bort måltid: "Snack"
Output: Ny måltid visas med korrekt information, uppdaterad information visas efter redigering, och måltid tas bort efter radering.
Use Case 5: Activity Management
Beskrivning: Användaren ska kunna hantera sitt husdjurs aktiviteter genom att lägga till, redigera och ta bort aktiviteter.
Input:
Lägg till aktivitet: Typ: "Promenad", Varaktighet: 30 minuter, Intensitet: "Medel"
Redigera aktivitet: Ändra varaktighet från 30 till 60 minuter
Ta bort aktivitet: "Promenad"
Output: Ny aktivitet visas på aktivitetsdetaljsidan, uppdaterad information visas efter redigering, och aktivitet tas bort efter radering.
Use Case 6: Schedule Management
Beskrivning: Användaren ska kunna hantera sitt husdjurs schema genom att lägga till, redigera och ta bort scheman.
Input:
Lägg till schema: Datum: "2024-05-27", Notering: "Veterinärbesök"
Redigera schema: Ändra notering till "Vaccination"
Ta bort schema: "Veterinärbesök"
Output: Nytt schema visas på schemadetaljsidan, uppdaterad information visas efter redigering, och schema tas bort efter radering.
Use Case 7: To-do List
Beskrivning: Användaren ska kunna hantera en att-göra-lista genom att lägga till, redigera och ta bort uppgifter.
Input:
Lägg till uppgift: Namn: "test"
Redigera uppgift: Ändra namn från "test" till "test2"
Ta bort uppgift: "test2"
Output: Ny uppgift visas på dashboard, uppdaterad information visas efter redigering, och uppgift tas bort efter radering.

## 2. Ickefunktionella produktkrav (non-functional product requirements)

>Definiera de kvalitetskrav som finns i din applikation. Kvalitetskrav genomsyra ofta hela utvecklingen och påverkar systemet som en helhet. Det går därför oftast inte att hantera dem som ett enskilt ”issue”. Glöm inte bort att fundera över testbarhet när det gäller dina kvalitetskrav. Det kan också finnas en poäng i att ytterligare analysera ev. olika typer av användare i systemet.

Prestanda
Applikationen ska kunna hantera minst 1000 samtidiga användare utan märkbar prestandaförlust.
Svarstiden för alla API-anrop ska vara mindre än 300ms.

Skalbarhet
Applikationen ska vara byggd för att enkelt kunna skala både horisontellt och vertikalt för att hantera ökad belastning.
Molntjänster ska användas för att möjliggöra automatisk skalning.

Tillgänglighet
Applikationen ska följa WCAG 2.1 AA standarder för att säkerställa tillgänglighet för alla användare, inklusive de med funktionsnedsättningar.

Säkerhet
Alla användardata ska krypteras både under överföring och vid lagring.
Applikationen ska följa GDPR-krav för att säkerställa användarnas integritet och dataskydd.

Användarupplevelse
Applikationen ska ha en intuitiv och användarvänlig gränssnitt för att säkerställa hög användarengagemang.
Regelbundna användbarhetstester ska genomföras för att kontinuerligt förbättra användarupplevelsen.

## 3. Organisationskrav (non-functional organizational requirements)

>Krav kring hur du ska arbeta och hur utvecklingen ska ske. Exempel på krav kan vara programspråk, utvecklingsmiljö, och/eller vilka plattformar systemet ska köras/levereras på.

### 3.1 Versionshantering

>Beskriv din versionshanteringsstrategi och om, och i så fall vilket arbetsflöde du tänker använda.

GitLab ska användas för versionshantering med GitLab som fjärrepo.
Arbetsflödet ska följa GitFlow-modellen för att säkerställa strukturerad och effektiv hantering av kodbasen.

### 3.2 Kodstandard

>Beskriv vilken kodstandard du tänker använda och dokumentera vilka avsteg du kommer att göra från denna.

JavaScript Standard Style, Eslint @ lnu,  ska användas som kodstandard för hela projektet.
Eventuella avvikelser från standarden ska dokumenteras och godkännas av projektledaren.

### 3.3 Koddokumentation

>Beskriv hur du kommer att arbeta med dokumentation av din kod och om detta kommer att generera någon extern dokumentation av din applikation (exempelvis API-dokumentation).

Mer komplex kod ska dokumenteras med JSDoc-kommentarer.


## 4. Externa krav (non-functional external requirements)

### 4.1 Etiska krav

>Vilka eventuella etiska förhållningsregler och krav har din applikation? Är det moraliskt försvarbart att skapa den applikation du tänker dig skapa? Finns det någon individ som kan komma till skada fysiskt eller känslomässigt av din applikation? Vad kan hända om applikationen brister i funktion eller säkerhet? Finns det miljö eller samhälleliga aspekter som bör beaktas?

Applikationen ska vara moraliskt försvarbar och inte orsaka skada för någon individ.
Ingen information som samlas in får användas för att skada eller utnyttja användare eller deras husdjur.
Applikationen ska bidra till positiv hälsa och välmående för husdjur.

### 4.2 Lagar & Standarder

>Kommer du att hantera användaruppgifter? Om så, hur kommer du att hantera dessa personuppgifter och hur kommer du att upplysa användaren om att detta görs och hur användaren går tillväga för att radera dessa i enlighet med GDPR.

Alla personuppgifter ska hanteras enligt GDPR. Användare ska informeras om hur deras data hanteras och ha möjlighet att radera sina uppgifter.
En tydlig integritetspolicy ska vara tillgänglig för alla användare och beskriva hur data samlas in, används och skyddas.
