/*
    Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
    Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
	const filteredString = str.replace(/[^A-Za-z]/g, "").toLowerCase();
	let start = 0;
	let end = filteredString.length - 1;

	while (start < end) {
		if (filteredString.charAt(start) !== filteredString.charAt(end)) return false;

		start++;
		end--;
	}

	return true;
}

module.exports = isPalindrome;
