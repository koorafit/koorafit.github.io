class Carousel {
    constructor(container, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [];
        this.currentIndex = 0;

        this.initGalleryItems();
        this.updateGallery();
        this.setControls();
        this.useControls();
        this.addSwipeGestures();
    }

   // ...assets/js/mine/carousel.js






initGalleryItems() {
    this.carouselArray = [
        {
            href: 'images/Gallery/boss.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/boss.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/certificate.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/certificate.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/kidstogether.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/kidstogether.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/champ.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/champ.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/champ2.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/champ2.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/champ3.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/champ3.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/friend.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/friend.jpeg',
            alt: ''
        },
        {
            href: 'images/Gallery/group.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/group.jpeg',
            alt: ''
        },
       
        {
            href: 'images/Gallery/master.jpeg',
            title: 'Click the right half of the image to move forward.',
            src: 'images/Gallery/master.jpeg',
            alt: ''
        },
        // {
            
        //     href: 'images/Gallery/thai.jpeg',
        //     title: 'Click the right half of the image to move forward.',
        //     src: 'images/Gallery/thai.jpeg',
        //     alt: ''
        // },
        // {
        //     href: 'images/Gallery/thaitrip.jpeg',
        //     title: 'Click the right half of the image to move forward.',
        //     src: 'images/Gallery/thaitrip.jpeg',
        //     alt: ''
        // },
        // {
        //     href: 'images/Gallery/thaitrip2.jpeg',
        //     title: 'Click the right half of the image to move forward.',
        //     src: 'images/Gallery/thaitrip2.jpeg',
        //     alt: ''
        // },
        
       
     

        // Add more items as needed in the same format
    ];
}

updateGallery() {
    this.carouselContainer.innerHTML = '';
    const itemIndex = this.currentIndex % this.carouselArray.length;

    for (let i = 0; i < this.carouselArray.length; i++) {
        const item = this.carouselArray[(itemIndex + i) % this.carouselArray.length];

        const colDiv = document.createElement('div');
        colDiv.className = `col-4 col-6-xsmall gallery-item gallery-item-${i + 1}`;
        colDiv.style.textAlign = 'center';

        const anchor = document.createElement('a');
        anchor.className = 'image fit';
        anchor.href = item.href;
        anchor.setAttribute('data-lightbox', 'image-group');
        anchor.setAttribute('data-title', item.title);

        const img = document.createElement('img');
        img.className = 'example-image';
        img.src = item.src;
        img.alt = item.alt;

        anchor.appendChild(img);
        colDiv.appendChild(anchor);

        this.carouselContainer.appendChild(colDiv);
    }
}

// ...

    setCurrentState(direction) {
        if (direction === 'previous') {
            this.currentIndex = (this.currentIndex - 1 + this.carouselArray.length) % this.carouselArray.length;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
        }
        this.updateGallery();
    }
    setControls() {
        const galleryControlsContainer = document.getElementById('gallery-controls');
        
        // Create a container div
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <ul class="actions">
            <li><a class="button primary">Previous</a></li>
            <li><a  class="button">Next</a></li>
        </ul>
        `;

     
        
        galleryControlsContainer.appendChild(buttonContainer);
    }

    useControls() {
        const galleryControlsContainer = document.getElementById('gallery-controls');
        const previousButton = galleryControlsContainer.querySelector('.button.primary');
        const nextButton = galleryControlsContainer.querySelector('.button:not(.primary)');
    
        previousButton.addEventListener('click', () => {
            this.setCurrentState('previous');
        });
    
        nextButton.addEventListener('click', () => {
            this.setCurrentState('next');
        });
    }

    addSwipeGestures() {
        $(this.carouselContainer).swipe({
            swipe: (event, direction, distance, duration, fingerCount) => {
                if (direction === 'left') {
                    this.setCurrentState('next');
                } else if (direction === 'right') {
                    this.setCurrentState('previous');
                }
            }
        });
    }
}

const galleryContainer = document.getElementById('gallery-container');
const galleryControls = ['previous', 'next'];
const exampleCarousel = new Carousel(galleryContainer, galleryControls);