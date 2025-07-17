Commands

1. Publish Message
docker exec -it service-one npm run handle-messages -- publish-message -n "Deswal" -e "shivam@example.com"

2. Consume Message
docker exec -it service-two npm run handle-messages -- handle-messages


docker exec -it service-two npm run handle-messages -- handle-messages -l 5