# Node Backend Documentation

### Stocks

- GET search any stock 
### Various type of symbols (currently in database):
        ['nse-symbol','bse-code','nyse-symbol', 'nasdaq-symbol', 'nyse-symbol', 'sse-code', 'hk-code'] 
<br>    NSE: National Stock Exchange 
<br>    BSE: Bombay Stock Exchange 
<br>    NYSE: New York Stock Exchange 
<br>    NASDAQ: National Association of Securities Dealers Automatic Quotation System 
<br>    SSE: Shanghai Stock Exchange 
<br>    HK: Hong Kong Stock Exchange 
<br>    ASX: Australian Securities Exchange 
<br>    EPA: Euronext Paris Stocks 
<br>    
<br>    Append: 
<br>        .NS for NSE Companies
<br>        .BOM for BSE Companies
<br>        .HK for Hong Kong Companies
<br>        .SS for Shanghai Comapnies
<br>        .AX for Australia Companies
<br>        .PA for Paris Companies

http://localhost:3000/stock/search?name=reliance

### User Contact

- Mir Dabhi contacts us
https://node-backend-quickyearning.onrender.com/usercontact/contact-us <br>
![image](https://github.com/user-attachments/assets/fb906584-4366-4c77-90f4-57c3cf3c82ec)


### Users

- Register Aditya Gupta
https://node-backend-quickyearning.onrender.com/user/register <br>
![image](https://github.com/user-attachments/assets/6c69638b-a6a0-4b88-9fc5-ca1dbd1ab143)


- Login Aditya Gupta
https://node-backend-quickyearning.onrender.com/user/login <br>
![image](https://github.com/user-attachments/assets/7720c419-dead-4ad9-960b-9c6594c62943)

### Google Login

- GET https://node-backend-quickyearning.onrender.com/auth/google
After clicking on 'Sign in with google' users goes to the login page of google
After signing in they are redirected to the callback url https://node-backend-quickyearning.onrender.com/auth/google/callback. This url redirects user to their profile i.e. https://node-backend-quickyearning.onrender.com/profile

- GET https://node-backend-quickyearning.onrender.com/google-logout
This url logs out the user and redirects to home page i.e. https://node-backend-quickyearning.onrender.com/

### OTP Login

- POST send otp to adityagupta9845@gmail.com <br>
https://node-backend-quickyearning.onrender.com/otp/send-otp <br>
![image](https://github.com/user-attachments/assets/b5115059-b27c-44d0-a2d3-e9f7ad54b728)

- POST verify otp for adityagupta9845@gmail.com <br>
https://node-backend-quickyearning.onrender.com/otp/verify-otp <br>
![image](https://github.com/user-attachments/assets/bcbc6106-5e62-4b49-8acd-c904cf942f4d)
