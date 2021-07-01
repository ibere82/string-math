function stringMath(expression) {
  try {
    const result = resolveExpression(expression);
    return result;
  } catch (error) {
    return error.message;
  };
};

function resolveExpression(expression) {

  /*
    Elimina eventuais espaços em branco.
  */
  const validateExpression = expression.replace(/\s/gi, '');

  /*
    Cria um array de termos da expressão excluindo os operadores de adição e subtração.
  */
  const therms = validateExpression
    .split(/[\+\-]/gi)
    .filter(elem => elem !== '');

  /*
    Cria um array de operadores de adição e subtração e filtra para que contenham apenas um sinal de '+' ou '-'.
    A lógica empregada é a de que se a somatória de operadores '-' for ímpar, o termo é negativo,
    se for par ou 0, o termo é positivo.
    É adicionado um sinal de '+' ao início da expressão para garantir 
    paridade entre os índices dos arrays de operadores e array de termos.
  */
  const operators = (`+${validateExpression}`)
    .split(/[^\+\-]/gi)
    .filter(elem => elem !== '')
    .map(elem =>
      elem.split('').reduce((acc, cur) => cur === '-' ? acc + 1 : acc, 0) % 2 === 0 ? '+' : '-');

  if (operators.length !== therms.length) throw new TypeError('Expressão mal formada');

  /*
    Faz o reduce usando o mesmo índice do array de termos para recuperar o operador.
    Em cada iteração os termos são passados para a função resolveTherm para resolver eventuais operações
    de multiplicação, divisão ou potenciação.
  */
  const result = therms.reduce((accumulated, value, index) => {
    const resolvedTherm = parseFloat(resolveTherm(value));
    return operators[index] === '+'
      ? accumulated + resolvedTherm
      : accumulated - resolvedTherm;
  }, 0);

  return result;
};


function resolveTherm(therm) {

  /*
    Cria um array de fatores do termo, excluindo os operadores de multiplicação e divisão.
  */
  const factors = therm.split(/[\\*\/]/gi);

  /*
    Cria um array de operadores de multiplicação e divisão.
    É adicionado um sinal de '*' ao início da expressão para garantir 
    paridade entre os índices dos arrays de operadores e array de fatores.
  */
  const operators = (`*${therm}`)
    .split(/[^\\*\/]/gi)
    .filter(elem => elem !== '');

  /*
    Testa presença de operadores de multiplicação e divisão concatenados configurando em uma expressão mal formada.
  */
  if (operators.filter(elem => elem.length !== 1).length !== 0) throw new TypeError('Expressão mal formada');

  /*
    Faz o reduce usando o mesmo índice do array de fatores para recuperar o operador.
    Em cada iteração os fatores são passados para a função resolveFactor para resolver eventuais operações
    de potenciação.
  */
  const result = factors.reduce((accumulated, factor, index) => {
    const resolvedFactor = parseFloat(resolveFactor(factor));
    if (operators[index] === '/' && resolvedFactor === 0) throw new TypeError('Divisão por zero');
    return operators[index] === '*'
      ? accumulated * resolvedFactor
      : accumulated / resolvedFactor;
  }, 1);

  return result;
};

function resolveFactor(factor) {

  const result = factor
    .split('^2')
    .reduce((accumulated, current, index) => index === 0 ? parseFloat(current) : accumulated ** 2, 0);
  return result;
};

module.exports = stringMath;
