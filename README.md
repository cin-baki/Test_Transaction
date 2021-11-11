# Test_Transaction
This repo is the node.js script that will calculate the transaction by the time and token name that user input.
#### transactions_test.csv is smaller than original transaction csv file. This csv file only contain 30 timestamps. Only use for debug and testing to save time. 
# How to run the code
#### First install all dependences package by package.json file.
#### Run the code: 
* node index.js -t 1571967208 -n ETH -p transactions_test.csv
* The result when use transactions_test.csv may be contain NEGATIVE value because the transaction_test.csv DOES NOT CONTAIN all the past and only for testing.
* The screen will show the number of percent the data is loading and processing for user to know how much percent the system is processing.
* ![image](https://user-images.githubusercontent.com/43028613/141354206-02762621-317b-40fd-b196-2df9c7441993.png) 
# Explain the code
* The system use fs module to interact with csv file and sv-parse module to parse data in csv file. The readstream is used to optimize the system performance when the system need to process another task and dont need to wait for process a large csv file. The data is piped to a function of csv-parser.
* The transaction data is seprated into each element (timestamp, transaction_type, token and amount) as a list file. The purpose of seperate (not combine in one array) is for clear and easy to write code.
* The data after parsing from csv and pushing to each element list, will be processed to get the new array for each element that contain all data from the past to the User's input timestamp.
* If user input a token by -n, the unique token variable in the code will be set to an array contain only one token that user input. If user don't specific the token name arg, The unique token will be all token (not all, but contain from the past to the input timestamp, if not input -t arg it will be all) contain on transaction csv file. 
* A loop will loop over the list of token above and replace the name on the URL of cryptocompare link with API. Get the exchange rate result. Multiply exchange rate with amount and the withdraw (multiply with -1) or deposit (multiply with +1).
* Final, the usd amount will pair with each token and use reduce to get the sum of all.
