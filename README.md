# vivid-scheduler
The Team: Sophia Chen, Jack Walton, Reena Zhang, Alice Qiao

About: This project is an artistic scheduler for VIVID, Vanderbilt's premier KPOP dance group. It will display a timeline with details for each project to help VIVID's artistic members to keep track of what they're working on. Artistic team members are those who work on the production side of videos, such as editing and filming. 

Code Specifications: Our code is mainly written in TypeScript. We have included code that is supposed to take the information from the Create Project form and write it to a database. You are able to update projects and delete projects from the Update Project form. Creating and updated projects are restricted for admin only access. The database will store information about all the projects that the admin has created. The calendar page will then pull all of the projects and display them on the calendar based on the dates they are associated with. The gantt chart will also pull all of the projects and display them as a horizontal timeline. You can mark a project as completed in the Display Project form, and they will then be added to the portfolio page, so everyone will be able to see the final videos. 

Framework: Our system archicture will model the MeanStack. Our front end will be written with the Angular framework. 

# Development Server
First, clone the repo. Connect to port 27017, and start up server in /server. Then, start up front end in /app.

# Testing
Front end: The tests are the file in each component folder. Navigate to app/src/app, and then in each component folder, there should be a test file titled .spec.ts. The tests use the Jasmine framework to make a mock to track calls to a service. It also ensures proper building of each component and checks that forms validate input properly. To run the tests, navigate to /app and run "npm test". 

Back end: The tests are in the tests folder. Navigate to server/tests, and you will see the files data.json and project-test.js. To run the tests, navigate to /server and run "npm test".

# Website
Go to vividvisualiser.com to see our deployed website. 
