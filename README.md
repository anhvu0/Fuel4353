# Fuel4353
Tested on Windows and MacOS<br>
Step 1: Open VSCode, Clone and Fetch this branch (Ryan-django-mdb-ui-react) from Github<br>
Step 2: ```cd``` into the outer ```backend``` folder then type ```pipenv shell```<br>
Step 4: type ```python manage.py runserver``` to start the backend<br>
Step 5: Open another Terminal, ```cd``` into the ```fuel_rate_calc``` folder, then type ```npm start```, the front end server should start.<br>
If errors occur, delete the ```package-lock.json``` file, then enter ```npm install```, then ```npm start```<br>
Step 6: Open ```localhost:3000``` and try the features<br>
**Note:** May have to install missing packages and modules: try to Google the errors and solutions/commands to install packages are usually on Stackoverflow.
<br><br>

**Most features are available:**<br>
    - Log in / Register <br>
    - Profile Update <br>
    - Request a Quote <br>
    - Quote History <br>
    - Database: PostgreSQL hosted on Railway.app,<br> 
    no need to set up local database<br><br>

**To Do list:**<br>
    - Unit Tests<br>