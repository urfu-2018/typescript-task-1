import { View } from './types';

export class MobileView extends View {
    public render() {
        this.cutLatestNews(1, 1);
        console.log(this.renderFormat('mobile'));
    }
}
