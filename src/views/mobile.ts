import { View } from './view';

export class MobileView extends View {
    constructor() {
        super({ viewType: 'mobile', articlesLimit: 1, measurementsLimit: 1 });
    }
}
