echo "creating eloinflater_react"

docker build . -t sandrospengler/eloinflater_react:latest

echo "pushing image to dockerhub"

docker push sandrospengler/eloinflater_react:latest

echo "eloinflater_react has now been published"
