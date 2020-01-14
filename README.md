# Duly-Noted
### Express yourself in a simple note taking app
* Deployed Application: https://arcane-waters-66459.herokuapp.com/

This application can be used to write, save, and delete notes. It uses an express backend to save and retrieve note data from a JSON file.

# Design Notes

The application frontend was already created, and the challenege was to build the backend (server.js) and connect the two.

## Viewing and using the website
Follow the link to the deployed application above, or 

Download the repo:

Install the node dependencies:
`npm instal`
* express _for handling local server and interface_

 and then initalize the server by running:
`node server.js`

Here is an example of the front end:
![Mainpage Screenshot Demo](/public/assets/images/Duly_noted_ex.png)

### HTML Routes
There are two pages accessed by
* `/` or `*`(wildcard/no matching route) - `index.html`, or Home page
* `/notes` - `notes.html`, where notes can be viewed and edited

### API Routes

  * GET `/api/notes` -  `db.json` returns file of saved notes as JSON.

  * POST `/api/notes` - new note from the request body, adds it to the `db.json` file

  * DELETE `/api/notes/:id` - Deletes note with matching 'id' 

All website assets are contained within the repo (https://github.com/anzook/Duly-Noted)


## Acknowledgements and Credits

Website created as an assignment for the Johns Hopkins full-stack web development bootcamp (in partnership with Trilogy Education Services).
Guidance and assistance provided by:
* Stetson Lewis (Instructor)
* Donald Hesler (TA)
* Dan Thareja (Inspiration)
