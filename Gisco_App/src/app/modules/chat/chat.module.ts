import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ChatPage } from '../../pages/chat/chat';

@NgModule({
	declarations: [ChatPage],
	imports: [IonicModule],
	exports: [ChatPage]
})
export class ChatModule {}
