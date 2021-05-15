import { v4 as uuidv4 } from 'uuid';

export class UuidHelper {
    public static generate(): string {
        return uuidv4();
    }
}