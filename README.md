# Exercise Tracking App
### Description:
The exercise tracking app is a web app built using Node.js and React.js. It allows users to track their workout history on the web. A user must add the following attributtes for each exercise they wish to add via the add exercise page: name, reps, weight, units, and date. The only valid units are pounds and kgs, if another unit is entered the user will recieve an alert that asks them to please use one of the two valid inputs "kgs" or "lbs". 
### Features:
1. A user can add an exercise by using the add exercise which sends a "POST" request to the express.js server.
2. A user can delete an exercise by clicking the trash can icon on the homepage. This action sends a "DELETE" request to the express.js server.
3. A user can update any attribute of an exercise by clicking the pencil icon on the homepage. The user will be redirected to the edit exercise page which will send a "PUT" Request to the express.js server.
4. After any action is sent the homepage is reloaded to display the most up to date information to the user.

### Technologies Used:
Server - Node.js and Express.js
Client - React.js
Database - MongoDB

