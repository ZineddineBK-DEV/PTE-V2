import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from '@syncfusion/ej2-base';




registerLicense("ORg4AjUWIQA/Gnt2VFhiQlVPcEBDXXxLflF1VWVTf1h6d1JWESFaRnZdQV1mSH9TcEVqWXZYcXRc");


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
