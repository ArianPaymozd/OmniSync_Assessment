# NOTES!
I would say I spent about 80% of my time on environment setup and TS configs and the other 20% coding! I am use to implementing basic features like this in a few hours but having to reinstall my VM, install all the software, and configure TypeScript took a lot more time than I would have liked since I don't do it too often! The hardest part was connecting my postgres database, it has been a year or so since I've had to do that with a docker container and it threw me for a loop for a good few hours.

# Getting Started!
To start the project just go to the root directory where the docker-compose.yml is located and run npm install (just to be safe) and 'docker compose up --build'. Everything should start up automatically

# Environment Dependencies
To run this project you need the following software installed:
Docker,
Node,
Postgres,

# PORTS
nodeserver: 8000
reactapp: 3000
postgres: 5433
