function findNumberCombinations(l) {
  let combinations = [[]];
  for (let i = 1; i <= 9; i++) {
    let len = combinations.length
    for (let j = 0; j < len; j++) {
      combinations.push(combinations[j].concat(i));
    }
  }
  return combinations.filter(combi => combi.length === l) 
}

function section3 (l, t) {
  let combinations = findNumberCombinations(l)
  return combinations.filter(combi => combi.reduce((a, b) => a + b) === t)
}

console.log(section3(3, 8)) // [[1,2,5], [1,3,4]]
console.log(section3(3,6)) // [[1,2,3]]
console.log(section3(4,5)) //[]