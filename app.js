class HashMap{
  constructor(initialCapacity=8){
    this.length= 0;
    this._slots= [];
    this._capacity= initialCapacity;
    this._deleted= 0;
  }

  get(key){
    
  }
  
  set(key,value){

  }

  remove(key){

  }

  _findSlot(key){

  }

  _resize(size){

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