import { test, expect } from "@playwright/test";

test.describe("Api tests", () => {
  test("GET /products/{id}", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const getProductResponse = await request.get(
      apiUrl + "/products/search?q=thor%20hammer",
    );
    expect(getProductResponse.status()).toBe(200);
    const productBody = await getProductResponse.json();
    const productId = productBody.data[0].id;

    const response = await request.get(apiUrl + "/products/" + productId);

    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body.in_stock).toBe(true);
    expect(body.is_rental).toBe(false);
    expect(body.name).toBe("Thor Hammer");
    expect(body.price).toBe(11.14);
  });

  test("GET /products", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const response = await request.get(apiUrl + "/products");

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data.length).toBe(9);
    expect(body.total).toBe(50);
  });

  test("POST /users/login", async ({ request }) => {
    const apiUrl = "https://api.practicesoftwaretesting.com";
    const response = await request.post(apiUrl + "/users/login", {
      data: {
        email: "customer2@practicesoftwaretesting.com",
        password: "welcome01",
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.access_token).toBeTruthy();
  });
});
