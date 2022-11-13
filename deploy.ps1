git pull --rebase;
git push -u origin;
docker build -t ghcr.io/grillbot/grillbot-private-web .;
docker push ghcr.io/grillbot/grillbot-private-web;
