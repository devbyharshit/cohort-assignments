/*
    Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
    What's Anagram?
    - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
	if (str1.length !== str2.length) return false;

	const frequency = {};

	str1.toLowerCase().split('').forEach((char) => {
		frequency[char] = frequency[char] ? frequency[char] + 1 : 1;
	});

	str2.toLowerCase().split('').forEach(char => {
		frequency[char] = frequency[char] - 1;
	})

	return Object.values(frequency).filter(num => num > 0).length > 0 ? false : true;
}

module.exports = isAnagram;
