// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// randomFunc Object
const randomFunc = {	
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Generate event listen
generateEl.addEventListener('click', () => {
	const length = +lengthEl.value; // + sign makes string into a number
	const hasUpper = uppercaseEl.checked;
	const hasLower = lowercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasUpper, 
		hasLower, 
		hasNumber, 
		hasSymbol, 
		length
	);

});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;

	if(!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Pasword copied to clipboard!');
});

// Generate password function 
function generatePassword(upper, lower, number, symbol, length) {
	let generatedPassword = '';

	const typesCount = upper + lower + number + symbol;

	console.log('typesCount: ', typesCount);

	// Filter out the item with the value of 'False' from the array
	const typesArr = [{upper}, {lower}, {number}, {symbol}].filter
	(
		item => Object.values(item)[0]
	);

	if(typesCount === 0) {
		return '';
	}

	for(let i=0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];

			// console.log('funcName: ', funcName);

			generatedPassword += randomFunc[funcName]();
		});
	}

	// Slice the generated password(which has the length of the number of checked condition) to be the length given
	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;

}

// Generator Functions - http://net-comber.com/charset.html (Codes for the characters)

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // lower case starts from 97 in the character set
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Upper case starts from 65 in the character set
}

function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // Number starts from 48 in the character set
}

function getRandomSymbol() {
	const symbols = '!@#$%^&*(){}[]=+-<>/,.';
	return symbols[Math.floor(Math.random() * symbols.length)]; // Get the random number of index
}

