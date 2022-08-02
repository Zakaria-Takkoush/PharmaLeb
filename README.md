<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](https://github.com/julescript/well_app#-project-philosophy) • [WIREFRAMES](https://github.com/julescript/well_app#-wireframes) • [TECH STACK](https://github.com/julescript/well_app#-tech-stack) • [IMPLEMENTATION](https://github.com/julescript/well_app#-impplementation) • [HOW TO RUN?](https://github.com/julescript/well_app#-how-to-run)**

</div>

<br><br>

<img src="./readme/title2.svg"/>

> PharmaLeb is a medicine tracking app right in the palm of your hands. It offers a direct connection between pharmacists and patients. Patients can easily find their needed medicine at the closest pharmacy. All it takes is three easy steps: search, find, and call.

### User Stories

> <b>Patient</b>

-   As a patient, I want to search for my medical needs easily without suffering.
-   As a patient, I like to add some medicines as favorites in order to track their availability easily.
-   As a patient, I want to know how far this pharmacy is away from me because time and transportation is crucial to me.
-   I want to turn on notifications to stay updated with the availability of my favorite items.

> <b>Pharmacist</b>

-   As a pharmacist, I am an empathetic person who wants to help patients find their needs and overcome drug shortage.
-   As a pharmacist, I can register and constantly update my medicine listings, location, and contact number in the app.
-   As a pharmacist, I can get in touch with patients through phone calls and live chatting to discuss delivery and answer any questions they might have or to prescribe alternative drugs.

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure react native components and Stylesheet objects (expect for Gifted Chat)

| Home/Search      | Favorites      | Chat      | Profile      | Pharmacy      |
| ---------------- | -------------- | --------- | ------------ | ------------- |
| ![Home/Search]() | ![Favorites]() | ![Chat]() | ![Profile]() | ![Pharmacy]() |

| Items      | Edit Pharmacy      | Stock      |
| ---------- | ------------------ | ---------- |
| ![Items]() | ![Edit Pharmacy]() | ![Stock]() |

<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the Well app uses:

-   This project uses React Native framework [React Native](https://reactnative.dev/) that combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.. It is developed with the help of [Expo CLI](https://expo.dev/).
-   For persistent storage (database), the app uses [MongoDB](https://www.mongodb.com/).
-   To send local push notifications, the app uses the expo notifications service [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/#api).
-   For chatting service, the app uses [Firebase 9](https://firebase.google.com/) with the Cloud Firestore service that helps dealing with real-time database updates.
-   For the backend server, the app uses [Node.js](https://nodejs.org/en/) with [Express](https://expressjs.com/) package to build a local server and deal with APIs.
-   The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.
-   Google Maps API is used to display users and pharmacies on a map based on their locations.

<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes built with figma from the user stories we have, the implementation of the app is shown as below, these are screenshots from the real app

| Landing      | Home/Search      |
| ------------ | ---------------- |
| ![Landing]() | ![Home/Search]() |

<br><br>
<img src="./readme/title6.svg"/>

> This is an example of how you may give instructions on setting up your project locally.
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
-   For Android: [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
-   For iOS: [Apple App Store](https://apps.apple.com/app/expo-go/id982107779)

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
