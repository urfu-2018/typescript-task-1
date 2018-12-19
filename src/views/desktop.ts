import { BaseView } from './baseView';

export class DesktopView extends BaseView {
    public constructor() {
        super(2, 3);
    }

    protected getViewName(): string {
        return 'desktop';
    }
}
