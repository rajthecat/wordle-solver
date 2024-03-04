docker build -t rajthecat/wordl-solver-frontend:1.1 -f ./frontend/Dockerfile ./frontend
docker build -t rajthecat/wordl-solver-backend:1.1 -f ./backend/Dockerfile ./backend

az login
az account show
$ResourceGroup = "wordle-solver"
$Location = "eastus2"
$AksName = "wordle-solver"
az group create --name $ResourceGroup --location $Location
az aks create --resource-group $ResourceGroup --name $AksName --node-count 1 --generate-ssh-keys --tier free
az aks get-credentials --resource-group $ResourceGroup --name $AksName
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml