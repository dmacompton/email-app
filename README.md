# Email app


#### Run as Electron app:
 
1. npm install
2. npm run start:desktop

#### Run as web app

1. npm install
2. remove few line in `src/components/emailContent/index.tsx`
 - `import saveToFile from "../../system/saveToFile";`
 - `saveToFile(email, email.subject);`
3. npm run start:web 
