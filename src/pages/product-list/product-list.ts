import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { AlertProvider } from '../../providers/alert/alert';
import { ServiceProvider } from '../../providers/service/service';
import { ConfigProvider } from '../../providers/config/config';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  tabBarElement: any;
  CatogoryId: any;
  ProductList: any;
  items: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alert: AlertProvider,
    private service: ServiceProvider,
    public config: ConfigProvider
  ) {
    if (document.querySelector('.tabbar')) { this.tabBarElement = document.querySelector('.tabbar.show-tabbar'); }
  }
  ionViewWillEnter() {
    if (this.tabBarElement) { this.tabBarElement.style.display = 'none'; }
  }
  ionViewWillLeave() {
    if (this.tabBarElement) { this.tabBarElement.style.display = 'flex'; }
  }

  ionViewDidLoad() {
    console.log('Product-List Page');
    var Catodata = this.navParams.get("CatId")
    console.log(Catodata)
    this.CatogoryId = Catodata.id
    this.ProductGet()
  }

  ProductGet() {
    this.alert.showLoader("")
    var params = {
      cat_id: this.CatogoryId
    }
    console.log(params)
    this.service.GetProduct(params)
      .then((results) => this.HandleProduct(results))
  }

  HandleProduct(results) {
    this.alert.dissmissLoader()
    console.log(results)
    if (results.ResponseCode == 1) {
      this.ProductList = results.data
      this.items = results.data
    } else {
      this.alert.showAlert("Error", results.ResponseMsg)
    }
  }

  ProductDetail(id) {
    var scg = this.items[id]
    this.navCtrl.push(ProductDetailPage, { "Product": scg })
  }

  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val)
    console.log(this.ProductList)
    if (val && val.trim() != '') {
      this.items = this.items.filter((name) => {
        console.log(name)
        return (name.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.items = this.ProductList
    }
  }

  Cart(){
    this.navCtrl.push(CartPage)
  }


}