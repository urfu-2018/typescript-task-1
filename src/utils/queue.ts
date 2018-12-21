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
        let anyNewItem: boolean = false;

        items.forEach(item => {
            if (this.items.indexOf(item) === -1) {
                anyNewItem = true;
                this.enqueue(item);
            }
        });

        return anyNewItem;
    }

    public dequeue(item: T): T | undefined {
        return this.items.shift();
    }

    public getAll(): T[] {
        return this.items.slice();
    }
}
