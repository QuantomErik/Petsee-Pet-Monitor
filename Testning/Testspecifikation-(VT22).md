>Testspecifikationen visar hur testningen ska gå till och hur testning genomförs.
>
>Några angreppssätt för testning är:
>
>* Testfall skrivs med hjälp av kraven. Testar så att systemet har den förväntade funktionaliteten ofta hittar man även svagheter i kraven när denna typ av testfall skrivs.
>* Negativ testning – Använder “olämplig indata” och testar förväntade felmeddelanden. Testar det man inte ska kunna göra i systemet även detta ger ofta upphov till förbättrade och nya krav (till exempel krav för felhantering)
>* Automatiserad testning, kod skrivs som testar den kod som finns i systemet automatiskt. Testar att funktionerna i koden fungerar som tänkt. Finns även “robotar” som testar automatiskt via användargränssnittet till exempel selenium.s
>* Explorativ testning, testaren använder systemet och loggar vad hen gör, om något oväntat dyker upp kan sedan ett testfall skapas med hjälp av loggen. Kan också ge en lista med förbättringspunkter och inte bara buggar.
>* Stresstestning, systemet testas under extrema förhållanden (till exempel väldigt mycket data, väldigt många användare, väldigt lite minne etc.) för att se hur systemet reagerar under dessa omständigheter. Avslöjar ofta problem som kan vara svåra att hitta annars.
>* Användartester – slutanvändare får använda systemet för att utföra sina tänkta uppgifter. Problem och kommentarer som uppkommer tas till vara. Kan används för att utvärdera användarvänlighet eller att jämföra olika tillvägagångssätt (A/B – testning). I detta projekt kan användartester göras så enkelt som att låta en eller flera kamrater använda systemet.
>
>## Testning i projektet
>
>I detta projekt kommer du i första hand att skapa manuella tester, men även sträva efter att sätta upp en testmiljö där du kan utföra automatiserad testning i form av enhetstestning och integreringstester. Du får själv undersöka vad det finns för verktyg kring testning för just den plattform du jobbar för. Oftast finns det färdiga testramverk som hjälper dig med detta så som Jest för JavaScript, https://youtu.be/ajiAl5UNzBU.
>
>Tänk också på att utforma din kod så att den blir testbar. Se till att varje funktion/funktion/modul/metod gör en sak som är enkel att skriva tester till. Naturligtvis är det svårt att testa hela applikationen med dessa automatiska tester eller att du inte kan/klarar sätta upp en automatiserad testningsmiljö för din plattform. Då kan användartester utformas som du på ett noggrannare sätt måste beskriva i dokumentationen (se nedan).
>
>Testspecifikationen bör innehålla __en testplan__ där testverktyg och din strategi för hur applikationen testas gås igenom. __Kort sagt hur en oberoende testare kan genomföra testerna som hör till applikationen.__ Vilka tester finns, vilka delar testar de, vilka tester är eventuellt automatiserade, hur kör man igång dessa tester, vilka tester är manuella, hur går dessa tester till (steg-för-steg), när är de gjorda, o.s.v. Vilka delar av applikationen är eventuellt inte testad.
>
>Förutom en testplan __ska testspecifikationen innehålla en beskrivning de testsviter som finns__ och hur dessa är kopplade till de krav som finns på applikationen samt var i projektet man kan hitta dessa. Varje testsvit består av flera testfall (test cases) för att täcka upp olika möjligheter i koden.
>
>* Testsvit - Inloggning till systemet
> * Testfall 1 - inloggning med korrekta uppgifter
> * Testfall 2 - Inloggning med felaktigt användarnamn
> * Testfall 3 - Inloggning med felaktigt lösenord
> * ...
>
>Använder du automatiserad testning med hjälp av testramverk (så som Jest för JavaScript) dokumenteras testfallen med själva testkoden (ge dem bra beskrivningar som tydligt visar vad testningen går ut på). Gör du användartester ska varje testfall dokumenteras i testspecifikationen med följande information:
>
>* Referens till vilket eller vilka krav som testas
>* Indata specifikation, d.v.s. vilken indata skall användas
>* Utdata specifikation, d.v.s. vilken utdata förväntas
>* Steg för steg beskrivning hur testfallet genomförs (har man ett användningsfall så har man redan detta.)
>
>__Målet är att en oberoende testare skall kunna genomföra och avgöra om avgöra om testet är lyckat eller inte.__ Glöm inte heller att testning inte enbart är ett mekaniskt arbete, försök att vara kreativa med dina testfall och hitta kluriga situationer som du inte tänkt på.
>
>Testning över lag är ett svårt område och det kan alltid finnas buggar i ett system. Ett tecken på att du inte testar bra är att du inte hittar några buggar. __Arbeta kontinuerligt med testningen, prioritera testning av riskfyllda delar och vänta inte med testning till slutet! Glöm inte heller att använda din projektgrupp där ni hela tiden kan testa varandras applikationer och på så sätt hitta buggar.__
>
># Exempel Testplan och testspecifikation

## Målbeskrivning

Målet med detta dokument är att skapa överblick över testningen i projektet och sedan dokumentera de enskilda manuella testerna.

## Vad kommer testas och hur?

Här kommer fokus vara på manuella testfall för de delar som är implementerade (UC1). Vi väntar med att skriva tester för delar som ej ännu har kod (UC2).

Vi kommer även skriva automatiska enhetstester för [NameDAL](https://github.com/dntoll/1dv600/blob/master/Greeter/src/Greetings/NameDAL.java)-methods in the class [NameDALTest](https://github.com/dntoll/1dv600/blob/master/Greeter/tests/Greetings/NameDALTest.java)
Varje metod får minst två testfall.

## Manuell testning

Matris för att visa vilka krav som täcks av vilka manuella testfall.

| Test      | UC1 | UC2  |
| --------- |:----:| :---:|
| TC1.1     | OK | 0    |
| TC1.2     | OK | 0    |
| COVERAGE & SUCCESS   | OK    | 0    |

>👉 __Tips!__ Observera att UC1 här har två tester medan UC2 inte har något test. Vissa tester kan sträcka sig över flera krav.

### TC1.1 Store name successful

>👉 __Tips!__ TC1.1 betyder Use case 1 testfall 1. Genom att testfallens kod blir knuten till vilket testfall de testar får vi spårbarhet och kan till exempel ta bort onödiga test om ett testfall tas bort. Vi har både ett kort namn TC1.1 och ett fullständigt namn med mer innehåll "TC1.1 Store name successful"

Use case: UC1 Store a Name

Scenario: Store name successful

![Scenario](http://yuml.me/567ad1fe.png)

>👉 __Tips!__ Genom att visa vilka delar av testfallet som täcks av ett visst scenario så blir det tydligt hur man tänkt uppnå ”coverage” av scenariot.

The main scenario of UC1 is tested where a user stores their name successfully.

Precondition: There must NOT be a name.txt file in ./Greeter/data, remove it if it's there.

>👉 __Tips!__ Förkrav kan vara steg i annat testfall så om två testfall delar flera steg så kan man ha dem separat och säga Precondition: TC1.0. Det ska normalt vara villkor som måste vara uppfyllda för att stegen skall kunna utföras.

#### Test steps

* Start the app
* System shows "Fill in a username:"
* Enter the name "Johnny" and press enter

>👉 __Tips!__ Notera att vi inte skriver "Enter a name" utan "Johnny" genom att vara specifik blir vi tydliga och det blir lättare att repetera testfallet samt att automatisera det.

### Expected

* The system should show the text "Name Johnny Stored"

>👉 __Tips!__ Notera även här den specifika utdatan.

* Also output from UC2. Not implemented

### TC1.2 Store empty name force reprompt

Use case: UC1 Store a Name

Scenario: Store empty name force reprompt. The alternate scenario where the user enters an empty username and is forced to enter a new username.

![Scenario](http://yuml.me/ad6e0e55.png)

Precondition: There must NOT be a name.txt file in ./Greeter/data, remove it if its there.

#### Test steps

* Start the app
* System shows "Fill in a username:"
* press enter without entering a name

### Expected

* The system should show the text "A username must have at least one character, try again"
* System shows "Fill in a username:" and waits for input
