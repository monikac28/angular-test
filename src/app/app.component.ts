import { Component } from '@angular/core';

import { BlogsService } from './blogs.service';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** variable for facebook icon */
  public fB = faFacebook;
  /** variable for Twitter icon */
  public fT = faTwitter;
  /** variable for instagram icon */
  public fI = faInstagram;
  title = 'task';
  /** variable use for wrapper in listing  */
  public isListing: boolean;
  /** variable for currently selected blog for detail info icon */
  public currentBlog: any;
  /** variable for currently selected page */
  public currentPage: any;
  /** variable to store response from listing api */
  public blogList: Array<any>;
  /** variable to show data for currently selected page */
  public paginationArray: Array<any>
  /** variable to show how many items needs to show per page */
  public itemsPerPg: any;
  /** variable for starting position of item */
  public startPos;
  /** variable for ending position of item */
  public endPos;
  constructor(private serve: BlogsService) {

    this.blogList = [];
    this.isListing = true;
    this.currentPage = 1;
    this.paginationArray = [];
    this.itemsPerPg = 5;
    this.startPos = 0;
  }
  ngOnInit() {
    this.showBlogs();
  }

/** listing API integration*/
  showBlogs() {
    this.serve.getBlogList().subscribe(res => {
      if (res.success) {
        this.blogList = res.blogs
        this.getCustmBlogs();
        console.log(this.blogList, "bbbb")
      }
      else {
        alert('something went wrong')
      }
    }, (err) => {
      console.log(err);
    })
  }

/** for additional blogs*/
  getCustmBlogs() {
    this.serve.getCustomBlog().subscribe((res: any) => {
      this.blogList = [...this.blogList, ...res];
      // this.blogList = this.blogList.concat(res)
      this.clientSidePagination();
      console.log(this.blogList, "customblog")
    })
  }

/** for details of selected blog */
  getDetails(data) {
    this.isListing = false;
    this.currentBlog = data
  }

/** to redirect to url after clicking on button in ad section */
  onAdClick(url) {
    window.open(url)
  }

  /** to go back to listing page from detail page */
  goToListing() {
    this.isListing = true;
  }

  /** after changing a page */
  pageChanged(evt) {
    this.paginationArray = [];
    console.log(evt, "eventPage")
    this.currentPage = evt.page;
    this.clientSidePagination();
  }

  /** for pagination */
  clientSidePagination() {
    this.startPos = ((this.currentPage - 1) * this.itemsPerPg);
    this.endPos = this.currentPage * this.itemsPerPg;
    this.paginationArray = this.blogList.slice(this.startPos, this.endPos)
  }



}

