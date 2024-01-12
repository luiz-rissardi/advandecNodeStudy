import { TestNewUuid } from "./newuuid.js";
import { TestOldUuid } from "./olduuid.js";
import BenchMarking from "benchmark";

const suite = new BenchMarking.Suite();

const arr = [
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  ,
  1,
  11,
  1,
  1,
  1,
  1,
  1,
  1,
  11,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  1,
  ,
  1,
  1,
  11,
  1,
  ,
  1,
  11,
  1,
];

const number = "995524777"

suite
  .add("###withRegex", () => {
    function soma(a, b) {
      return a + b
    }

    const teste = soma(2, 3)
  })
  .add("###notRegex", () => {
    function soma(a, b) {
      return a + b
    }

    const teste = soma(2, 3)
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log(`this fatested is ${this.filter("fastest").map("name")}`);
  })
  .run({ "async": true });


  const teste = new Map()

