# Git branch commands
1. Clone the project and navigate to the folder. 
2. Write the following commands to create and sync your development branch with the remote development branch: \
  git fetch --all \
  git checkout -b development \
  git push -set-upstream origin development 

Everytime you start a new task create a new branch from development using these commands: \
  git checkout development \
  git checkout -b [new branch name] 

To check which branch you are located in: \
  git branch 
  
When you are done with the task you can merge it into development with the following commands: \
  git merge development \
  git checkout development \
  git merge [new branch name] 

Make sure to fix possible merge confict.

To push your changes to git: \
  git add . \
  git commit -m "some relevant message" \
  git push
