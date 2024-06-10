Testspecifikationen visar hur testningen ska gå till och hur testning genomförs. 

Några angreppssätt för testning är:

* Test cases skrivs med hjälp av kraven. Testar så att systemet har den förväntade funktionaliteten ofta hittar man även svagheter i kraven när denna typ av testfall skrivs.
* Negativ testning – Använder “olämplig indata” och testar förväntade felmeddelanden. Testar det man inte ska kunna göra i systemet även detta ger ofta upphov till förbättrade och nya krav (t.ex. krav för felhantering)
* Automatiserad testning, kod skrivs som testar den kod som finns i systemet automatiskt. Testar att funktionerna i koden fungerar som tänkt. Finns även “robotar” som testar automatiskt via användargränssnittet t.ex. selenium.
* Explorativ testning, testaren använder systemet och loggar vad hen gör, om något oväntat dyker upp kan sedan ett testfall skapas med hjälp av loggen. Kan också ge en lista med förbättringspunkter och inte bara buggar.
* Stresstestning, systemet testas under extrema förhållanden (t.ex. väldigt mycket data, väldigt många användare, väldigt lite minne etc) för att se hur systemet reagerar under dessa omständigheter. Avslöjar ofta problem som kan vara svåra att hitta annars.
* Användartester – slutanvändare får använda systemet för att utföra sina tänkta uppgifter. Problem och kommentarer som uppkommer tas till vara. Kan används för att utvärdera användarvänlighet eller att jämföra olika tillvägagångssätt (A/B – testning). I detta projekt kan användartester göras så enkelt som att låta en eller flera kamrater använda systemet.

### Testning i projektet
I detta projekt vill vi att ni strävar efter att sätta upp en testmiljö där ni kan utföra automatiserad testning i form av enhetstestning och integreringstester. Du får själv undersöka vad det finns för verktyg kring testning för just den plattform du jobbar för. Oftast finns det färdiga testramverk som hjälper dig med detta så som mocha för javascript: https://www.youtube.com/watch?v=Q8Jl85FJz4E

Tänk också på att utforma din kod så att den blir testbar. Se till att varje funktion/funktion/modul/metod gör en sak som är enkel att skriva tester till. Naturligtvis är det svårt att testa hela applikationen med dessa automatiska tester eller att man inte kan/klarar sätta upp en automatiserad testningsmiljö för sin plattform. Då kan användartester utformas som man på ett noggrannare sätt måste beskriva i sin dokumentation (se nedan).

Testspecifikationen bör innehålla **en testplan** där testverktyg och din strategi för hur applikationen testas gås igenom. **Kort sagt hur en oberoende testare kan genomföra testerna som hör till applikationen.** Vilka tester finns, vilka delar testar de, vilka tester är ev. automatiserade, hur kör man igång dessa tester, vilka tester är manuella, hur går dessa tester till (steg-för-steg), när är de gjorda o.s.v. Vilka delar av applikationen är eventuellt inte testad.

Förutom en testplan **ska testspecifikationen innehålla en beskrivning de "test suits" som finns** och hur dessa är kopplade till de krav som finns på applikationen samt var i projektet man kan hitta dessa. Varje "test suit" består av flera "test cases" (testfall) för att täcka upp olika möjligheter i koden.

* Test suit - Inloggning till systemet
    * Testfall 1 - inloggning med korrekta uppgifter
    * Testfall 2 - Inloggning med felaktigt användarnamn
    * Testfall 3 - Inloggning med felaktigt lösenord
    * ...

Använder man automatiserad testning med hjälp av testramverk (så som mocha för javascript) dokumenteras testfallen med själva testkoden  (ge dem bra beskrivningar som tydligt visar vad testningen går ut på). Gör man användartester ska varje test case dokumenteras i testspecifikationen med följande information:

* Referens till vilket eller vilka krav som testas
* Indata specifikation, d.v.s. vilken indata skall användas
* Utdata specifikation, d.v.s. vilken utdata förväntas
* Steg för steg beskrivning hur testfallet genomförs (har man ett användningsfall så har man redan detta.)

**Målet är att en oberoende testare skall kunna genomföra och avgöra om avgöra om testet är lyckat eller inte.** Glöm inte heller att testning inte enbart är ett mekaniskt arbete, försök att vara kreativa era testfall och hitta kluriga situationer som ni inte tänkt på.

Testning över lag är ett svårt område och det kan alltid finnas buggar i ett system. Ett tecken på att man inte testar bra är att man inte hittar några buggar. **Arbeta kontinuerligt med testningen, prioritera testning av riskfyllda delar och vänta inte med testning till slutet! Glöm inte heller att använda din projektgrupp där ni hela tiden kan testa varandras applikationer och på så sätt hitta buggar**