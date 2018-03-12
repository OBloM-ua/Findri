Git global setup

git config --global user.name "Yevhen Baidiuk"
git config --global user.email "y.baidiuk@gmail.com"

Create a new repository

git clone https://gitlab.com/rcknr/transit.git
cd transit
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master

Existing folder or Git repository

cd existing_folder
git init
git remote add origin https://gitlab.com/rcknr/transit.git
git add .
git commit
git push -u origin master