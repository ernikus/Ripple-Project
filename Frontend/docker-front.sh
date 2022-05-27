#!/usr/bin/bash

# 1. Build the Project
sudo npm run build

# 2. Stop Previous Project (if it's still running)
sudo docker stop ripple-project

# 3. Create 'Nginx' folder (just in case) 
sudo mkdir -p /usr/share/nginx
#sudo mkdir -p /usr/share/nginx/html

# 4. Delete all content inside that Folder (just in case)
sudo rm -rf /usr/share/nginx/html/

# 5. Apply Correct Permissions (just in case)
sudo chmod 755 /usr/share/nginx
sudo chmod 755 /usr/share/nginx/html

# 6. Run Container, Copy Build App Files
pwd=$(pwd)
sudo docker run -it --rm -d -p 8000:80 --name ripple-project -v "$(pwd)/dist/front-app-ver-1":/usr/share/nginx/html nginx:latest

echo "Go to: http://127.0.0.1:8000/"
echo "Done!"
