const stringMath = require('./src/stringMath.js')

const contas = []

contas[0] = '55 + 4 -- 333 + 2 - 6';
contas[1] = '1.5+2.7';
contas[2] = '-2*9.5+8-6';
contas[3] = '5+9+8+6/8-9';
contas[4] = '8/7*9-5+8+984*65';
contas[5] = '45-6';
contas[6] = '-5+-9-6';
contas[7] = '+27-5+-6';
contas[8] = '9*85*/657';
contas[9] = '+85*9';
contas[10] = '-5*8';
contas[11] = '45*9/5';
contas[12] = '5+9+-7';
contas[13] = '5*9/0';
contas[14] = '4*9+987';

contas.forEach(conta => console.log(conta, stringMath(conta)))

//console.log(stringMath('1/0'))