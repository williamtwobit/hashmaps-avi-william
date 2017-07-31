class HashMap{
  constructor(initialCapacity=8){
    this.length= 0;
    this._slots= [];
    this._capacity= initialCapacity;
    this._deleted= 0;
  }

  get(key){
    console.log('Getting', key);
    const index = this._findSlot(key);

    if(this._slots[index] === undefined){
      throw new Error('Key error');
    }

    return this._slots[index].value;
  }
  
  set(key,value){
    const loadRatio = (this.length + this._deleted +1) / this._capacity;
    console.log('The current loadRatio is: ', loadRatio);
    if(loadRatio > HashMap.MAX_LOAD_RATIO){
      console.log('gotta resize');
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    console.log('Found slot at:', index);
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
    console.log('finding a slot...');
    console.log('Key passed in:', key);
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    console.log('this is hash', hash);
    console.log('this is capacity', this._capacity);
    console.log('this is start:', start);

    for(let i=start; i< start + this._capacity; i++){
      const index = i % this._capacity;
      const slot = this._slots[index];
      if(slot === undefined || (slot.key === key && !slot.deleted)){
        return index;
      }
    }
    console.log();
    console.log();
    console.log();
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

const testHash = new HashMap;

testHash.set('cat', 'Black Cat');
testHash.set('dog', 'real dog');
testHash.set('person', 'William');
console.log(testHash.get('cat'));
console.log(testHash.get('person'));