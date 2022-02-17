import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { FloBro } from 'flobro'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public flobro?: FloBro

  @ViewChild('container') container!: ElementRef

  public ngAfterViewInit(): void {
    this.flobro = new FloBro(this.container.nativeElement)
  }
}
