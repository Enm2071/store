const jwt = require('jsonwebtoken');

const secret = 'algoGrande';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MTE0Nzg2OX0.9aJs3s-C1RqxTHMSsFfeATgl3oHhpA-iVrJeybQZmpU";

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const decoded = verifyToken(token, secret);
console.log(decoded);
