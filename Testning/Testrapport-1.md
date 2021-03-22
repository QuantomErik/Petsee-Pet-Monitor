>Testrapporten är helt enkelt ett enkelt dokument som anger resultatet av ett systemtest eller samlar återkoppling från ett mer allmänt test av en slutanvändare eller kund. Testrapporterna blir en viktig input till iterationsplaneringen och måluppfyllning.
>
>Testrapporten bör innehålla:
>
>* Datum
>* Tydlig referens till vilken version av systemet som testats. Viktigt!
>* Tydlig referens till vilket systemtest som körs
>* Tydlig beskrivning av testmiljö
>* Lista av testfall och “pass/fail” status samt ev. kommentar
>* Lista med förbättringspunkter, vad som behöver förbättras och varför.
>* Analys med en beskrivning av känslan av systemet, känns det stabilt, skakigt, vilka delar är bra, vad behöver förbättras.
>
>## Exempel Test Report

Test traceability matrix and success

| Test      | UC1 | UC2  | 
| --------- |:----:| :---:|
| TC1.1     | 1/OK | 0    |
| TC1.2     | 1/OK | 0    |
| COVERAGE & SUCCESS   | 2/OK    | 0    |



Automated unit test coverage and success.
> Tips: här kan ni med fördel använda screenshots så länge det blir tyddligt

| Test          | ConsoleView | GreetController  | Main | NameDAL |
| ------------- |:----:| :---:|:---:|:---:|
| NameDALTest   | 0 | 0| 0 | 100%/OK |
| COVERAGE & SUCCESS      | 0/NA | 0/NA | 0/NA |  100%/OK |

### Comment

All tests pass, next iteration we need to focus on UC2. 

We examined the code and most classes require mocks to be testable.
