import { GeneralView } from './types';

export class MobileView extends GeneralView {
    private articleCount: number = 1;
    private measurementCount: number = 1;
    private deviceClass: string = 'mobile';
    public render() {
        this.prepareContent(this.articleCount, this.measurementCount);
        const content = this.getContent(this.deviceClass);
        console.log(content);
    }
}
