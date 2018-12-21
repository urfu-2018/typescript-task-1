export class Queue<T> {
    private readonly items: T[] = new Array();
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
        items.forEach(item => {
            this.enqueue(item);
        });
    }

    public dequeue(item: T): T | undefined {
        return this.items.shift();
    }

    public getItems(): T[] {
        return this.items.slice();
    }
}
