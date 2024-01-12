import { randomUUID as uuid } from "crypto"

export class TestNewUuid{
    constructor() {
        this.id = uuid();
    }
    
}