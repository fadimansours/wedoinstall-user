import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Geolocation } from "@ionic-native/geolocation";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { GooglePlus } from "@ionic-native/google-plus";
import { OneSignal } from "@ionic-native/onesignal";
import { Camera } from "@ionic-native/camera";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { IonicImageViewerModule } from "ionic-img-viewer";
import { Stripe } from "@ionic-native/stripe";
import { SocialSharing } from "@ionic-native/social-sharing";
import { CallNumber } from "@ionic-native/call-number";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { SignUpPage } from "../pages/sign-up/sign-up";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";
import { SearchPage } from "../pages/search/search";
import { StartSplashPage } from "../pages/start-splash/start-splash";
import { JobsPage } from "../pages/jobs/jobs";
import { ProfilePage } from "../pages/profile/profile";
import { SigninModalPage } from "../pages/signin-modal/signin-modal";
import { FlashDealPage } from "../pages/flash-deal/flash-deal";
import { RequestJobPage } from "../pages/request-job/request-job";
import { PopularViewPage } from "../pages/popular-view/popular-view";
import { SeasonalViewPage } from "../pages/seasonal-view/seasonal-view";
import { AvailableViewPage } from "../pages/available-view/available-view";
import { RescueStreakPage } from "../pages/rescue-streak/rescue-streak";
import { LearnmoreModalPage } from "../pages/learnmore-modal/learnmore-modal";
import { CreditPage } from "../pages/credit/credit";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { AddressAddPage } from "../pages/address-add/address-add";
import { AddressDetailPage } from "../pages/address-detail/address-detail";
import { PaymentAddPage } from "../pages/payment-add/payment-add";
import { PaymentDetailPage } from "../pages/payment-detail/payment-detail";
import { ChatPage } from "../pages/chat/chat";
import { ChooseLanguagePage } from "../pages/choose-language/choose-language";
import { ConfigProvider } from "../providers/config/config";
import { AlertProvider } from "../providers/alert/alert";
import { ServiceProvider } from "../providers/service/service";
import { SubCategoryPage } from "../pages/sub-category/sub-category";
import { ConversationPage } from "../pages/conversation/conversation";
import { AcceptDetailPage } from "../pages/accept-detail/accept-detail";
import { ReschedulePage } from "../pages/reschedule/reschedule";
import { ReviewPage } from "../pages/review/review";
import { QuoteDetailPage } from "../pages/quote-detail/quote-detail";
import { AdminChatPage } from "../pages/admin-chat/admin-chat";
import { CalanderPage } from "../pages/calander/calander";
import { CancelPage } from "../pages/cancel/cancel";
import { TermsConditionPage } from "../pages/terms-condition/terms-condition";
import { ProductPage } from "../pages/product/product";
import { ProductDetailPage } from "../pages/product-detail/product-detail";
import { ProductListPage } from "../pages/product-list/product-list";
import { CartPage } from "../pages/cart/cart";
import { DiscountOffersPage } from "../pages/discount-offers/discount-offers";
import { CheckoutPage } from "../pages/checkout/checkout";
import { MyorderPage } from "../pages/myorder/myorder";
import { OrderDetailPage } from "../pages/order-detail/order-detail";
import { ConfirmJobdetailPage } from "../pages/confirm-jobdetail/confirm-jobdetail";
import { RequestModelPage } from "../pages/request-model/request-model";
import { SuccessPage } from "../pages/success/success";
import { ConfirmcheckoutPage } from "../pages/confirmcheckout/confirmcheckout";
import { userService } from "../providers/service/userService";
import { ApplyCreditPointsPage } from "../pages/apply-credit-points/apply-credit-points";
import { creditServiceProvider } from "../providers/coupon-service/credit-service";
import { UserPointsProvider } from "../providers/user-points/user-points";
import { MainCatergoryPage } from "../pages/main-catergory/main-catergory";
import { SubSearchPage } from "../pages/sub-search/sub-search";
import { notificationService } from "../providers/service/notification";
import { cartService } from "../providers/service/cartService";
import { RequestProductPage } from "../pages/request-product/request-product";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    TabsPage,
    SearchPage,
    StartSplashPage,
    JobsPage,
    ProfilePage,
    SigninModalPage,
    FlashDealPage,
    RequestJobPage,
    PopularViewPage,
    SeasonalViewPage,
    AvailableViewPage,
    RescueStreakPage,
    LearnmoreModalPage,
    CreditPage,
    EditProfilePage,
    AddressAddPage,
    AddressDetailPage,
    PaymentAddPage,
    PaymentDetailPage,
    ChatPage,
    ChooseLanguagePage,
    SubCategoryPage,
    ConversationPage,
    AcceptDetailPage,
    ReschedulePage,
    ReviewPage,
    QuoteDetailPage,
    AdminChatPage,
    CalanderPage,
    CancelPage,
    TermsConditionPage,
    ProductPage,
    ProductDetailPage,
    ProductListPage,
    CartPage,
    DiscountOffersPage,
    CheckoutPage,
    MyorderPage,
    OrderDetailPage,
    ConfirmJobdetailPage,
    RequestModelPage,
    ConfirmcheckoutPage,
    SuccessPage,
    ApplyCreditPointsPage,
    MainCatergoryPage,
    SubSearchPage,
    RequestProductPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    TabsPage,
    SearchPage,
    StartSplashPage,
    JobsPage,
    ProfilePage,
    SigninModalPage,
    FlashDealPage,
    RequestJobPage,
    PopularViewPage,
    SeasonalViewPage,
    AvailableViewPage,
    RescueStreakPage,
    LearnmoreModalPage,
    CreditPage,
    EditProfilePage,
    AddressAddPage,
    AddressDetailPage,
    PaymentAddPage,
    PaymentDetailPage,
    ChatPage,
    ChooseLanguagePage,
    SubCategoryPage,
    ConversationPage,
    AcceptDetailPage,
    ReschedulePage,
    ReviewPage,
    QuoteDetailPage,
    AdminChatPage,
    CalanderPage,
    CancelPage,
    TermsConditionPage,
    ProductPage,
    ProductDetailPage,
    ProductListPage,
    CartPage,
    DiscountOffersPage,
    CheckoutPage,
    MyorderPage,
    OrderDetailPage,
    ConfirmJobdetailPage,
    RequestModelPage,
    ConfirmcheckoutPage,
    SuccessPage,
    ApplyCreditPointsPage,
    MainCatergoryPage,
    SubSearchPage,
    RequestProductPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ConfigProvider,
    AlertProvider,
    ServiceProvider,
    userService,
    creditServiceProvider,
    notificationService,

    GooglePlus,
    OneSignal,
    Camera,
    FileTransfer,
    FileChooser,
    FilePath,
    IonicImageViewerModule,
    Stripe,
    SocialSharing,
    CallNumber,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserPointsProvider,
    userService,
    creditServiceProvider,
    notificationService,
    cartService,
  ],
})
export class AppModule {}
