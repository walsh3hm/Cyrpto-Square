// create our Crypto class
// it takes a string as an argument
var Crypto = function(text) {
	this.message = text;
};

Crypto.prototype.normalizePlaintext = function() {
	return this.message.replace(/[\W]/g, "").toLowerCase();
};

Crypto.prototype.size = function() {
	var length = this.normalizePlaintext().length;
	return Math.ceil(Math.sqrt(length));
};

Crypto.prototype.plaintextSegments = function() {
	var segments = [],
		npt = this.normalizePlaintext(),
		size = this.size();

	for (var i = 0; i < npt.length; i += size) {
		// extract segments from the normalized plain text
		// and add it to the segements array
		segments.push(npt.substr(i, size));
	}

	// return an array of strings representing
	// segments of the normalized plain text
	return segments;
};

Crypto.prototype.ciphertext = function() {
	var ct = "",
		size = this.size(), // the number of columns
		segs = this.plaintextSegments(); // the rows

	// loop through the columns
	for (var i = 0; i < size; i += 1) {
		// loop through the rows
		for (var j = 0; j < segs.length; j += 1) {
			ct += segs[j].charAt(i);
		}
	}

	// returns a string that represents
	// the cipher text, i.e. the encoded message
	return ct;
};

module.exports = Crypto;