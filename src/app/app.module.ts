import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { LoginComponent } from "./components/login/login";

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        LoginComponent
    ],
    declarations: [],
})
export class AppModule {}