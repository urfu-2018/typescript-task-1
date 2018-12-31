import { View } from './view';

export class DesktopView extends View {
    constructor() {
        super({ viewType: 'desktop', articlesLimit: 3, measurementsLimit: 2 });
    }
}
