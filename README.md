Run the following Commands:
 
# start mongo shell.
mongo  
 
# make a collection to hold db documents.
use questions
 
# insert a document.
db.questions.insert( { "question": "Who was the first computer programmer", "answer": "Ada Lovelace", "answerID": 1 } )
 
# insert another document.
db.questions.insert( { "question": "Who led software development for NASA's Apollo lunar mission?", "answer": "Margaret Hamilton", "answerID": 2 } )

# start redis server
"redis-server" or if that doesn't work do "redis-server /usr/local/ect/redis.conf"

# start redis client
redis-cli

# add data to redis
set right 0
set wrong 0


# start node server
npm start

> Begin posts and gets.
