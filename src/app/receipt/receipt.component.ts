import { Component, OnInit } from '@angular/core';
import { ReceiptService } from './receipt.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {
  receiptData: any;

  constructor(private receiptService: ReceiptService) { }

  ngOnInit() {
    this.getReceiptData();
  }

  getReceiptData() {
    this.receiptService.getReceipt().subscribe(
      (data: any) => {
        this.receiptData = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
