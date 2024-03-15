# FuelQuote4353 Web App

**Backend**:<br>
Step 1: Open VSCode, Clone and Fetch this branch from Github.<br>
Step 2: In VSCode terminal, ```cd``` into root folder <br>where you can see ```Pipfile``` and ```requirements.txt```. <br>
Step 3: Delete the ```Pipfile``` here.<br>
Step 4: Create a virtual environment by typing in the terminal: ```pipenv shell```.<br>
Assumming you already installed ```pipenv``` and ```pip```.<br>
Step 5: Install requirements by entering: ```pip install -r requirements.txt```<br>
Step 6: Create a```.env``` file in the root folder, <br>create variables ```SECRET_KEY```, ```ALLOWED HOSTS```, ```DEBUG```, and ```DATABASE_URL```, enter their values, then save.<br>
Step 7: Type ```python manage.py runserver``` to start the backend<br><br>

**FrontEnd**:<br>
Step 1: Open another Terminal, ```cd``` into the ```frontend``` folder,<br> 
Step 2: Create a```.env``` file, <br>create a variable ```REACT_APP_API_BASE_URL```, enter the URL then save.<br>
Step 3: Delete the ```package-lock.json``` file, then enter ```npm install```, then ```npm start```<br>
Step 4: Open ```localhost:3000``` and try out the features<br>
**Note:** May have to install missing packages and modules: try to Google the errors and solutions/commands to install packages are usually on Stackoverflow.
<br><br>

**Most features are available:**<br>
    - Log in / Register <br>
    - Profile Update <br>
    - Request a Quote <br>
    - Quote History <br>
    - Front End is hosted on Render.com<br>
    - Back End + PostgreSQL DB are hosted on Azure Web Service<br><br>

**To Do list:**<br>
    - Unit Tests<br>
    - Pricing Module<br>

**Project Deployment URL:** https://cs4353.lemonadess.com/<br>