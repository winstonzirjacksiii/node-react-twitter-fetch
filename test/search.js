import chai from "chai";
import chaiHTTP from 'chai-http';
import app from '../app';

const hostURL = "http://localhost:3000";
const expect = chai.expect;

chai.use(chaiHTTP);

describe("Twitter Search Functionality", () => {
  const catsSearch = "/search/cats";

  describe("Hits a Remote Server", () => {
    it("Returns a status code of 200", (done) => {
      chai.request(app)
          .get(catsSearch)
          .end((err, res, body)=>{
            expect(res.statusCode).to.equal(200);
            done();
          });
    });
  });

  describe("Returns a JSON object containing tweets", () => {
    it("Returns an Object", (done) => {
      chai.request(app)
          .get(catsSearch)
          .end((err, res)=>{
            expect(res.body).to.be.a("object");
            done();
          });
    });
    it("The Object Contains metadata and tweets", (done) => {
      chai.request(app)
          .get(catsSearch)
          .end((err, res)=>{
            expect(res.body.statuses).to.be.a("array");
            done();
          });
    });
  });
});