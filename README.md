# Labs Anywhere

Labs Anywhere will be a web based electronic pathology which will connect Doctors, Labs and Patients all over the country. A quick solution which makes healthcare much more efficient. This system allows its users to gain access to Lab reports and connect with each other easily through any electronic device connected to the web.

## System Roles
The system will have four users viz.
* Admin
* Patients
* Doctors
* Laboratories

### ADMIN
The admin is basically the supervisor of the entire system. His/ her major functions would be:
*   Registering Doctors and Laboratories
*   Modifying Doctor and Laboratory details 
*   Handling Abuse Reports
### LABORATORY
This is an important role in the system, as it deals with every Laboratory that will be connected to the system. Each Laboratory that wishes to get connected to Labs anywhere would need to get registered to the system through the admin. Each Laboratory will have its own profile. The functions of this user would be:
*   Registering Patients
*   Update Patient Details (Adding a new test for a returning patient)
*  Generating test reports
*   Notifying patients and respective doctors about the reports
*   Recommending another laboratory to a patient due to lack of resources
### DOCTOR
Each doctor connected to the system would need to be registered through the admin of the system. The functions of this user would be:
*   Viewing Patient reports
*   Recommend a patient to another doctor
### PATIENT
Each patient connected to the system would need to be registered through the respective laboratory he/she visits. Each patient will have his/her own profile. The functions of this user would be:
* Editing personal details
* Viewing/ Downloading test reports ➢ Viewing history of reports

##  Core Functionalities
###  Messaging System
An interactive chat engine which will enable communication between the various roles for instant resolution to requests.
Laboratories can interact with patients registered by them and their respective doctors Doctors can interact with respective Laboratories and Patients
Patients can interact only with respective Laboratories
### Search
A search engine which will
- Enable Doctors to search patient records
- Patients to scan their medical history
### Forum
This section allows patients to ask any doubts which would be answered by either Laboratories or Doctors.
### Dashboard
This feature provides at-a-glance views for system analysis.

##  Technical Implementation
The primary data (Admin, Laboratories, Doctors and Patients) for the system will be stored in [MongoDB] and primary backend language will be [NodeJS].
### Course Technologies
* [React] – It will be used for making front end more interactive for the users and to provide enhanced UI.
* [Redis] - It will serve as a cache to the webserver. It will also be used for pub/sub operation required for managing socket.io connections
* [Socket.io] – It will be used to build the interactive chat engine. And to provide real-time notification to users (e.g.: new lab report received, new doctor’s appointment created, etc.)
### Independent Technologies
* [Elastic] - Elastic is a distributed, RESTful search and analytics engine. It provides many features of which we would be using its enable auditing feature. This feature helps to keep track of the events that take place in a cluster. This helps to analyze the activities of the users.
* [PassportJS] and [JSON Web Token] – PassportJS will be used as the authentication middleware for expressjs. JWT will be used to implement stateless token-based authentication.

## Development

This project is being currently being developed and we target to commit our first version of the code on second weekend of April, 2017.

#   Thank You! for your patience.



   [React]: <https://facebook.github.io/react/>
   [Redis]: <https://redis.io/>
   [Socket.io]: <https://socket.io/>
   [Elastic]: <https://www.elastic.co/>
   [PassportJS]: <http://passportjs.org/>
   [JSON Web Token]: <https://jwt.io/>
   [NodeJS]: <http://nodejs.org>
   [MongoDB]: <https://www.mongodb.com/>
   [express]: <http://expressjs.com>
 
