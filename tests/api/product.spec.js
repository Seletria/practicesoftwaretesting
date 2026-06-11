import { test, expect } from '@playwright/test';

test.describe('Product API', () => {

  test('should return all products', async ({ request }) => {
    const response = await request.get(`${process.env.API_URL}/products`);
    const body = await response.json();

    expect(response.status()).toEqual(200);
    expect(body.data.length).toBeGreaterThan(1);
  })

  test('should return a single product by id', async ({ request }) => {
    const listResponse = await request.get(`${process.env.API_URL}/products`);
    const listBody = await listResponse.json();
    const productId = listBody.data[0].id;

    const productResponse = await request.get(`${process.env.API_URL}/products/${productId}`);
    const productBody = await productResponse.json();

    expect(productResponse.status()).toEqual(200);
    expect(productBody.id).toBe(productId);
    expect(productBody.name).toBeTruthy();
  })

  test('should return 404 when product id does not exist', async ({ request }) => {
    const productResponse = await request.get(`${process.env.API_URL}/products/99999`);
    const productBody = await productResponse.json();

    expect(productResponse.status()).toEqual(404);
    expect(productBody.message).toContain('Requested item not found');

  })

  test('should return products filtered by category', async ({ request }) => {
    const categoryResponse = await request.get(`${process.env.API_URL}/categories`);
    const categoryBody = await categoryResponse.json();
    const categoryId = categoryBody[3].id;

    const productResponse = await request.get(`${process.env.API_URL}/products`, {
      params: { by_category: categoryId }
    })
    const productBody = await productResponse.json();

    expect(productResponse.status()).toEqual(200);
    expect(productBody.data.length).toBeGreaterThan(1);

    console.log(productBody)

  })

  test('should return complete product data for each product', async ({ request }) => {
    const productResponse = await request.get(`${process.env.API_URL}/products`);
    const body = await productResponse.json();

    body.data.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.description).toBeDefined();
      expect(product.price).toBeDefined();
    });
  })
})