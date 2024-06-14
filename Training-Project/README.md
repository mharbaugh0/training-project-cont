# Bio::Neos Development Skeleton

## Project Overview
We were tasked with designing and creating a development skeleton for future Bio::Neos interns to experiment with and build on. Given several options for the framework, we chose Nuxt.js and Vue due to their aesthetic appeal, strong documentation, and supportive community. Our primary goal was to develop an application with some loose ends to give future developers footholds to make it their own and gain valuable learning experiences. Additional goals included experimenting with new technologies, gaining a better understanding of the web development process, and creating a project that could serve as a showcase of our work.

### Project Goals and Uses
- **Primary Goal:** Provide a base for future development interns to use as a jumping-off point.
- **Secondary Goals:**
  - Experiment with unfamiliar technologies.
  - Enhance understanding of the web development process.
  - Create a demonstrative project for career development.

### Future Enhancements
- Incorporate artificial intelligence.
- Add onboarding and training information.
- Track user progress and more.

## Getting Started

### Used 
Ensure you have the following installed:
- Nuxt 3.12
- Vue.js (either 2.7 or 3)
- MySQL
- Docker
- Bcrypt
- Prisma 5.15.0

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/bioneos/training-project.git
   ```
2. **Set up the environment variables:**
- Create a .env file.
- Copy the contents of dotenv.example and update them with your desired values.

### Running the project

1. **Start the docker containers**

    ```sh 
    docker compose up --build 
    ```

2. **Access the application:**
- Open your browser and navigate to:
    ```sh
    http://localhost:3000
    ```

## Features

### Start-up Page
This is the page that appears when the application is first initialized.
![Start-up page](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/startup.png)

### Register Page
- Accessible via the ‘Register’ button in the navigation bar.
- Requires a valid email address for registration.
- Users are prompted to log in after successful registration.
![Register page](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/register.png)

### Login Page
- Accessible via the ‘Login’ button in the navigation bar.
- Only registered accounts can log in.
![Login page](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/login.png)

### Color Mode
- Toggle button available on Login and Registration pages.
- Switches between dark mode (moon icon) and light mode (sun icon).
  ![Dark mode button](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/dark-mode-active.png)
  ![Light mode button](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/light-mode-active.png)

### Welcome Page
- Displays a welcome message with the user’s name (except on first login).
- Navigation options: Home, Account, Documentation, Settings, Logout.
  ![Welcome page](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/welcome.png)

### Account Page

#### Account Tab
- Allows users to change their display name and email.
- Changes are saved to the database upon clicking ‘Save account’.
![Account page, account tab](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/account-account.png)

#### Password Tab
- Allows users to reset their password.
- Changes are saved to the database upon clicking ‘Save changes’.
![Account page, password tab](https://github.com/bioneos/training-project/blob/devel/Training-Project/README%20images/account-password.png)



## Acknowledgements
- [Nuxt UI official documentation](https://ui.nuxt.com/getting-started)
- [Best README Template](https://github.com/othneildrew/Best-README-Template)
- [Nuxt installation guide](https://nuxt.com/docs/getting-started/installation#play-online)
- [Nuxt sandbox (StackBlitz)](https://stackblitz.com/github/nuxt/starter/tree/v3?file=README.md)
- [Getting Started With Nuxt UI by John Komarnicki](https://www.youtube.com/watch?v=SE_ysS_ZXbk&t=1272s)
- [Tailwind CSS styling help](https://tailwindcss.com/docs/flex-basis)

## License
Distributed under the BSD 2-Clause License. See `LICENSE.md` for more information.

## Contact
For further information, contact:
- [mharbaugh@bioneos.com](mailto:mharbaugh@bioneos.com)
- [zhasabrabu@bioneos.com](mailto:zhasabrabu@bioneos.com)
- [sgdavis@bioneos.com](mailto:sgdavis@bioneos.com)
