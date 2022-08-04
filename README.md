<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](#philosophy) • [WIREFRAMES](#wireframes) • [TECH STACK](#tech) • [IMPLEMENTATION](#implementation) • [HOW TO RUN?](#install)**

</div>

<br><br>

<img src="./readme/title2.svg" id="philosophy"/>

> PharmaLeb is a medicine tracking app right in the palm of your hands. It offers a direct connection between pharmacists and patients. Patients can easily find their needed medicine at the closest pharmacy. All it takes is three easy steps: search, find, and call.

### User Stories

> <b>Patient Stories</b>

-   As a patient, I want to search for my medicine needs easily without suffering.
-   As a patient, I like to bookmark some medicines as favorites in order to track their availability easily.
-   As a patient, I want to know how far is this pharmacy because time and transportation are important to me.
-   As a patient, I want to turn on notifications to stay updated with the availability of my needed medicines.
-   As a patient, I want to get in touch with pharmacies easily through direct calls or text chatting to discuss medicine availability and delivery.
-   As a patient, I want to join a community of pharmacists and other patients to ask for certain medicines or medical needs when needed.

> <b>Pharmacist Stories</b>

-   As a pharmacist, I am an empathetic person who wants to help patients find their needs and overcome drug shortage.
-   As a pharmacist, I want to register and set my pharmacy phone number and location on the map in order to be found easily by users.
-   As a pharmacist, I want to constantly update my medicine listings and item stock.
-   As a pharmacist, I need to get in touch with patients through phone calls and live chatting to discuss delivery and answer any questions they might have or to prescribe alternative drugs.

> <b>Admin Stories</b>

-   As an admin, I can access the admin panel where I can manage the medicine list within PharmaLeb app.
-   As an admin, I can add a medicine, delete a medicine, or update medicine data.

<br><br>

<img src="./readme/title3.svg" id="wireframes"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure react native components and Stylesheet objects (expect for Gifted Chat)

> <b>Patient</b>

<table style="width:100%">
  <tr>
    <th style="width:33%; text-align:center">Home/Search </th>
    <th style="width:33%; text-align:center">Medicine</th>
    <th style="width:33%; text-align:center">Pharmacy</th>
  </tr>
  <tr>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Home.png" /></td>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Medicine.png" /></td>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Pharmacy.png" /></td>
  </tr>
 <tr>
    <th style="width:33%; text-align:center">Favorites </th>
    <th style="width:33%; text-align:center">Chats</th>
    <th style="width:33%; text-align:center">Profile</th>
  </tr>
  <tr>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Favorites.png" /></td>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Chat-Patient.png" /></td>
    <td style="width:33%"><img width="250px" src="./readme/wireframes/patient/Profile.png" /></td>
  </tr>
</table>

> <b>Pharmacist</b>

<table style="width:100%">
  <tr>
    <th style="width:33%; text-align:center">Manage Items</th>
    <th style="width:33%; text-align:center">Edit Stock</th>
    <th style="width:33%; text-align:center">Edit Pharmacy</th>
  </tr>
  <tr>
    <td style="width:33%"><img src="./readme/wireframes/pharmacist/Stock.png" /></td>
    <td style="width:33%"><img src="./readme/wireframes/pharmacist/Edit-Stock.png" /></td>
    <td style="width:33%"><img src="./readme/wireframes/pharmacist/Edit-Pharmacy.png" /></td>
  </tr>
</table>

<br><br>

<img src="./readme/title4.svg" id='tech'/>

Here's a brief high-level overview of the tech stack PharmaLeb uses:

-   The app [React Native](https://reactnative.dev/) framework that combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces. It is developed with the help of [Expo CLI](https://expo.dev/).
-   For persistent storage (database), the app uses [MongoDB](https://www.mongodb.com/), a NoSQL database.
-   For the backend server, the app uses [Node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) package to build a local server and deal with APIs.
-   To send push notifications, the app uses the expo notifications service [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/#api).
-   For live text chatting service, the app uses [Firebase 9](https://firebase.google.com/) with the Cloud Firestore that helps dealing with real-time database updates.
-   The app uses [Google Maps API](https://mapsplatform.google.com/) integrated with React Native to display users and pharmacies locations.
    -   Note: Due to the lack of a working Google Maps Platform billing account, directions and shortest path features could not be implemented using Google Maps API. Basic features of the [React Native Maps](https://docs.expo.dev/versions/latest/sdk/map-view/) were used instead.
-   The admin panel was designed with [React](https://reactjs.org/), A JavaScript library for building user interfaces.

<br><br>
<img src="./readme/title5.svg" id='implementation'/>

> Using the above mentioned tech stacks and the wireframes built with figma from the user stories we have, the implementation of the app is shown as below.

<br></br>

Here are some short gifs from the real app:

## Patient Screens

|                                   Search for Medicine                                    |                                            Check Medicine Availability                                             |                              Call Pharmacy                               |
| :--------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|                     ![Browse](/readme/gifs/search-for-medicine.gif)                      |                              ![Availability](/readme/gifs/medicine-availability.gif)                               |               ![Pharmacy](/readme/gifs/call-pharmacy.gif)                |
| The patient can search for a certain medicine. Search results are filtered in real-time. | Pharmacies selling each medicine are displayed with their stock of this medicine and their distance from the user. | The app can directly navigates to the phone dialer to call the pharmacy. |

|                                   Add a Favorite                                   |                           Delete Favorites                           |                                        Edit Profile                                         |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                   ![Add Favorite](/readme/gifs/add-favorite.gif)                   |         ![Delete Favorite](/readme/gifs/edit-favorties.gif)          |                  ![Edit Profile](/readme/gifs/edit-profile-with-image.gif)                  |
| The patient can add a medicine to their favorite list in order to track it easily. | The patient can also edit their favorite list by deleting medicines. | Patients and pharmacists can edit their profile anytime. They can upload a profile picture. |

|                                                                         Community Chat                                                                         |                                                                           Chat                                                                            |                                                                             Notifications                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                            ![Chat](/readme/gifs/community-chat.gif)                                                            |                                                       ![Community Chat](/readme/gifs/chatting.gif)                                                        |                                                            ![Notifications](/readme/gifs/notifications.gif)                                                            |
| The community chat is where all patients and pharmacists can communicate with each other. It is an additional way to find medicines and request medical needs. | One-to-one chat is another way of communication between a patient and a pharmacist. They can discuss availability, reservation, price, and delivery here. | Patients receive push notifications when a medicine in their favorites list becomes available. It keeps patients always updated with their medical needs availability. |

## Pharmacist Screens

|              Pharmacist Tabs              |                                          Add a Medicine                                           |                                           Edit Stock                                            |
| :---------------------------------------: | :-----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: |
| ![Tabs](/readme/gifs/pharmacist-tabs.gif) |                          ![Add Medicine](/readme/gifs/add-to-stock.gif)                           |                           ![Edit Stock](/readme/gifs/edit-stock.gif)                            |
|  This is the pharmacist part of the app.  | Pharmacists can add any medicine to their available items from the predefined medicines database. | Each pharmacist can edit the stock of their items whenever there are new arrivals or purchases. |

## Registration and Logging in

|                                                                                       Sign Up & Validation                                                                                        |                                                                                      Login                                                                                      |                                                                           Register a Pharmacy                                                                            |
| :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                     ![Sign Up](/readme/gifs/register_validation_location.gif)                                                                     |                                                                        ![Login](/readme/gifs/login.gif)                                                                         |                                                               ![Validation](/readme/gifs/add-pharmacy.gif)                                                               |
| Patients and pharmacists can register to PharmaLeb. There are validation rules to ensure secure and genuine data. Users are asked to set their location as it wil be used to calculate distances. | This is the opening app screen. Users can log in and they will be welcomed. The app will automatically direct each user type to their corresponding UI (patient or pharmacist). | After a pharmacist registers their account, they will be asked to register their pharmacy. Of course, pharmacy data should be valid and pharmacy location should be set. |

## Admin Panel:

|                                               Add a Medicine                                               |                                         Edit/Delete a Medicine                                         |
| :--------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------: |
|                              ![Sign Up](/readme/gifs/admin-add-medicine.gif)                               |                                ![Login](/readme/gifs/admin-delete.gif)                                 |
| The admin can manage the medicine list displayed in the app. They can add a medicine with all its details. | The admin can also edit an existing medicine data or delete the medicine completely from the database. |

<br><br>
<img src="./readme/title6.svg" id='install'/>

> To get a local copy up and running follow these simple example steps.

### Prerequisites

<!-- This is an example of how to list things you need to use the software and how to install them. -->

-   Download and install Node.js LTS version (https://nodejs.org/en/)

-   npm
    ```sh
    npm install npm@latest -g
    ```
-   Install Expo CLI
    ```sh
    npm install --global expo-cli
    ```
-   Download Expo Go App on your smartphone:

> For Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).

> For iOS: [Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779).

### Installation

1. Clone the repo

    ```sh
    git clone https://github.com/Zakaria-Takkoush/PharmaLeb.git
    ```

2. Navigate to the "client" folder and Install NPM packages

    ```sh
    npm install
    ```

3. Run the start up command

    ```sh
    expo start
    ```

4. Scan the generated QR code with your camera (ios) or through the Expo Go application (android)

5. Enter your API in `config.js`
    ```js
    const API_KEY = "ENTER YOUR API";
    ```
