
{  
  'use strict';
  
  const select = {
    templateOf: {
      books: '#template-book',
    },
  
    listOf: {
      booklist: '.books-list',
      filters: '.filters',
    },
  
    containerOf: {
      image: '.book__image',
    },
  
    imageParams: {
      id: '.book-id',
    },  
  };
      
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  class BooksList {
    constructor(){
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();

    }
  
    initData() {
      this.data = dataSource.books;
    }

    getElements(){
      const thisBooksList = this;
  
      thisBooksList.bookListContainer = document.querySelector(select.listOf.booklist);
      thisBooksList.imageListContainer = document.querySelector(select.listOf.booklist);
      thisBooksList.filtersContainer = document.querySelector(select.listOf.filters);
      thisBooksList.filters = [];
      thisBooksList.favoriteBooks = [];

    }

    /* write a function to render a booklist in HTML .books-list */
    render() {
      const thisBooksList = this;

      /* make a loop for each book from dataSource.books */
      for(const eachBook of thisBooksList.data){

        /* add const ratingBgc and rangeWidth */
        const ratingBgc =  thisBooksList.determineRatingBgc(eachBook.rating);
        eachBook.ratingBgc = ratingBgc;

        const ratingWidth = eachBook.rating * 10;
        eachBook.ratingWidth = ratingWidth;
          
        console.log('ratingWidth:', ratingWidth);
        /* generate HTML for each book based on template */
        const generatedHTML = templates.bookTemplate(eachBook);
        
        /* create element using utils.createElementFromHTML */
        const bookDOMElement = utils.createDOMFromHTML(generatedHTML);
        
        /* add DOM element to the booklist */
        thisBooksList.bookListContainer.appendChild(bookDOMElement);
      }
    }
    
    
    initActions() {
      const thisBooksList = this;
  
      /* make a const with reference to entire image list */
      // const imageContainer = document.querySelectorAll(select.containerOf.image);
  
      /* add event listener to the entire list of images */
      thisBooksList.imageListContainer.addEventListener('dblclick', function(event) {
        event.preventDefault();
  
        // if(!favoriteBooks.includes(bookID)){
           
        /* check if offset Parent of the image contains class .book_image) */
        if(event.target.offsetParent.classList.contains('book__image')) {
  
          /* find clickedElement */
          const clickedElement = event.target.offsetParent;
  
          /* find const with data-id of the image */
          const bookID = clickedElement.getAttribute('data-id');
  
          if(!thisBooksList.favoriteBooks.includes(bookID)) {
  
            /* add favorite to clickedelement */
            clickedElement.classList.add('favorite');
  
            /* push this book to the favorite books array */
            thisBooksList.favoriteBooks.push(bookID);
  
            /* if it's alreayd in the array */
          } else if(thisBooksList.favoriteBooks.includes(bookID)){
  
            /* remove class favorite */
            clickedElement.classList.remove('favorite');
  
            /* remove bookID from the array */
            const indexOfBookID = thisBooksList.favoriteBooks.indexOf(bookID);
            thisBooksList.favoriteBooks.splice(indexOfBookID, 1);
          }
        }
          
        console.log(thisBooksList.favoriteBooks);
      });
      // }
      /* END - list of favorite books */
  
      /* START - filtering */
  
      /* add event listener to filtersContainer */
      thisBooksList.filtersContainer.addEventListener('click', function(event) {
        // event.preventDefault();
  
        /* find const of clickedElement */
        const clickedElement = event.target;
  
        /* check if it's a checkbox that was clicked in the whole filters container - event.target */
        if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter') {
  
          //console.log(event.target.value);
          
          /* if checked - push it's value to array */
          if(clickedElement.checked) {
            thisBooksList.filters.push(clickedElement.value);
                
            /* if uncheckes - remove from array */
          } else /* if(!clickedElement.checked) */{
    
            /* remove bookID from the array */
            const indexOfFilterID = thisBooksList.filters.indexOf(clickedElement.value);
            thisBooksList.filters.splice(indexOfFilterID, 1);
          }
        }
        console.log(thisBooksList.filters);

        thisBooksList.filterBooks();
        console.log(thisBooksList.filterBooks);
      });
    }

    /* write function to see if the book should be hiddden or not */
    filterBooks() {
      const thisBooksList = this;

      /* for every book */
      for(const book of thisBooksList.data) {
        thisBooksList.bookImageID = document.querySelector(select.containerOf.image + '[data-id="' + book.id + '"]');
        let shouldBeHidden = false;

        /* for every book check if the filter fits the book - if not, it should be hidden */
        for(const filter of thisBooksList.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }

        /* if the filter fits the book - hide it, if not - make it visible */
     
        if(shouldBeHidden) {
          thisBooksList.bookImageID.classList.add('hidden');
        }else{
          thisBooksList.bookImageID.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
      const thisBooksList = this;
      console.log(thisBooksList);

      let background = '';

      /* prepare backgrounds for different ratings */
      if(rating < 6){
        background = 'linear-gradient(to bottom,  #fefcea 0%,#f1da36 100%)';
      } else if(rating > 6 && rating <= 7){
        background = 'linear-gradient(to bottom,  #d9ad7c 0%,#d9ad7c 100%)';
      }  else if(rating > 7 && rating <= 8){
        background = 'linear-gradient(to bottom,  #667292 0%,#667292 100%)';
      } else if(rating > 8 && rating <= 9){
        background = 'linear-gradient(to bottom, #299a0b 0%,#299a0b 100%)';
      } else if(rating > 9){
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
  }
  const app = {
    init: function () {
      new BooksList();
    },
  };

  app.init();
}

