# FuelQuote4353 Web App

**Backend**:<br>
Step 1: Open VSCode, Clone and Fetch this branch from Github.<br>
Step 2: In VSCode terminal, ```cd``` into root folder where you can see ```Pipfile``` and ```requirements.txt```. <br>
Step 3: Delete the ```Pipfile``` here.<br>
Step 4: Create a virtual environment by typing in the terminal: ```pipenv shell```.<br>
(Assumming you already installed ```pipenv``` and ```pip```.)<br>
Step 5: Install requirements by entering: ```pip install -r requirements.txt```.<br>
Step 6: Type ```python manage.py runserver``` to start the backend server.<br><br>

**FrontEnd**:<br>
Step 1: Open another VSCode Terminal, ```cd``` into the ```frontend``` folder.<br> 
Step 2: Create a ```.env``` file, <br>type in ```REACT_APP_API_BASE_URL=http://localhost:8000/api```, then save.<br>
Step 3: Delete the ```package-lock.json``` file, then enter ```npm install```, then ```npm start```.<br>
Step 4: Open ```localhost:3000``` and try out the features.<br><br>

**Note:** May have to install missing packages and modules: try to Google the errors and solutions/commands to install packages are usually on Stackoverflow.
<br><br>

**Most features are available:**<br>
    - Log in / Register <br>
    - Profile Update <br>
    - Request a Quote <br>
    - Quote History <br>
    - Pricing Module<br>
    - PostgreSQL DB hosted on Render.com<br><br>

**To Do list:**<br>
    - Unit Tests<br>
    - Implement best practices<br>
