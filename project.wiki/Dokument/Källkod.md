Den kanske viktigaste och definitivt mest detaljerade dokumentationen av systemet sker i källkodsform. Här ingår självklart också den testkod du skrivit. Källkoden representerar det sista steget innan systemet kan översättas till ett binärt format av en kompilator eller interpretator. För att kunna vidareutveckla ett system ställs höga krav på kvalité i källkoden, beroende på språk och teknik finns olika saker att tänka på men generella regler är:

* Följ en genomgående kodstandard för att göra koden lättläst och snygg: t.ex indentering, namngivning.
* Namnge element med syfte på vad elementet faktiskt används till, t.ex. variabler och id:n. Byt namn om syftet ändras.
* Stora block/filer är svåra att förstå och hantera: dela hellre upp i mindre delar.
* Följ ev. standarder inom området t.ex. för HTML och CSS. Använd valideringsverktyg. Hinta din javascriptkod.
* Kommentarer skall fokusera på varför en viss koddel används och inte vara en upprepning av koden i textform.
* Välj enkla tydliga lösningar över “framtidssäkra” mer komplicerade lösningar.
* Undvik uppenbart dåliga lösningar som t.ex. globala variabler, hårdkodade konstanter eller parallella vektorer istället för en klass/objektstruktur.
* Undvik att duplicera kod och data.


