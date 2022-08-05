const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("Testing hours endpoints", () => {
  it("GET /hour", async () => {
    const response = await api
      .get("/hour")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body[0].trips.length).toBe(477);
  });

  it("GET /hours/:day/:hour", async () => {
    const response = await api
      .get("/hours/1619816400000/0")
      .expect("content-type", /json/)
      .expect(200);
    expect(response.body[0].trips.length).toBe(477);
  });

  it("POST /trip", async () => {
    const response = await api
      .post("/trip")
      .send({
        departure: "2021-04-30T21:59:54.000+00:00",
        ret: "2021-04-30T22:06:44.000+00:00",
        depId: 274,
        depNm: "Voikukantie",
        retId: 276,
        retNm: "Puotinharju",
        distance: 1012,
      })
      .expect("content-type", /json/)
      .expect(201);
  });
});
