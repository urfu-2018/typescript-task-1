import { AbstractView } from './AbstractView';

export class MobileView extends AbstractView {
    private static articleCount: number = 1;
    private static measurementsCount: number = 1;
    private static deviceName: string = 'mobile';

    constructor() {
        super(MobileView.deviceName, MobileView.articleCount, MobileView.measurementsCount);
    }
}
