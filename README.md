## Backend Configuration

1. Enter the backend Folder : `cd backend`
   
   Add the `.env` and `.env.e2e` files to main directory;

   **Add Environment Variables to Each .env File**: 

    ```plaintext
    MONGODB_CONNECTION_STRING=

    JWT_SECRET_KEY=
    FRONTEND_URL=

    # Cloudinary Variables
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=

    # Stripe
    STRIPE_API_KEY=
    ```
    Install npm packages: `npm install`
   
    Run the project: `npm run dev`
   
    For run the test server: `npm run e2e`

## Frontend Configuration

1. Enter the frontend folder: `cd frontend`;

   Add .env file to main directory
   
   **Add Environment Variables to .env File**:

    ```plaintext
    VITE_API_BASE_URL=
    VITE_STRIPE_PUB_KEY=
    ```

    Install npm packages: `npm install`
   
    Run the project: `npm run dev`


## Running tests**    
    - In VS Code install the [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
    - Navigate to the `e2e-tests` directory.
    - Install dependencies: `npm install`.
    - Start the frontend and backend server using the steps above
    - [Using the Playwright extension to run the tests](https://playwright.dev/docs/getting-started-vscode#running-tests)

