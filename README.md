# Websocket Template

Template for web-sockets and offline development with dynamodb# websocket-template

Usage:
1. wscat -c ws://localhost:3001
2. {"action":"welcome"} => welcome route
3. {"action":"rename", "name": "Nick"} => rename route
4. {"action":"private", "receiverId": "cl1lywyfg003izsn2g5yr4h8n", "message": "Hey There !"} => private message route


Learned:
1. huge change with serverless framework, meaning serverless-dotenv-plugin is now useless in serverless.yml file
2. https://github.com/neverendingqs/serverless-dotenv-plugin/discussions/155