# Fuel4353
Tested on Windows and MacOS<br><br>
**Backend**:<br>
Step 1: Open VSCode, Clone and Fetch this branch (main) from Github<br>
Step 2: In VSCode terminal, ```cd``` into the outer ```backend``` <br>
Step 3: Delete the ```Pipfile``` here<br>
Step 4: Create a virtual environment by typing in ```pipenv shell```<br>
(Assumming you already installed ```pipenv``` and ```pip```<br>
Step 5: Install requirements by entering: ```pip install -r requirements.txt```<br>
Step 6: Create a```.env``` file in the outer ```backend``` folder, <br>create variables ```SECRET_KEY```, ```ALLOWED HOSTS```, ```DEBUG```, and ```DATABASE_URL```, enter their values, then save.<br>
Step 7: type ```python manage.py runserver``` to start the backend<br>
The backend server should start now.<br><br>

**FrontEnd**:<br>
Step 1: Open another Terminal, ```cd``` into the ```fuel_rate_calc``` folder,<br> 
Step 2: Create a```.env``` file, <br>create variables ```REACT_APP_API_BASE_URL```, enter the URL then save.<br>
Step 3: Delete the ```package-lock.json``` file, then enter ```npm install```, then ```npm start```<br>
Step 4: Open ```localhost:3000``` and try the features<br><br>
**Note:** May have to install missing packages and modules: try to Google the errors and solutions/commands to install packages are usually on Stackoverflow.
<br><br>

**Most features are available:**<br>
    - Log in / Register <br>
    - Profile Update <br>
    - Request a Quote <br>
    - Quote History <br>
    - Database: PostgreSQL is hosted on Render.com, no need to set up local database<br>
    - Front End + Back End + DB are hosted on Render.com<br><br>

**To Do list:**<br>
    - Unit Tests<br>

**Project Deployment URL:** https://cs4353.lemonadess.com/
Render spins down a Free web service that goes 15 minutes without receiving inbound traffic. Spinning up a service takes a few seconds up to a minute, which causes a noticeable delay for incoming requests until the service is back up and running. For example, a browser page load will hang momentarily.
