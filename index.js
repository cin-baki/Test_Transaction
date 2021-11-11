var parse = require('csv-parse');
var fs = require('fs');
const yargs = require('yargs');
const request = require('request');
const Transaction = require('./transaction_process');
var timestamps=[];
var types=[];
var tokens=[];
var amounts=[];
var count = 0;
var number_data_read = 0;
var each_token_usds = [];
tokens_and_usd = {};
URL_original = 'https://min-api.cryptocompare.com/data/price?fsym=cryptocompared&tsyms=USD&api_key=2236e34ef755931b96729a69140610649662586d487d874b40b0916b25fe1a27';
const argv = yargs
    .option('timestamp', {
        alias: 't',
        description: 'The timestamp to get the amount each token',
        type: 'String',
    })
    .option('token_name', {
        alias: 'n',
        description: 'The token which will output all amount',
        type: 'String',
    })
    .option('csv_path', {
        alias: 'p',
        description: 'Path to the transactions csv file',
        type: 'String',
    })
    .help()
    .alias('help', 'h')
    .argv;
if (argv.timestamp) {timestamp_input = argv.timestamp;}
else {timestamp_input = '';}
if (argv.token_name) {token_input = argv.token_name;}
else {token_input = '';}
if (argv.csv_path) {csv_path = argv.csv_path;}
else {throw new Error('Please input path to csv file by flag -p in command line, Exp: node index.js -t 1571967208 -n ETH -p transactions.csv');}

fs.createReadStream(csv_path)
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        timestamps.push(csvrow[0]); 
        types.push(csvrow[1]);
        tokens.push(csvrow[2]);
        amounts.push(csvrow[3]);  
        process.stdout.write("Data Loading...:"+String(number_data_read += 1)+"\r");
    })
    .on('end',function() {
        console.log("\nData Processing...");
        timestamps,types,tokens,amounts, tokens_used = Transaction.get_all_data_by_input({timestamps,types,tokens,amounts,timestamp_input,token_input});
        each_token_usds = [...tokens_used];
        usds = [...tokens];
        console.log("Get all token index...");
        each_token_indexs = Transaction.get_index_each_tokens({tokens_used, tokens});
        for (let i = 0; i < tokens.length; i++) {
            request(URL_original.replace('cryptocompared',tokens[i]), { json: true }, (err, res, body) => {
                each_token_usds = Transaction.get_usd_amount({body, types, each_token_usds, amounts, usds, i});
                count += 1;
                process.stdout.write("Processing...:"+String(100*(count/number_data_read).toFixed())+"%"+"\r");
                tokens_and_usd = Transaction.get_pair_token_usd({count,tokens,each_token_usds,each_token_indexs,tokens_used});
                if (Object.keys(tokens_and_usd).length > 0){
                    if (timestamp_input != ""){
                        console.log("\nResult at timestamp: "+ timestamp_input);
                    } else {console.log("\nResult at all timestamp: ")}
                    console.log(tokens_and_usd);
                }
        });  
        }
    });