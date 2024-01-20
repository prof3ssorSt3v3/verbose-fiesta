import { data } from './data.js';

//1. create a new array where agent:true

//2. create a new array of {id, email} using properties {ref, em} where agent is false

//3. find the first person without an agent property

//4. create a new array where agent:true and sort them by name

//5. create a new array where agent:true and sort them by id

//6. count the number of non-agents

//7. create a new array of {name} sorted by length of email

//8. create an object with list of all true boolean properties and their count. Eg: {agent: 5, scientist: 1, valet: 1, bionic: 2, crazy:2}

//9. get the person with a matching id

function buildList(arr) {
  let list = document.querySelector('#list');
  list.innerHTML = arr
    .map((item) => {
      return `<li data-ref="${item.id}" title="${item.id}"> ${item.name || item.email}</li>`;
    })
    .join('');
}

buildList(data);
