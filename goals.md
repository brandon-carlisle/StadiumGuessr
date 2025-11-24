# Goals for the project

The game will pivot from:
 - A game where you see a location on a map and you have to guess the name of the stadium
 - To a game where you see a map and a stadium / team name and you have to guess the location of the stadium on the map (more similar to GeoGuessr but still unique)
 - The game is now "Where is the Stadium?" instead of "Guess the Stadium" - name stays the same but concept is different

Points to consider:
 - Player will get points based on how close they are to the location of the stadium
 - UI will essentially be the same, but we need to add a new component for the and the stadium / team name
 - Answer input will no longer be needed

Things to implement:
 - [ ] Component for displaying the Team Name and Stadium Name
 - [ ] Remove the Answer Input Bar / Still need a "Guess" button to submit the guess
 - [ ] Be able to place a marker on the map to guess the location of the stadium
 - [ ] Develop scoring system based on how close the player is to the location of the stadium (ties in with GeoGuessr scoring system - also need to implement a way to get distance between two points on the map)

Things we have already implemented:
 - [x] Component for displaying the Map
 - [x] Component for displaying the Points
 - [x] Component for displaying the Timer
 - [x] Component for displaying the Score
