# project setup
Firstly go to https://nodejs.org/en/download and download and install node.js and any required dependancies such as chocolately.  
It should prompt for and then start the chocolately install automatically.  
Once this is completed open an empty VSCode window, naviagte to the source control tab and click clone a repository.  
Enter https://github.com/Freaky128/Project-Studio.git when asked for a repo URL. It may require a git login.  
Select or create a folder for the repository destination.  
Open the cloned repository when prompted.  
Open a new terminal (in VScode).  
Enter the command "npm create vite@latest".  
Enter "PS-web_app" when asekd for the project name (important you enter exactly "PS-web_app"!).  
![Alt text](<setup_photos/Screenshot 2023-09-03 215455.png>)  
A prompt will appear asking to remove existing files and continue. press 'y'.  
![Alt text](<setup_photos/Screenshot 2023-09-03 215511.png>)  
Press enter on the next prompt to accept the default package name.  
![Alt text](<setup_photos/Screenshot 2023-09-03 215530.png>)  
Select react as the framework.  
![Alt text](<setup_photos/Screenshot 2023-09-03 215547.png>)  
Select JavaScript.  
![Alt text](<setup_photos/Screenshot 2023-09-03 215605.png>)  
Enter "cd PS-web_app" and then "npm install" but don't enter the run command.  
![Alt text](<setup_photos/Screenshot 2023-09-03 215656.png>)  
Navigate to the source control panel and click the more actions button.  
![Alt text](<setup_photos/Screenshot 2023-09-03 220009.png>)  
Select changes and then discard all changes. A warning will appear but continue.  
![Alt text](<setup_photos/Screenshot 2023-09-03 220126.png>)  
Go back to the terminal and enter "npm run dev".  
A connection link should appear.  
![Alt text](<setup_photos/Screenshot 2023-09-03 220242.png>)  
If followed correctly when the local host link is clicked a webpage should appear looking like:  
![Alt text](<setup_photos/Screenshot 2023-09-03 222824.png>)  
Finally go back to the terminal and enter "npm install sqlite3" (press 'q' to kill the localhost first).  
![Alt text](<setup_photos/Screenshot 2023-09-03 223443.png>)  
If everything worked please add your name to this document under the completed set up section and commit it to github. If you have any questions reach out to Matthew on discord.  

#### Completed set up:  
Matthew Freak  