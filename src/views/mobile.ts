import { BaseView } from './baseView';

export class MobileView extends BaseView {
    public constructor() {
        super(1, 1);
    }

    protected getViewName(): string {
        return 'mobile';
    }
}
