function sendRealMail(from, to, subject, text, ...args) {
    // SEND MAIL (AS WE HAVE SUCCESSFULLY COLLECTED DATA FROM FORM)
    const nodemailer = require("nodemailer");
    const {userMail, userPass} = require("../app/secrets");

    console.log("Credentials", userMail, userPass);
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: userMail,
            pass: userPass
        }
    });

    console.log("Transport: ", transport)

    /* -- For multiple receivers --

        {
            ...
            to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
            ...
        }
    */

    /*
        -- For HTML mail --

        {
            ...
            html: '<h1>Welcome</h1><p>That was easy!</p>',
            ...
        }
    */

    const mailOptions = {
        from: userMail,
        to: "rishikesh@sjainventures.com", 
        subject: "Any subject",
        text: text
    };

    console.log("Email options", mailOptions);
    try {
        transport.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log("ERROR: ");
                console.log(error);

                // --mixed-context => require()
                window.location.href = "./error-mail.html"; // I predicted
            } else {
                console.log(Object.keys(info));
                console.log("Email sent: ", info.response);

                // --mixed-context => require()
                window.location.href = "./success-mail.html"; // I predicted
            }
        });
    } catch (error) {
        console.log("ERROR:-", error)
        location.href = "error_mail.html";
    }
}