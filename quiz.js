const prompt = require(`prompt-sync`)({ signit: true })
const questions = require('./questions.json')
const fs = require('fs')
const answers = [];
console.log(`
--------------------------------------------------------------------
HUND, KATT, KANIN ELLER FISK?
Gör quizen och se vilket djur som passar dig bäst!

Svara på frågorna med 1 (Ja) eller 2 (Nej).

Ange ditt namn
--------------------------------------------------------------------`);
const userName = prompt();
for (let i = 0; i < questions.length; i++) {
  console.log(questions[i].question.ask)
  console.log(`
  --------------------------------------------------------------------
  1. Ja
  2. Nej
  --------------------------------------------------------------------`);
  let repeatQuestion = true;
  while (repeatQuestion) {
    const answer = prompt();
    if (answer == 1 || answer == 2) {
      answers.push(answer)
      repeatQuestion = false
    } else {
      console.log("Skriv 1 eller 2 för att besvara frågan.");
    }
  }
}
let dogResult = 0;
let catResult = 0;
let rabbitResult = 0;
let fishResult = 0;
for (let i = 0; i < answers.length; i++) {
  const answer = answers[i];
  dogResult += questions[i].question[answer].Dog
  catResult += questions[i].question[answer].Cat
  rabbitResult += questions[i].question[answer].Rabbit
  fishResult += questions[i].question[answer].Fish
}
console.log(`
-------------------------------------------------------------------- `)
console.log(userName);
const total = dogResult + catResult + rabbitResult + fishResult
let percent = {
  Namn: userName,
  Datum: new Date().toISOString(),
  Points: [
    {
      Djur: "Hund",
      Poäng: dogResult,
      Procent:
        ((dogResult / total) * 100).toFixed(1)
    },
    {
      Djur: "Katt",
      Poäng: catResult,
      Procent:
        ((catResult / total) * 100).toFixed(1)
    },
    {
      Djur: "Kanin",
      Poäng: rabbitResult,
      Procent:
        ((rabbitResult / total) * 100).toFixed(1)
    },
    {
      Djur: "Fisk",
      Poäng: fishResult,
      Procent:
        ((fishResult / total) * 100).toFixed(1)
    }
  ]
}
function compareNumbers(a, b) {
  return a.Procent - b.Procent;
}
percent.Points.sort(compareNumbers);
const reversed = percent.Points.reverse();
console.log(reversed)

const results = require(`./results.json`)
results.push(percent)
fs.writeFile(`./results.json`, JSON.stringify(results, null, 2), (err) => {
  if (err) throw err;
  console.log('Ditt resultat har sparats');
})
console.log(`
Quizen avslutas
--------------------------------------------------------------------`)
