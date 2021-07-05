## Condé Nast News Portal

A JavaScript application that shows the latest news from the United Kingdom, using the newsapi.org service.

## Built With

This web application is built with following technologies:

-   Vanilla JavaScript
-   Tailwind CSS
-   Parcel Bundler
-   Express JS
-   Axios (used in server)
-   nodemon

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/Manjuanand021/news-articles.git
    ```
2. Install NPM packages

    ```sh
    Go to /client
    npm install
    ```

    ```sh
    Go to /server
    npm install
    ```

3. Enter your API key in `/server/config/config.js`
    ```JS
    const API_KEY = 'ENTER YOUR API KEY';
    ```

### Run the app

```sh
   Run vanilla JavaScript client
    - Go to /client
    - npm start
   Run express API server
    - Go to /client
    - npm start
```

### Screenshots
Landing screen
<img width="1287" alt="Screenshot 2021-07-05 at 1 55 02 PM" src="https://user-images.githubusercontent.com/22066337/124440857-b6687a80-dd98-11eb-91e6-b43cf90735d4.png">


With search term and loading spinner
<img width="1285" alt="Screenshot 2021-07-05 at 1 55 24 PM" src="https://user-images.githubusercontent.com/22066337/124440881-bcf6f200-dd98-11eb-9322-40b1df32b3ff.png">


Search results
<img width="1280" alt="Screenshot 2021-07-05 at 1 54 42 PM" src="https://user-images.githubusercontent.com/22066337/124440931-cbdda480-dd98-11eb-9dd8-bc9359f8df86.png">


No results found
<img width="1285" alt="Screenshot 2021-07-05 at 1 56 45 PM" src="https://user-images.githubusercontent.com/22066337/124441010-dc8e1a80-dd98-11eb-958c-162128e401b7.png">



