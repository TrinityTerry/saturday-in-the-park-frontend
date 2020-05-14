# Running json-server

1. Clone down this repo and change directories so that you are in the root of the repo.
1. `json-server --watch db.json -p 5000`
1. Navigate to `localhost:5000`.

# Saturday In the Park

Your task is to build a React application that uses this json-server placeholder API. This app will allow a user to plan out their day at the infamous Kennywood Theme Park. The user will be able to see the list of attractions at the theme park and build out an itinerary for their day.

## React Application

1. Create a brand new React application called `saturday-in-the-park`.
1. Once the initial application has been created, create a brand new Github repo and push up your first commit.
1. Checkout a new branch before further development.

## Requirements

Your application must meet the following requirements:

#### Home Page

- When the user navigates to the root url, they should see a list of park areas with the attractions in that park area listed under it.

#### Itinerary

- When the user navigates to `/myitinerary`, they should see a list of itinerary items specific to that user.

- When the user navigates to `/myitinerary/new`, they should be presented with a form that, when submitted, will add a new item to their itinerary.

- When the user navigates to `/myitinerary/{the-id-of-the-itinerary-item}/edit`, they should be presented with a pre-filled form that allows them to edit a specific item in their itinerary.

#### Authentication

- When the user navigates to `/login`, they should be presented with a form that allows them to log in to the application.

 - When the user navigates to `/register`, they should be presented with a form that allows them to register as a new user.
# trinity-saturday-in-the-park
