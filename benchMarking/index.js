import { createReadStream } from "fs";
import { Writable, Transform } from "stream";
import BenchMarking from "benchmark";
import csv from "csvtojson";

const suite = new BenchMarking.Suite();
const readble = createReadStream("./benchMarking/database.csv")
suite
  .add("###withTransform", () => {

    readble
      .pipe(csv())
      .pipe(new Writable({
        write(chunk, enc, cb) {
          const text = chunk.toString();
          cb()
        }
      }))

  })
  .add("###withoutTransform", async () => {
    readble
    .pipe(toJson())
    .pipe(new Writable({
      write(chunk, enc, cb) {
        const text = chunk.toString()
        cb()
      }
    }))
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`this fatested is ${this.filter("fastest").map("name")}`);
  })
  .run({ "async": true });




  function toJson() {
    let headers
    return new Transform({
        transform(chunk, enc, cb) {
            this.counter = this.counter ?? 0;
            if(this.counter == 0){
                headers = chunk.toString().replace("\r","").split(",");
                this.counter++
            }
            const data = chunk.toString().split(",");
            const obj = {};

            data.forEach((value,index) => {
                obj[headers[index]] = value;
            })

            this.push(JSON.stringify(obj));
            cb()
        }
    })
}
