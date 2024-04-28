
**Sprint backlog v2**
**Analys av föregående iteration.**
I have now started to implement the different functions of the application. It is now possible to add details for your pet, add diet for your pet, add activites for your pet and add a schedule for your pet. All the practicality withing these functions do not work yet, except for the function to add activities. For this function, I have implemended full CRUD capability in harmony with mongoDB. I spent the best parts of two days to try to figure out why application wasn't fetching data correctly from my database. I logged out everything to troubleshoot but everything seemed fine, even with the logs. In the end it was something as trivial as forgetting to look for the _id for the object to fetch. In my baseschema I had previously defined a function to remove the _id from the object.


#### Tidsrapport

| Uppgift                                            | Krav                  | Teststatus                        | Skattad tid | Verklig tid |
|----------------------------------------------------|-----------------------|-----------------------------------|-------------|-------------|
| Titta på video Blogg                               |                       |                                   | 1           |         1   |
| Gå igenom material på kurshemsidan                 |                       |                                   | 2           |         2   |
| Research av React                                  |                       |                                   | 2           |         1   |
| Skriva kod för dietdetails                         |                       |                                   | 1           |         8   |
| Skriva kod för dietdetails/addmeal                 |                       |                                   | 5           |         17  |
| Skriva kod för activitydetails                     |                       |                                   | 7           |         13  |
| Skriva kod för scheduledetails                     |                       |                                   | 7           |         2   |
| Skriva kod för petdetails                          |                       |                                   | 7           |         3   |
| Fundera över projectidé på promenad/i bilen        |                       |                                   | 2           |         1   |
| Skriva Sprint BackLogs                             |                       |                                   | 1           |         1   |
| Testing functions for ActivityDetails              | 6 –Activity Management|[6 ✅](/Testning/Testrapport-2.md)| 2            |        4    |
| …                                                  | …                     | …                                 | …           | …           |
|                                                    |                       | Summa                             | 37          |         52  |
|                                                    |                       | Tid sedan föregående iteration    |             |         91  |
|                                                    |                       | Tid totalt i projektet            |             |         141 |