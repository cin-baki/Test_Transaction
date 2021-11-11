# Test_Transaction
This repo is the node.js script that will calculate the transaction by the time and token name that user input.
#### transactions_test.csv is smaller than original transaction csv file. This csv file only contain 30 timestamps. Only use for debug and testing to save time.
# How to run the code
#### First install all dependences package by package.json file.
#### Run the code: 
node index.js -t 1571967208 -n ETH -p transactions_test.csv
# Explain the code
The system use fs module to interact with csv file and sv-parse module to parse data in csv file. The readstream is used to optimize the system performance when the system need to  process another task and dont need to wait for process a large csv file. The data is piped to a function of csv-parser.
The transaction data is seprated into each element (timestamp, transaction_type, token and amount) as a list file. The purpose of seperate (not combine in one array) is for clear and easy to write code.
Transaction class 
