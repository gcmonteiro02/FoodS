/**
 * @jest-environment node
 */

const app = require("../src/app");
const supertest = require("supertest");
const request = supertest(app);


describe("Handler tests", () => {
  it("Should return an error: more than 3 ingredients in query parameter", async (done) => {
    const response = await request.get("/recipes/?i=onions,orange,salmon,butter");
    expect(response.status).toBe(422);
    done();
  });

  it("Should return an error: the query parameter i is required.", async (done) => {
    const response = await request.get("/recipes/?");
    expect(response.status).toBe(422);
    done();
  });
});
