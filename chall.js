class LinkedList {
  constructor(){
    this.head= null;
    this.length=0;
  }

  insert(index, value){
    if (index < 0 || index > this.length) {
      throw new Error('Index error');
    }

    let newNode = {
      value
    };

    if(index === 0){
      newNode.next = this.head;
      this.head = newNode;
    }

    else{
      let prevNode = this._find(index-1);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
    }

    this.length++;
  }

  delete(index){
    if(index<0 || index >= this.length){
      throw new Error('Can not delete past length or before 0');
    }

    if(index === 0){
      this.head = this.head.next;
    }else{
      const prevNode = this._find(index-1);
      prevNode.next = prevNode.next.next;
    }
    this.length--;
  }

  _find(index){
    let node = this.head;
    for(let i=0; i < index;i++){
      node = node.next;
    }
    return node;
  }

  get(index){
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    let node = this._find(index);
    return node.value;
  }
}

function printList(list){
  if(isEmpty(list)){
    console.log('Empty list');
  }
  else{
    let node = list.head;
    console.log(node.value);
    while(node.next!== null){
      node = node.next;
      console.log(node.value);
    }
  }
}

function size(list){
  let counter=0;
  if(isEmpty(list)){
    return counter;
  }
  let node = list.head;
  while(node.next !== null){
    node = node.next;
    counter++;
  }
  counter++;
  return counter;
}

function isEmpty(list){
  if(list.head === null){
    return true;
  }
  return false;
}

function findPrevious(value, list){
  if(isEmpty(list)){
    throw new Error('Linked List is empty');
  }
  else{
    let node = list.head;
    let prevNode;
    if(node.value === value){
      throw new Error('You searched for the head, there is no previous node!');
    }
    while(node.value !== value){
      prevNode = node;
      node = node.next;
    }
    return prevNode;
  }
}

function findLast(list){
  if(isEmpty(list)){
    throw new Error('Linked List is empty');
  }
  else{
    let node = list.head;
    while(node.next !== null){
      node = node.next;
    }
    return node;
  }
}


function findMiddle(list){
  let node = list.head;
  let returnNode = list.head;
  while(node.next !== null && node.next.next !== null){
    node = node.next.next;
    returnNode = returnNode.next;
  }
  return returnNode.value;
}

function findThirdToLast(list){
  if(isEmpty(list)){
    throw new Error('Empty List');
  }
  let secNodeToLast;
  let firstNodeToLast;
  let node = list.head;
  let counter = 0;
  while(node.next !== null){
    if(counter ===1){
      firstNodeToLast = node;
      node = node.next;
      counter++;
    }
    else if(counter >= 2){
      secNodeToLast = firstNodeToLast;
      firstNodeToLast = node;
      node = node.next;
      counter++;
    }else{
      node= node.next;
      counter++;
    }
  }
  if(secNodeToLast){
    throw new Error('Linked List size is not at least 3');
  }
  return secNodeToLast;
}

function reverseList(list){
  let head = list.head;
  let node = head.next;
  head.next = null;
  let prevNode = head;
  let next;
  while(node.next !== null){
    next = node.next;
    node.next = prevNode;
    prevNode = node;
    node = next;
  }
  if(node.next === null){
    list.head = node;
    list.head.next = prevNode;
  }
  return list;
}

function isCycleList(list){
  if(isEmpty(list)){
    return false;
  }
  let slowNode = list.head;
  let fastNode = list.head;
  while(fastNode.next !== null && fastNode.next.next !== null){
    fastNode = fastNode.next.next;
    slowNode = slowNode.next;
    if(fastNode === slowNode){
      return true;
    }
  }
  return false;
}



class HashMap{
  constructor(initialCapacity=8){
    this.length= 0;
    this._slots= [];
    this._capacity= initialCapacity;
    this._deleted= 0;
  }

  get(key){
    // console.log('Getting', key);
    const index = this._findSlot(key);

    if(this._slots[index] === undefined){
      throw new Error('Key error');
    }

    return this._slots[index].value;
  }
  
  set(key,value){
    const loadRatio = (this.length + this._deleted +1) / this._capacity;
    // console.log('The current loadRatio is: ', loadRatio);
    if(loadRatio > HashMap.MAX_LOAD_RATIO){
      // console.log('gotta resize');
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    // console.log('Found slot at:', index);
    this._slots[index]={
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  remove(key){
    const index = this._findSlot(key);
    const slot = this._slots[index];

    if(slot === undefined){
      throw new Error('Key error');
    }

    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key){
    // console.log('finding a slot...');
    // console.log('Key passed in:', key);
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    // console.log('this is hash', hash);
    // console.log('this is capacity', this._capacity);
    // console.log('this is start:', start);

    for(let i=start; i< start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || (slot.key === key && !slot.deleted)){
        return index;
      }
    }
    // console.log();
    // console.log();
    // console.log();
  }

  _resize(size){
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this.deleted = 0;
    this._slots = [];

    for(const slot of oldSlots){
      if( slot !== undefined && !slot.deleted){
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string){
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const pHash = new HashMap;

function palindrome(string){
  let dupeCount = 0;
  for(let i = 0; i < string.length; i++){
    try{
      pHash.get(string[i]);
      dupeCount++;
    }
    catch(e){
      pHash.set(string[i]);
    }
  }
  if(string.length % 2 === 0){
    if(string.length / 2 === dupeCount){
      console.log('is a palindome');
      return true;
    }
    else{
      console.log('is NOT a palindome');
      return false;
    }
  }
  if(string.length % 2 !== 0){
    if((string.length -1) / 2 === dupeCount){
      console.log('is a palindome');
      return true;
    }
    else{
      console.log('is NOT a palindome');
      return false;
    }
  }
}

// palindrome('dad'); // letter count is 3, only contains two items in slots: D & A
// palindrome('madam'); // letter count is 5, only contains 3 items in slot
// palindrome('racecar'); // letter count is 7, only contains 4 items in slots
