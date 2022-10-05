import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/core/models/product.model";
import { ProductService} from "src/app/core/services/product.service";

@Component ({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    product?: Product[];

    constructor(private ProductService: ProductService) {}
    ngOnInit(): void {
        this.AllProducts();
        //this.OneCategory();
    }

    AllProducts() {
        this.ProductService.getAll().subscribe((data) => {
            console.log(data);
        })
    }
}