import { View } from './types';

export class MobileView extends View {
    public render() {
        console.log(this.renderFormat('mobile', 1, 1));
    }
}
