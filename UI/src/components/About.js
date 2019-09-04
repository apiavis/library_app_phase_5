import React from 'react';

const About = () => {
    return (
        <div className="about">
            <h3>
                About the Library
            </h3>
            <p>
                This library app is a full-stack web application that I built over 5 phases.  
                The technologies I used to build the application include HTML, CSS, JS, JSX, 
                React, Redux, Node.js, Express, and Google Firestore.
            </p>
            <h3>
                Phase I
            </h3>
            <p>
                Phase one of the project had a front-end built with HTML CSS and VanillaJS. 
                 I used indexedDB for client-side storage, and a REST API to perform CRUD 
                operations on books that came from a Cloud Firestore database stored on GCP. 
                Phase I did not require me to interact with the Firestore database directly, 
                as the back-end was already built out. This phase required object-oriented 
                programming skills in order to build classes that exhibited static methods.
            </p>
            <h3>
                Phase II
            </h3>
            <p>
                Phase two of the library app built upon the first phase, in that I 
                refactored the VanillaJS front-end into a ReactJS implementation that 
                manages state within components. 
            </p>
            <h3>
                Phase III
            </h3>
            <p>
                In the third phase of the library project, I incorporated Redux to manage 
                some of the application's state, independent of the components. I built 
                action creators, actions, and reducers in order to interact with the REST 
                API and support pagination. 
            </p>
            <h3>
                Phase IV
            </h3>
            <p>
                Phase four of the library focused on the back-end of the application. In 
                this phase I used Express and Node.js to build end points that talk to the 
                Google Firestore database on Google Cloud Platform.  This phase also allowed 
                me to incorporate authentication through the use of JSON Web Tokens. 
            </p>
            <h3>
                Phase V
            </h3>
            <p>
                The final phase the library application rounded out with the implementation 
                of authorization and a UI to support the authentication functionality 
                previously built on the back-end. This phase integrated components from 
                phases III and IV, while building additional functionality for the log-in 
                process, private routes, and managing sessions.  Phase V is the result of 
                integrating the front-end I built with React-Redux and the back-end 
                I built with Express while using a Google Firestore database.
            </p>
        </div>
    )
};

export default About;