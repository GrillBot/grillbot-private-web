git pull --rebase;
git push -u origin;
docker build -t ghcr.io/grillbot/grillbot-web .;
docker push ghcr.io/grillbot/grillbot-web;
