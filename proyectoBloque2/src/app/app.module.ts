import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        LoginComponent
    ],
    declarations: [],
})
export class AppModule {}