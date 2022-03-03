import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { Flobro } from '../../../src'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  public flobro?: Flobro

  @ViewChild('container') container!: ElementRef

  public ngAfterViewInit(): void {
    this.flobro = new Flobro(this.container.nativeElement)
  }
}
