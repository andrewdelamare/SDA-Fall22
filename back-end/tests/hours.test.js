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
    console.log(response.body);
    //expect(response.body[0].trips.length).toBe(477)
  });
});

/* 

hourRouter.post(
  "/trip",
  body("departure").isString(),
  body("ret").isString(),
  body("depId").isNumeric(),
  body("depNm").isString(),
  body("retId").isNumeric(),
  body("retNm").isString(),
  body("distance").isNumeric(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const dep = parseISO(req.body.departure);
    const ret = parseISO(req.body.ret);
    const duration = differenceInSeconds(ret, dep);
    console.log(dep);
    console.log(ret);
    const trip = {
      departure: dep,
      ret: ret,
      depId: req.body.depId,
      depNm: req.body.depNm,
      retId: req.body.retId,
      retNm: req.body.retNm,
      distance: req.body.distance,
      duration: duration,
    };
    const day = startOfDay(dep);
    const hour = startOfHour(dep);
    const result = await Hour.updateOne(
      { day: day, hour: hour },
      { $push: { trips: trip } }
    );
    console.log(result);
    return res.status(201).json(result);
  }
);
*/
