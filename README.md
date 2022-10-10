Completed User Stories:
##
As an Assessor:-


I should be able to create tests from 24 different categories and set other parameters ( Time duration , Test Expiry ) )
I should be able to take tests.
I should be able to view tests created by me and results of those tests given by others .

#####################
####### As an Examine

I should be able to take tests after providing my information (like email name , test pin ).
I should be able to take each test only once. 
I should not be able to take tests after its expiry.
The test should auto-submit when the time expiries.
The test is dynamic with difficulty starting from lvl 5 and upon each correct answers difficulty increases with +5 in score and -2 on every wrong answer with difficulty decreased questions;


###
As a secure app
No one should have access to test information or test results without authentication.
Test questions keeps changing to avoiding cheating.

##
Tech-Stack
Front-End:

The front-end is developed using HTML5 , CSS3 and React (a modern javascript-framework).
React-Router-DOM is used for navigating between different view of the SPA.
LocalStorage is used for client side caching.
React-Modal is used to creating popups.
d3 was used to output the trend of score at the end of the test

Back-End:
The backend is developed in Nodejs (a javascript runtime envionment), ExpressJS (a minimalistic web framework) and MongoDB (as a database).
Mongoose(Object-Document-Mapper) is used to help writing queries for CRUD operations in JS as an alternative to NoSQL.
bcryptjs is used to store passwords as hashed passwords.
JWT(Javascript web token) authorization is used to authorize access to protected endpoints.
The backend is responsible for serving both the front-end and the back-end.


Connecting Front-End with Back-End:
Axios a promise based http library is used to connect the front-end and the backend.




