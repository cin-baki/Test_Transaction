Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

class Transaction {
	constructor() {
		console.log("Start counting, please wait ...")
	}
	static get_usd_amount({body, types, each_token_usds, amounts, usds, i}) {
	    // This funtion return amount of tokens (which user input) in USD at each timestep.
        if (types[i] == 'WITHDRAWAL') {
            usds[i] = -1*body.USD*amounts[i];
        } else if (types[i] == 'DEPOSIT') {
            usds[i] = body.USD*amounts[i];
        }
        each_token_usds.fill(usds);
	    return each_token_usds
	}

	static get_pair_token_usd({count,tokens,each_token_usds,each_token_indexs,tokens_used}) {
	    // This function return pair token that user input and the total amount  of each in usd.
	    if (count == tokens.length){          
	        for (let k = 0; k < each_token_indexs.length; k++) {
	            each_token_usds[k] = each_token_usds[k].filter((el,i)=>each_token_indexs[k].some(j => i === j));
	            each_token_usds[k] = each_token_usds[k].reduce((total,num)=>(total+num));  
	        }
	    
	        for (let i = 0; i < tokens_used.length; i++){
	            tokens_and_usd[tokens_used[i]] = each_token_usds[i];
	        }
	    }
	    return tokens_and_usd
	}

	static get_index_each_tokens({tokens_used, tokens}){
	    // This function return indexs of the token that user input
	    var each_token_indexs = [];
	    for (let i = 0; i < tokens_used.length; i++) {
	        var tokens_choose = tokens.reduce((list_index_token, token_name, index) => {
	            if (token_name == tokens_used[i]){
	                list_index_token.push(index);
	            } 
	            return list_index_token;
	        },[]);
	        each_token_indexs.push(tokens_choose);
	    }
	    return each_token_indexs
	}


	static get_all_data_by_input({timestamps,types,tokens,amounts,timestamp_input,token_input}) {
		// This funtion will find index of the timestamp User input and return the list of each element in csv file
	    var index_time_input = timestamps.findIndex((timestamp) => timestamp==timestamp_input)
	    if (timestamp_input == ''){index_time_input=1}
	    var tokens = tokens.slice(index_time_input);
	    var types = types.slice(index_time_input);
	    var amounts = amounts.slice(index_time_input);
	    var timestamps = timestamps.slice(index_time_input);
	    var tokens_used = tokens.unique();
	    if (tokens_used.includes(token_input)){
	        tokens_used = [token_input];
	    };
	    return timestamps,types,tokens,amounts,tokens_used
	}
}
module.exports = Transaction;