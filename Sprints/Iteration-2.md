
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
| Skriva kod för dietdetails/addmeal                 |                       |                                   | 1           |         6   |
| Skriva kod för dietdetails/addmeal  fetch          |                       |                                   | 1           |         3   |
| Skriva kod för dietdetails/addmeal  create         |                       |                                   | 1           |         2   |
| Skriva kod för dietdetails/addmeal  put            |                       |                                   | 1           |         2   |
| Skriva kod för dietdetails/addmeal  delete         |                       |                                   | 1           |         4   |
| Skriva kod för activitydetails                     |                       |                                   | 2           |         3   |
| Skriva kod för activitydetails/addactivity         |                       |                                   | 1           |         1   |
| Skriva kod för activitydetails/addactivity  fetch  |                       |                                   | 1           |         6   |
| Skriva kod för activitydetails/addactivity  create |                       |                                   | 1           |         1   |
| Skriva kod för activitydetails/addactivity put     |                       |                                   | 1           |         1   |
| Skriva kod för activitydetails/addactivity delete  |                       |                                   | 1           |         1   |
| Skriva kod för scheduledetails                     |                       |                                   | 2           |         1   |
| Skriva kod för scheduledetails/addschedule         |                       |                                   | 1           |         1   |
| Skriva kod för scheduledetails/addschedule  fetch  |                       |                                   | 1           |         0   |
| Skriva kod för scheduledetails/addschedule  create |                       |                                   | 1           |         0   |
| Skriva kod för scheduledetails/addschedule  put    |                       |                                   | 1           |         0   |
| Skriva kod för scheduledetails/addschedule  delete |                       |                                   | 1           |         0   |
| Skriva kod för petdetails                          |                       |                                   | 2           |         1   |
| Skriva kod för petdetails/addpetdetails            |                       |                                   | 1           |         1   |
| Skriva kod för petdetails/addpetdetails fetch      |                       |                                   | 1           |         1   |
| Skriva kod för petdetails/addpetdetails create     |                       |                                   | 1           |         0   |
| Skriva kod för petdetails/addpetdetails  put       |                       |                                   | 1           |         0   |
| Skriva kod för petdetails/addpetdetails  delete    |                       |                                   | 1           |         0   |
| Fundera över projectidé på promenad/i bilen        |                       |                                   | 2           |         1   |
| Skriva Sprint BackLogs                             |                       |                                   | 1           |         1   |
| Testing functions for ActivityDetails              | 6 –Activity Management|[6 ✅](/Testning/Testrapport-2.md)| 2            |        4    |
| …                                                  | …                     | …                                 | …           | …           |
|                                                    |                       | Summa                             | 37          |         52  |
|                                                    |                       | Tid sedan föregående iteration    |             |         91  |
|                                                    |                       | Tid totalt i projektet            |             |         141 |