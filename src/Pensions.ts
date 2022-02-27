import * as readline from 'readline';
import Calculadora from './Calculadora';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const menuQuiz = () => new Promise<Number>((resolve, reject) => {
  rl.question(`Selecciona plan de pensiones al que vas a aportar
  1- Plan de pensiones de persona fisica
  2- Plan de pensiones de empresa
  3- Ambos
 `, (answer: string) => {
    if (!Number(answer)) { reject(); }

    const value = Number(answer);

    if (value > 3 || value < 1) { reject(); }

    resolve(value);
  });
});

const salaryQuiz = () => new Promise<Number>((resolve, reject) => {
  rl.question('Cuando dinero has ganado este año ? (€ en bruto) ', (answer: string) => {
    if (!Number(answer)) { reject(); }

    resolve(Number(answer));
  });
});

const personaFisicaQuiz = () => new Promise<Number>((resolve, reject) => {
  rl.question('Cuanto dinero aportamos al plan de pensiones de persona fisica ?', (answer: string) => {
    if (!Number(answer)) { reject(); }
    resolve(Number(answer));
  });
});

const empresaQuiz = () => new Promise<Number>((resolve, reject) => {
  rl.question('Cuanto dinero aportamos al plan de pensiones de empresa ?', (answer: string) => {
    if (!Number(answer)) { reject(); }
    resolve(Number(answer));
  });
});

class Pensions {
  static async start(): Promise<Number> {
    const index = await menuQuiz();

    const salary = await salaryQuiz();

    switch (index) {
      case 1: {
        const fisicaQuantity = await personaFisicaQuiz();
        return Calculadora.ahorroPersonaFisica(salary, fisicaQuantity);
      }
      case 2: {
        const empresaQuantity = await empresaQuiz();
        return Calculadora.ahorroEmpresa(salary, empresaQuantity);
      }
      case 3: {
        const fisicaQuantity = await personaFisicaQuiz();
        const empresaQuantity = await empresaQuiz();

        return +Calculadora.ahorroPersonaFisica(salary, fisicaQuantity)
                        + +Calculadora.ahorroEmpresa(empresaQuantity, empresaQuantity);
      }
      default: {
        rl.write(`'${index}' No es una opción válida`);
      }
    }

    rl.close();
    return 0;
  }
}

Pensions.start();
