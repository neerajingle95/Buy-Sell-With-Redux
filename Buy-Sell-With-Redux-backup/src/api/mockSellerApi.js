import delay from "./delay";
import fetch from "node-fetch";

/*eslint-disable no-console */

// Sample data for sellers list
const sellerProducts = [
  {
    name: "Test",
    price: "1000",
    type: "Vehicle",
    category: "Brand new",
    id: 1
  }
];

// const sellerProducts = fetch("https://demo0862823.mockable.io/sellerProducts")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(result) {
//     console.log(result);
//   });

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

const generateId = sellerProduct => {
  return replaceAll(sellerProduct.name, " ", "-");
};

class SellerApi {
  static getAllSellerProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], sellerProducts));
      }, delay);
    });
  }

  static saveSellerProduct(sellerProduct) {
    sellerProduct = Object.assign({}, sellerProduct);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const minProductNameLength = 2;
        if (sellerProduct.name.length < minProductNameLength) {
          reject(`Name must be at least ${minProductNameLength} characters.`);
        }

        // Need to display list in exact reverse order of current list obtained after saving/editing
        // any product
        if (sellerProduct.id) {
          const existingProductIndex = sellerProducts.findIndex(
            a => a.id == sellerProduct.id
          );
          sellerProducts.splice(existingProductIndex, 1, sellerProduct);
          console.log(sellerProducts);
        } else {
          sellerProduct.id = generateId(sellerProduct);
          sellerProducts.unshift(sellerProduct);
          console.log(sellerProducts);
        }

        resolve(sellerProduct);
      }, delay);
    });
  }

  static deleteSellerProduct(productId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfProductToDelete = sellerProducts.findIndex(
          sellerProduct => {
            sellerProduct.id !== productId;
          }
        );
        sellerProducts.splice(indexOfProductToDelete, 1);
        resolve();
      });
    });
  }
}

export default SellerApi;
