import delay from "./delay";
import fetch from "node-fetch";

/*eslint-disable no-console */

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const products = [
  {
    name: "TVS Jupiter Classic",
    price: "73000",
    type: "Vehicle",
    category: "Brand new",
    id: 1
  },
  {
    name: "Tupperware Bottle",
    price: "500",
    type: "Crockery",
    category: "Brand new",
    id: 2
  },
  {
    name: "Classmate Diary",
    price: "80",
    type: "Stationery",
    category: "Brand new",
    id: 3
  },
  {
    name: "Black Hoodie",
    price: "350",
    type: "Clothes",
    category: "Second hand",
    id: 4
  },
  {
    name: "Swift Dzire",
    price: "400000",
    type: "Vehicle",
    category: "Second hand",
    id: 5
  },
  {
    name: "Dell Laptop",
    price: "80000",
    type: "Electronics",
    category: "Brand new",
    id: 6
  },
  {
    name: "Samsung LED TV",
    price: "60000",
    type: "Electronics",
    category: "Second hand",
    id: 7
  },
  {
    name: "Team India Jersey",
    price: "6000",
    type: "Clothes",
    category: "Brand new",
    id: 8
  },
  {
    name: "Bose Speakers",
    price: "120000",
    type: "Electronics",
    category: "Brand new",
    id: 9
  },
  {
    name: "Honda Activa",
    price: "20000",
    type: "Vehicle",
    category: "Second hand",
    id: 10
  }
];

// Returns response of mock API, can check in Network tab on Chrome Devtools
// TODO: 1. Get response right after logging in as buyer, need to reload page currently
//       2. Display list of products in table

// const products = fetch("https://demo0862823.mockable.io/products")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(result) {
//     console.log(result);
//   });

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = product => {
  return replaceAll(product.name, " ", "-");
};

class BuyerApi {
  static getAllProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], products));
      }, delay);
    });
  }

  static saveProduct(product) {
    product = Object.assign({}, product); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minProductNameLength = 2;
        if (product.name.length < minProductNameLength) {
          reject(`Name must be at least ${minProductNameLength} characters.`);
        }

        if (product.id) {
          const existingProductIndex = products.findIndex(
            a => a.id == product.id
          );
          products.splice(existingProductIndex, 1, product);
        } else {
          //Just simulating creation here.
          //The server would generate ids for new products in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          product.id = generateId(product);
          products.push(product);
        }

        resolve(product);
      }, delay);
    });
  }

  static deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfProductToDelete = products.findIndex(product => {
          product.id !== productId;
        });
        products.splice(indexOfProductToDelete, 1);
        resolve();
      });
    });
  }
}

export default BuyerApi;
