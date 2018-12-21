export class Queue<T> {
    private items: T[] = new Array();
    private readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    public enqueue(item: T) {
        if (this.items.length === this.capacity) {
            this.items.shift();
        }
        return this.items.push(item);
    }

    public enqueueAll(items: T[]) {
        this.items = items.slice(-this.capacity);
    }

    public dequeue(item: T): T | undefined {
        return this.items.shift();
    }

    public getAll(): T[] {
        return this.items.slice();
    }
}
