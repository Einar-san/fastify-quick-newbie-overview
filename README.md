# fastify-quick-newbie-overview
A simple fastify example app
   # WELCOME TO YOUR RANDOM WEBSITE TEMPLATE 
   ## Quick overview, and simple example of fastify and node.js.
   
## GETTING STARTED 
CONFIGURATION :
+ First of all we need to run ***npm install*** to set up the dependencies, then we need to do some configuration that will make the app work properly.
    + ### you need to link the app to an SMTP service, in this example, I suggest to use ***Ethereal***
        + Go to [Ethereal website](https://ethereal.email/) and create an Ethereal account, you don't need to sign up or give your email, you just need to click the      button, this will give you access to a fake account and generate a **Transporter**, and this is exactly what we need, just copy the transporter and paste it in ***src/utils/mailHandler.js***, and that's it, the app is ready to start with ***npm run dev***.
      


- ## ENVIRONMENT :
    -  I've used ***fastify*** as a node.js framework.
    - ***Bulma*** as a CSS framework.
    - ***EJS*** for templating.
    - The library page is empty, you just have to do a first post, and the page will begin to fill.

- ## DISCLAIMER :
    - This project is the result of two months of self study, this is what I've learned so far, in fact this is also an example of a **node.js** structure app and quick overview of ***fastify***.
    - I will continue to sustain this project and add more and more features.
    - actually, the ***RANDOM WEBSITE*** provide a complete authentication system and upload file system.
    - As an example, I let the private directory files in the repository, I advise you to re-generate all this files, people who can access these files can easily hack your app, take a look to fastify-jwt docs to learn how generate key files.

### If you have any suggestion, or if you want to report a bug, you have my thanks in advance,  keep in mind that I'm learning the web development, so I advice you to be careful if you plan to use this template as base for a real app.

# THAT'S IT !
### thank you for reading and good luck.
