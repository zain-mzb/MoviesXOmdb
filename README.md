# Project Name : MoviesXOmdb

## Repo Contains :
### Frontend and Backend Folders

## How to start the project
 
Do "npm install" on both Frontend and Backend Folders

In the Backend we will need a .env file for the Mongo URI. For example: MONGO_URI=mongodb://localhost:27017/OMDB

- You need Mongo locally on your system to be able to store data

## Architecture Design

### Frontend

Frontend in based on React with Material UI as a styling library.
It is dark themed, responsive and uses Axios for API connectivity.

### Backend

Backend is based on Node + Express and Mongo as a Database with Mongoose as a ODM.
Backend is based on MVC architecture.
With Routes and Controllers folders containing the routing and main data logics respectively.

## Approach

First the OMDB API gets a hit from the Backend including the parameters of Title and Year.
But in OMDB the data for search parameters returns very few fields instead of whole data.
So after getting and storing this data in the Mongo DB. 

Another request is sent to OMDB API with the respective IDs of the previous data for complete data covereage. This detailed data is again store in the Database and is used for Modal and Search purposes.