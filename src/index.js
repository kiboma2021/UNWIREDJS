import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDY4K7mhnvVyTs-mvtavPmUkfH-NXTqQFA",
  authDomain: "kiboma254-f4409.firebaseapp.com",
  projectId: "kiboma254-f4409",
  storageBucket: "kiboma254-f4409.appspot.com",
  messagingSenderId: "189102561308",
  appId: "1:189102561308:web:f866791db54e559dfc27d9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const db_items = collection(db, "movies");
getDocs(db_items).then(data => {
    let movies = [];
    data.docs.forEach(document => {
        movies.push({...document.data(),id: document.id});
    })
    console.log(movies);
})