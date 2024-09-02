export default class Util {
    static randomizar(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
