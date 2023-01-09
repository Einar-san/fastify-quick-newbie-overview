# fastify-quick-newbie-overview
A simple fastify example app
   # WELCOME TO YOUR RANDOM WEBSITE TEMPLATE 
   ## Quick overview, and simple example of fastify and node.js.
   
## GETTING STARTED 
CONFIGURATION :
+ First of all we need to run ***npm install*** to set up the dependencies, then we need to do some configuration that will make the app work properly.
    + ### you need to link the app to an SMTP service, for this example I suggest to use ***Ethereal***
        + Go to [Ethereal website](https://ethereal.email/) and create an Ethereal account. You don't need to sign up or give your email, just click the button. It will give you access to a fake account and generate a **Transporter**, which is exactly what we need. Copy the transporter and paste it in ***src/utils/mailHandler.js***, and that's it! The app is ready to start with `npm run dev`.
        + If the app return a **self certificat error**, you just need to add a tls propertie to the transporter :
        ```
        const transporter =  createTransport({          
             host: 'smtp.ethereal.email',
             port: 587,
             auth: {
                 user: 'leta.cole@ethereal.email',
                 pass: 'Je57EnkMHcH1HDR94y'
             },
             tls: {                                               //fix for certificat error, just for th example, not secure.
                rejectUnauthorized: false                                                 
            }
         });
         
        ```
        
      


- ## ENVIRONMENT :
    -  I used ***fastify*** as a node.js framework.
    - ***Bulma*** as a CSS framework.
    - ***EJS*** for templating.
    - The library page is empty, you just have to do a first post and the page will begin to fill.

- ## DISCLAIMER :
    - This project is the result of what i learned so far during two months of self study. In fact, this is also an example of a **node.js** structure app and quick overview of ***fastify***.
    - I will continue to sustain this project and add more and more features.
    - actually, the ***RANDOM WEBSITE*** provide a complete authentication system and upload file system.
    - As an example, I let the private directory files in the repository. I advise you to re-generate all the files, people who can access them can easily hack your app. Take a look to fastify-jwt docs to learn how generate key files.

### If you have any suggestions, or if you want to report a bug, I'll be greatful if you contacted me. Keep in mind that I'm learning the web development, so I advise you to be careful if you plan to use this template as base for a real app.

# THAT'S IT !
### thank you for reading and good luck.
