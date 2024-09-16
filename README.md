 # Home-Assignment

Taboola Assignement

My web project consist of backend with nodejs and frontend with react.

Backend :
1) I created a server in index.js file with nodejs and used express framework for implement this server.
2) My server is running on port 5001.
3) My server has 2 end point:
   
	a) '/api/messages' - call to 'https://cdn.taboola.com/mobile-config/home-assignment/messages.json' with fetch and get valid urls
from there.

	b)'/api/data' - call to 'https://cdn.taboola.com/mobile-config/home-assignment/data.json' with fetch and get all data from
there.

5) In order to run my server, you only need to run : node index.js in the true path like Taboola_Home_Assignment\Home-Assignment\backend.

Frontend : 
1) My frontend is in home-assignment directory.
   
2) In src directory I have 2 importmant parts :
   
	a) ApiService.js file - there I call to my server and get what i need.

	b) Components directory that consist of UrlList.js and UrlItem.js files that are the main parts of my frontend app.

4) In UrlList.js file I try first to display what the assignement request from me. I implemented that with useRef. After first display, 
   I use setInterval to call getList function each one minute and get again all data if something changed in data.
   
6) In order to run my front app, you only need to run : npm start in the true path like Taboola_Home_Assignment\Home-Assignment\home-assignment.
 
