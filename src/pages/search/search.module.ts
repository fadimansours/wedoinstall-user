import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MainCatergoryPage } from "../main-catergory/main-catergory";
import { SearchPage } from "./search";

@NgModule({
  declarations: [SearchPage, MainCatergoryPage],
  imports: [IonicPageModule.forChild(SearchPage)],
})
export class SearchPageModule {}
