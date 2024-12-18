const linkTemplate = (link, label) => {
    return `
        <a href=${link}>${label}</a>
    `;
}

const htmlTemplate = (content) => {
    const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Anonimyzer</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #121212;
                color: #ffffff;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #1e1e1e;
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            }
            .header {
                text-align: center;
                margin-bottom: 20px;
            }
            .header h1 {
                font-size: 24px;
                margin: 0;
                color: #00ccff;
            }
            .content {
                text-align: center;
                margin-bottom: 30px;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
                margin: 0 0 10px;
            }
            .container {
                text-align: center;
                margin: 20px 0;
            }
            .container a {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #00ccff;
                text-decoration: none;
                border-radius: 5px;
            }
            .container .pin {
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                padding: 15px 20px;
                background-color: #333333;
                color: #00ccff;
                border-radius: 10px;
                letter-spacing: 4px;
                border: 2px solid #00ccff;
                margin-top: 10px;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: #888888;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Anonimyzer</h1>
            </div>
            <div class="content">
                <p>Your secure content is below:</p>
            </div>
            <div class="container">
                ${content}
            </div>
            <div class="footer">
                <p>If you did not request this, please ignore this email.</p>
                <p>&copy; 2024 Anonimyzer. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;

    return template;
};
