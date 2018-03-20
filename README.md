1) in console "yarn" 
2) create in root folder of project "config.js" with following  
import firebase from 'firebase'

const config = {
  // your config from firebase
};

var configProd = {
  // your config from firebase
};

var fire  = firebase.initializeApp(process.env.REACT_APP_BUILD ? configProd : config);

export default fire;

3)  in console "yarn start" (or "yarn build")
