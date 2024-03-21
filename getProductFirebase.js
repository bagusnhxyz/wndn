// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCc6lTfOXPqGG4l9fLzF9GgS4VDfw7YQEI",
    authDomain: "dbwa-c097c.firebaseapp.com",
    projectId: "dbwa-c097c",
    storageBucket: "dbwa-c097c.appspot.com",
    messagingSenderId: "948107828225",
    appId: "1:948107828225:web:1b12824451fd8aa388b400",
    measurementId: "G-7TW7B6MY32"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const productsRef = ref(database, 'akun/id');

// Function to render products from Firebase
function renderProducts(snapshot) {
    const productContainer = document.getElementById('product-list');
    productContainer.innerHTML = ''; // Clear previous content
    snapshot.forEach((childSnapshot) => {
        const productData = childSnapshot.val();
        const productBox = document.createElement('div');
        productBox.classList.add('content-box');
        productBox.innerHTML = `
            <style>
                .content-box {
                    background-color: #333;
                    padding: 20px;
                    border-radius: 10px;
                    margin-bottom: 20px;
                }

                .content-box img {
                    max-width: 100%;
                    height: 140px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }

                .btn-whatsapp {
                    background-color: #25D366;
                    border-color: #25D366;
                    color: #fff;
                }
            </style>
            <img src="${productData.imageUrl}" alt="${productData.akunType}">
            <h2>${productData.trxType}</h2>
            <p>- Akun : ${productData.akunType}<br>- Login  : ${productData.loginType}<br>- Spek<br>Vault : ${productData.vault}<br>${productData.spek}<br>Harga : ${productData.price}</p>
            <a href="https://wa.me/${productData.wa}" class="btn btn-whatsapp" target="_blank">WhatsApp</a>
        `;
        productContainer.appendChild(productBox);
    });
}

// Listen for changes in products data
onValue(productsRef, renderProducts);
