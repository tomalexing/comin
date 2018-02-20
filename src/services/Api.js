import fire from './../config'
import firebase from 'firebase';
let db = fire.database();

function fetchItem(id, cb) {
  getChild(id).once('value', function(snapshot) {
    cb(snapshot.val())
  })
}

function fetchItems(ids, cb) {
  var items = []
  ids.forEach(function(id) {
    fetchItem(id, addItem)
  })
  function addItem(item) {
    items.push(item)
    if (items.length >= ids.length) {
      cb(items)
    }
  }
}

function getChild(path) {
  return db.child(path)
}

function getRef(path) {
    return db.ref(path)
}

function auth(){
    return firebase.auth()
}

function GoogleAuthProvider(){
  return new firebase.auth.GoogleAuthProvider()
}

function FacebookAuthProvider(){
  return new firebase.auth.FacebookAuthProvider();
}

const Api = {
    fetchItem,
    fetchItems,
    getChild,
    getRef,
    auth,
    GoogleAuthProvider,
    FacebookAuthProvider
}
export default Api;