$backendVersion='1.2'
$frontendVersion='1.2'

docker build -t rajthecat/wordl-solver-frontend:$backendVersion -f ./frontend/Dockerfile ./frontend
docker build -t rajthecat/wordl-solver-backend:$frontendVersion -f ./backend/Dockerfile ./backend

docker login

docker push rajthecat/wordl-solver-backend:$backendVersion
docker push rajthecat/wordl-solver-backend:$frontendVersion

##manually update the compose file in the webapp

#az login
#az account show
#$Location = "eastus2"
#$AksName = "wordle-solver"
#az group create --name $ResourceGroup --location $Location
#az aks create --resource-group $ResourceGroup --name $AksName --node-count 1 --generate-ssh-keys --tier free
#az aks get-credentials --resource-group $ResourceGroup --name $AksName
#kubectl apply -f backend-deployment.yaml
#kubectl apply -f frontend-deployment.yaml

#$ResourceGroup = 'cus-wordle'
#$AppName = 'wordle-hints'
#az webapp show --resource-group $ResourceGroup --name $AppName

#az webapp update --resource-group $ResourceGroup --name $appName --multicontainer-config-type compose --multicontainer-config-file compose-wordpress.yml