import { data } from './data.js';

let functionCalls = 0;

function buildList(arr) {
  let list = document.querySelector('#list');
  let html = arr
    .map((item) => {
      return `<li data-ref="${item.id || item.ref}" title="${item.id || item.ref}"> 
  ${item.name || item.email || item.em}</li>`;
    })
    .join('');
  functionCalls++;
  list.innerHTML += `<ul data-ref="${functionCalls}">` + html + '</ul>';
}

// arr.map() arr.filter() arr.sort()  arr.reduce()
//arr.find() arr.findIndex()  arr.every()
// delete obj.prop
// Object.hasOwn(obj, 'prop')

// 1. create a new array where agent:true
const agents = data.filter((item) => {
  return Object.hasOwn(item, 'agent') && item.agent === true;
});
console.log(agents);
buildList(agents);

//2. create a new array of {id, email} using properties {ref, em} where agent is false
const people = data
  .filter((item) => {
    return Object.hasOwn(item, 'agent') && item.agent === false; //both have to be true to return true
  })
  .map((item) => {
    //create and return a new object with properties ref and em
    return { ref: item.id, em: item.email };
  });
console.log(people);
buildList(people);

//3. find the first person without an agent property
let person = data.find((item) => {
  return !Object.hasOwn(item, 'agent');
});
// functionCalls++;
console.log(JSON.stringify(person));
buildList([{ id: 0, name: JSON.stringify(person) }]);

//4. create a new array where agent:true and sort them by name
let sortedAgents = data
  .filter((item) => Object.hasOwn(item, 'agent') && item.agent === true)
  .sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    } else if (a.name > b.name) {
      return -1;
    } else {
      return 0;
    }
  });
console.log(sortedAgents);
buildList(sortedAgents);

//5. create a new array where agent:true and sort them by id
let sortedIdAgents = data
  .filter((item) => Object.hasOwn(item, 'agent') && item.agent === true)
  .sort((a, b) => {
    return a.id - b.id;
  });
console.log(sortedIdAgents);
buildList(sortedIdAgents);

//6. count the number of non-agents
let nonAgentCount = data.reduce((acc, item) => {
  if (!Object.hasOwn(item, 'agent')) {
    acc++;
  }
  return acc;
}, 0);
console.log(nonAgentCount);
buildList([{ id: nonAgentCount, name: nonAgentCount }]);

//7. create a new array of {name} sorted by length of email
let names = data
  .toSorted((a, b) => {
    //the version of sort() that returns a new array
    return a.email.length - b.email.length;
  })
  .map((item) => {
    //add the email length as the value for id or ref
    return { ref: item.email.length, name: item.name };
  });
console.log(names);
buildList(names);

//8. create an object with list of all true boolean properties and their count. Eg: {agent: 9, scientist: 1, valet: 1, bionic: 2, crazy:2}
let props = data.reduce((acc, item) => {
  //loop through each property in each object
  for (let prop in item) {
    //if the property is boolean
    if (typeof item[prop] === 'boolean') {
      //if the property is already in the accumulator, increment it
      if (Object.hasOwn(acc, prop)) {
        acc[prop]++;
      } else {
        //create the property in the accumulator and set it to 1
        acc[prop] = 1;
      }
    }
  }
  return acc;
}, {});
console.log(props);
buildList([{ id: 999, name: JSON.stringify(props) }]);

//9. get the person with a matching id
let personId = 34;
let person2 = data.find((item) => {
  return item.id === personId;
});
console.log(person2);
buildList([person2]);
