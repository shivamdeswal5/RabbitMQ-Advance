1. Publish Message Command (service-one) <br>
    docker exec -it service-one npm run handle-messages -- publish-message -l 5
<br><br>
2. Consume Message Command (service-two)<br>
    docker exec -it service-two npm run handle-messages -- handle-messages -l 5
 
