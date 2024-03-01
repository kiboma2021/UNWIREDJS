import { initializeApp } from "firebase/app";
import { getFirestore, collection, onSnapshot, getDocs, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp } from "firebase/firestore";


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
const q_items = query(db_items, where("category", "==", "action"), orderBy("name"));

getDocs(q_items).then(data => {
    let movies = [];
    data.docs.forEach(document => {
        movies.push({...document.data(),id: document.id});
    })
    console.log(movies);
}).catch(error => {
    console.log(error);
});

// onSnapshot(db_items, (data)=>{
//         let movies = [];
//         data.docs.forEach(document => {
//             movies.push({...document.data(), id: document.id});
//         });
//         console.log(movies);
// });

const addForm = document.querySelector('.add');
addForm.addEventListener("submit", event => {
    event.preventDefault();
    addDoc(db_items, {
        name: addForm.name.value,
        description: addForm.description.value,
        category: addForm.category.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        addForm.reset();
    })
    .catch(error => {
        console.error("Error adding document", error);
    });
});

const delForm = document.querySelector('.delete');
delForm.addEventListener("submit", event => {
    event.preventDefault();
    const selectedDoc = doc(db, "movies", delForm.id.value);
    deleteDoc(selectedDoc).then(() => {
        delForm.reset();
    });
});