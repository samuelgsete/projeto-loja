import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public year = new Date().getFullYear();
  public icons = [
    { name: 'fab fa-facebook', link: 'https://www.facebook.com/samuel.souza.946517'},
    { name: 'fab fa-instagram', link: 'https://www.instagram.com/samukasouzaddg/?hl=pt-br'},
    { name: 'fab fa-youtube', link: 'https://www.youtube.com/channel/UCFn1GkGhJouxqcEdGfGXoKw'},
    { name: 'fab fa-linkedin', link: 'https://www.linkedin.com/in/samuel-souza-551a34196/'},
    { name: 'fab fa-github', link: 'https://github.com/samuelgsete'}
  ];

  public constructor() { }

  ngOnInit(): void {
  }

}