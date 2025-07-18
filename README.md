1. Publish Message Command (service-one)
    docker exec -it service-one npm run handle-messages -- publish-message -l 5

2. Consume Message Command (service-two)
    docker exec -it service-two npm run handle-messages -- handle-messages -l 5
 