import { v4 as uuid, v1 } from "uuid";

export class TestOldUuid {
    constructor() {
        this.id = v1();
    }
}

