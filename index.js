const pl = require("tau-prolog");

// start session
const session = pl.create();

// load prolog
const fs = require('fs');
const program = fs.readFileSync("logic.pl", "utf8");
