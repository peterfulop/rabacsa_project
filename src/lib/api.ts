import { UpdateProduct } from "../utils/interfaces/product.interface";

const FIREBASE_DOMAIN =
  "https://reactproductapp-default-rtdb.europe-west1.firebasedatabase.app/";

export async function getAllProducts() {
  const response = await fetch(`${FIREBASE_DOMAIN}/products.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch products.");
  }
  const transformedProducts = [];
  for (const key in data) {
    data[key].id = key;
    const productObj = {
      ...data[key],
    };

    transformedProducts.push(productObj);
  }
  return transformedProducts;
}

export async function getSingleProduct(productId: string) {
  const response = await fetch(`${FIREBASE_DOMAIN}/products/${productId}.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch product.");
  }

  data.id = productId;
  const loadedProduct = {
    ...data,
  };

  return loadedProduct;
}

export async function addProduct(productData: any) {
  const response = await fetch(`${FIREBASE_DOMAIN}/products.json`, {
    method: "POST",
    body: JSON.stringify(productData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create product.");
  }

  return null;
}
export async function updateProduct(
  productData: UpdateProduct,
  productId: string
) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/products/${productId}.json`,
    {
      method: "PATCH",
      body: JSON.stringify(productData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not update product.");
  }

  return null;
}
export async function deleteProduct(productId: string) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/products/${productId}.json`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not delete product.");
  }

  return null;
}
