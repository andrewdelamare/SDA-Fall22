# SDA-Fall22

## Solita Dev Academy Finland fall 2022 pre-assignment
Status: In progress 

***
### Completed features: 

#### Data import:
- Import data from CSV files to database
- Validate data before importing
- Don't import journeys that lasted for less than ten seconds
- Don't import journeys that covered distances shorter than 10 meters
- Don't import duplicates 

Journey list view:

- List journeys
- Date selection
- Hour selection
- Pagination
- Filtering 
- Searching 
- Ordering per column
- For each journey show departure and return stations, covered distance in kilometers and duration in minutes
- For each journey departure and return stations are clickable links 

Station list:
- List all the stations
- Pagination
- Searching
- Filtering 

Single station view:
- Station name
- Station address
- Total number of journeys starting from the station
- Total number of journeys ending at the station
- Station location on the map
- Average distance of a journey starting from the station
- Average distance of a journey ending at the station
- Top 5 most popular return stations for journeys starting from the station
- Top 5 most popular departure stations for journeys ending at the station
- Ability to filter all the calculations per month

Data view:
- Total number of journeys stored in database
- Average distance of journeys stored in database
- Top 5 most popular return stations for journeys
- Top 5 most popular departure stations for journeys
- Ability to filter all the calculations per month
- Locations of top 5 popular departure and return stations on the map

Import view:
- Endpoints to store new journeys data or new bicycle stations
***
## Upcoming Features

Import view:
- UI for station input
- UI for journey input
- Form validation with react-hook-form

Tests:
- Back end tests with jest
- Front end tests with jest
- End to end tests with cypress

Deployment: 
- Cloud deployment of back-end on heroku
- Cloud deployment of front end on cloudflare
