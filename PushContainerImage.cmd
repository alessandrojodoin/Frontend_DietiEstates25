call az acr login --name DietiEstatesRESTAPI
docker image build -t frontend-dietiestates25 .
docker tag frontend-dietiestates25 dietiestatesrestapi.azurecr.io/frontend-dietiestates25
docker push dietiestatesrestapi.azurecr.io/frontend-dietiestates25