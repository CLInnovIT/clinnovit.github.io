/**
 * Horizon Stacked Slides - A lightweight and customizable slideshow setup function.
 * Developer: Ritu Lahkar
 * Version: 1.0.0
 * License: MIT
 * /
 




 
/**
 * Example Usage:
 * 
 * <!DOCTYPE html>
 * <html lang="en">
 * <head>
 *     <meta charset="UTF-8">
 *     <meta name="viewport" content="width=device-width, initial-scale=1.0">
 *     <title>Document</title>
 *     <link rel="stylesheet" href="style.css">
 * </head>
 * <body>
 *     <div class="container" id="container1">
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *         <span class="slide"></span>
 *     </div>
 *     <script src="HorizonStackedSlides.js"></script>
 *     <script>
 *         setupSlideshow({
 *             defaultSize: { x: 600, y: 200 },
 *             containerID: 'container1',
 *             slideClass: 'slide',
 *             activeSlideClass: 'activeslide',
 *             defaultActiveSlide: 2,
 *             defaultPortion: 0.1,
 *             focusScale: 1.2,
 *             containerWidth: 1000, // Container Width in pixels
 *             containerHeight: 400, // Container Height in pixels
 *         });
 *     </script>
 * </body>
 * </html>
 */






/* Example CSS Styles */
/*style.css*/
/**
 * General styles for the container and slides.
 */
/*
.container {
    display: flex;
    align-items: center;
    height: 300px;
    background-color: blueviolet;
}

.slide {
    width: 300px;
    height: 200px;
    border: 2px solid;
    border-radius: 3%;
    background-color: blueviolet;
    position: absolute;
    transition: transform 0.3s ease-in-out;
}
*/

/**
 * Styles for the active slide.
 */
/*
.activeslide {
    // Add any active slide styles here
}
*/

/**
 * Individual slide styles.
 */
/*
.slide1 {
    background-color: rgb(7, 29, 29);
}

.slide2 {
    background-color: blanchedalmond;
}

.slide3 {
    background-color: brown;
}
*/





// Example usage:
// setupSlideshow({
//     defaultSize: { x: 600, y: 200 },
//     containerID: 'container1',
//     slideClass: 'slide',
//     activeSlideClass: 'activeslide',
//     defaultActiveSlide: 2,
//     defaultPortion: 0.1,
//     focusScale: 1.2
// });




 /**
 * Sets up a slideshow based on the given configuration.
 * @param {Object} config - Configuration object for the slideshow.
 * @param {Object} config.defaultSize - Default size of the slides.
 * @param {number} config.defaultSize.x - The default width of the slides in pixels.
 * @param {number} config.defaultSize.y - The default height of the slides in pixels.
 * @param {string} config.containerID - ID of the container element for the slideshow.
 * @param {number} config.containerWidth - Width of the container element for the slideshow in pixels.
 * @param {number} config.containerHeight - Height of the container element for the slideshow in pixels.
 * @param {string} config.slideClass - CSS class name used to select slides.
 * @param {string} config.activeSlideClass - CSS class name used to mark the active slide.
 * @param {number} config.defaultActiveSlide - Index of the default active slide (1-based).
 * @param {number} config.defaultPortion - Default portion value used for resizing slides.
 * @param {number} config.focusScale - Scale factor for the focused slide.
 */
function setupSlideshow(config) {
    // Extracting configuration options
    const defaultSize = config.defaultSize;
    const containerID = config.containerID;
    const slideClass = config.slideClass;
    const activeSlideClass = config.activeSlideClass;
    const defaultActiveSlide = config.defaultActiveSlide;
    const defaultPortion = config.defaultPortion;
    const focusScale = config.focusScale;
    const containerWidth = config.containerWidth;
    const containerHeight = config.containerHeight;

    /**
     * Returns an object containing 'x' values of the given object properties.
     * @param {Object} obj - The object to extract 'x' values from.
     * @returns {Object} - An object with the 'x' values of the properties.
     */
    function getXValues(obj) {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && obj[key].hasOwnProperty('x')) {
                result[key] = obj[key].x;
            }
        }
        return result;
    }

    /**
     * Gets the slide positions for the slideshow.
     * @param {number} n - The total number of slides.
     * @param {number} fsn - The index of the currently focused slide (1-based).
     * @param {Object} xy - The coordinates of the center of the container element.
     * @param {Function} fnpr - Function to get slide portions.
     * @param {Function} fnssz - Function to get slide sizes.
     * @returns {Object} - An object containing the x positions of the slides.
     */
    function getslidepostions(n, fsn, xy, fnpr = getslideportions, fnssz = getslidesizes) {
        const sxps = {};
        let rfnsw = getXValues(fnssz(fsn, n));
        let rfnpr = fnpr(fsn, n);
        sxps[fsn] = xy.x;
        for (let i = fsn - 1; i > 0; i--) {
            let rsw = rfnsw[i + 1];
            let csw = rfnsw[i];
            let cspr = rfnpr[i];
            sxps[i] = sxps[i + 1] - rsw / 2 + csw / 2 - cspr * csw;
        }
        for (let i = fsn + 1; i <= n; i++) {
            let lsw = rfnsw[i - 1];
            let csw = rfnsw[i];
            let cspr = rfnpr[i];
            sxps[i] = sxps[i - 1] + lsw / 2 - csw / 2 + cspr * csw;
        }
        return sxps;
    }

    /**
     * Gets the z-indices for the slides.
     * @param {number} fsn - The index of the currently focused slide (1-based).
     * @param {number} n - The total number of slides.
     * @param {number} hz - The initial z-index value.
     * @param {number} stepz - The step size for z-index values.
     * @returns {Object} - An object containing the z-indices of the slides.
     */
    function getzindices(fsn, n, hz = 2 * n, stepz = 1) {
        const zis = {};
        zis[fsn] = hz;
        for (let i = fsn - 1; i > 0; i--) {
            zis[i] = zis[i + 1] - stepz;
        }
        for (let i = fsn + 1; i <= n; i++) {
            zis[i] = zis[i - 1] - stepz;
        }
        return zis;
    }

    /**
     * Gets the slide portions for the slideshow.
     * @param {number} fsn - The index of the currently focused slide (1-based).
     * @param {number} n - The total number of slides.
     * @returns {Object} - An object containing the portions of the slides.
     */
    function getslideportions(fsn, n) {
        const prs = {};
        prs[fsn] = 1;
        for (let i = fsn - 1; i > 0; i--) {
            prs[i] = defaultPortion;
        }
        for (let i = fsn + 1; i <= n; i++) {
            prs[i] = defaultPortion;
        }
        return prs;
    }

    /**
     * Gets the slide sizes for the slideshow.
     * @param {number} fsn - The index of the currently focused slide (1-based).
     * @param {number} n - The total number of slides.
     * @returns {Object} - An object containing the sizes of the slides.
     */
    function getslidesizes(fsn, n) {
        const szs = {};
        let scale = focusScale;
        let nsw = defaultSize.x;
        let nsh = defaultSize.y;
        szs[fsn] = { x: nsw * scale, y: nsh * scale };
        for (let i = fsn - 1; i > 0; i--) {
            szs[i] = { x: nsw, y: nsh };
        }
        for (let i = fsn + 1; i <= n; i++) {
            szs[i] = { x: nsw, y: nsh };
        }
        return szs;
    }

    /**
     * Resizes a slide to the given size.
     * @param {number} sn - The slide number (1-based).
     * @param {Object} sz - The new size of the slide.
     */
    function resizeslide(sn, sz) {
        const slide = getElementBySlideNumber(sn);
        slide.style.width = sz.x + 'px';
        slide.style.height = sz.y + 'px';
    }

    /**
     * Relocates a slide to the given position.
     * @param {number} sn - The slide number (1-based).
     * @param {Object} ps - The new position of the slide.
     */
    function relocateslide(sn, ps) {
        const slide = getElementBySlideNumber(sn);
        relocateCenterToGivenLocation(slide, ps.x, ps.y);
    }

    /**
     * Relocates all slides to the given positions.
     * @param {number} n - The total number of slides.
     * @param {Object} pxs - The x-positions of the slides.
     * @param {number} py - The y-position of all slides.
     */
    function relocateslides(n, pxs, py) {
        for (let i = 1; i <= n; i++) {
            relocateslide(i, { x: pxs[i], y: py });
        }
    }

    /**
     * Sets the z-index of a slide.
     * @param {number} sn - The slide number (1-based).
     * @param {number} z - The new z-index value.
     */
    function setslidez(sn, z) {
        getElementBySlideNumber(sn).style.zIndex = z;
    }

    /**
     * Rearranges all slides with new sizes, positions, and z-indices.
     * @param {number} n - The total number of slides.
     * @param {Object} sxps - The x-positions of the slides.
     * @param {number} syp - The y-position of all slides.
     * @param {Object} zis - The z-indices of the slides.
     * @param {Object} szs - The sizes of the slides.
     */
    function rearrangeslides(n, sxps, syp, zis, szs) {
        for (let i = 1; i <= n; i++) {
            resizeslide(i, szs[i]);
            relocateslide(i, { x: sxps[i], y: syp });
            setslidez(i, zis[i]);
        }
    }

    /**
     * Focuses on a specific slide in the slideshow.
     * @param {number} fsn - The index of the currently focused slide (1-based).
     * @param {Object} xy - The coordinates of the center of the container element.
     * @param {number} n - The total number of slides.
     */
    function focusslide(fsn, xy = getCenterLocation(document.getElementById(containerID)), n = document.querySelectorAll('.' + slideClass).length) {
        const isHighlighted = getElementBySlideNumber(fsn).classList.contains(activeSlideClass);

        if (!isHighlighted) {
            const activeSlide = document.querySelector('.' + activeSlideClass);
            if (activeSlide) {
                activeSlide.classList.remove(activeSlideClass);
            }
            let sxps = getslidepostions(n, fsn, xy);
            let zis = getzindices(fsn, n);
            let szs = getslidesizes(fsn, n);
            rearrangeslides(n, sxps, xy.y, zis, szs);
            relocateslides(n, sxps, xy.y);
            getElementBySlideNumber(fsn).classList.add(activeSlideClass);
        }
    }

    /**
     * Gets the center location of an element.
     * @param {HTMLElement} element - The element to get the center location of.
     * @returns {Object} - The x and y coordinates of the center of the element.
     */
    function getCenterLocation(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return { x: centerX, y: centerY };
    }

    /**
     * Relocates an element's center to the given location.
     * @param {HTMLElement} element - The element to relocate.
     * @param {number} targetX - The target x-coordinate of the center.
     * @param {number} targetY - The target y-coordinate of the center.
     * @param {number} duration - The duration of the relocation animation in milliseconds.
     */
    function relocateCenterToGivenLocation(element, targetX, targetY, duration = 1000) {
        const centerLocation = getCenterLocation(element);
        const offsetX = targetX - centerLocation.x;
        const offsetY = targetY - centerLocation.y;

        const computedStyle = getComputedStyle(element);
        const transformMatrix = new DOMMatrix(computedStyle.transform);

        // Get the current translations
        const currentTranslateX = transformMatrix.e;
        const currentTranslateY = transformMatrix.f;

        // Reset previous translations
        transformMatrix.e = 0;
        transformMatrix.f = 0;

        // Apply the new translation
        transformMatrix.e = currentTranslateX + offsetX;
        transformMatrix.f = currentTranslateY + offsetY;

        // Apply the new transform with smooth transition to the element
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = transformMatrix.toString();
        setTimeout(() => {
            element.style.transition = '';
        }, duration);
    }

    /**
     * Gets the slide number from the given slide element.
     * @param {HTMLElement} slideElement - The slide element.
     * @returns {number|null} - The slide number (1-based), or null if not found.
     */
    function getSlideNumberFromElement(slideElement) {
        // Check if the given element is the slide itself
        if (slideElement.classList.contains(slideClass)) {
            const slideId = slideElement.id;
            const slideNumberMatch = slideId.match(/\d+$/);
            if (slideNumberMatch) {
                return parseInt(slideNumberMatch[0], 10);
            }
        } else {
            // Get the parent element and call the function recursively
            const parentElement = slideElement.parentElement;
            if (parentElement) {
                return getSlideNumberFromElement(parentElement);
            }
        }
    
        return null;
    }

    /**
     * Generates an ID from the slide number.
     * @param {number} number - The slide number (1-based).
     * @returns {string} - The generated ID.
     */
    function generateIDFromNumber(number) {
        const prefix = slideClass; // You can customize the prefix as per your requirement
        return prefix + number;
    }

    /**
     * Gets the element by slide number.
     * @param {number} slideNumber - The slide number (1-based).
     * @returns {HTMLElement|null} - The slide element, or null if not found.
     */
    function getElementBySlideNumber(slideNumber) {
        const slideID = generateIDFromNumber(slideNumber);
        return document.getElementById(slideID);
    }

    /**
    * Initializes the slides by adding classes, IDs, and applying styles to each slide.
    * @param {string} className - The class name used to select slides.
    * @param {Object} config - Configuration object for the slideshow.
    * @param {Object} config.defaultSize - Default size of the slides.
    * @param {number} config.defaultSize.x - The default width of the slides in pixels.
     * @param {number} config.defaultSize.y - The default height of the slides in pixels.
    * @param {number} config.containerWidth - Width of the container element in pixels.
    * @param {number} config.containerHeight - Height of the container element in pixels.
    */
    function initializeSlides(className, config) {
        const slides = document.querySelectorAll('.' + className);

        // Extracting container width and height from the configuration
        const containerWidth = config.containerWidth;
        const containerHeight = config.containerHeight;

        // Check if container width and height are provided
        if (!containerWidth || !containerHeight) {
            console.error('Container width and height must be provided.');
            return;
        }

        // Create the container element and apply styles
        const container = document.createElement('div');
        container.style.width = containerWidth + 'px';
        container.style.height = containerHeight + 'px';
        container.style.position = 'relative';
        container.style.overflow = 'hidden';

        // Loop through each slide and apply styles
        slides.forEach((slide, index) => {
            const slideNumber = index + 1;
            slide.classList.add(className + slideNumber);
            slide.id = className + slideNumber;

            // Apply default size and other common styles to each slide
            slide.style.width = config.defaultSize.x + 'px';
            slide.style.height = config.defaultSize.y + 'px';
            slide.style.border = '2px solid';
            slide.style.borderRadius = '3%';
            slide.style.position = 'absolute';
            slide.style.transition = 'transform 0.3s ease-in-out';

            // Individual slide styles
            // You can customize the colors or add more colors to this array as per your requirement
            // const slideStyles = ['aqua', 'blanchedalmond', 'brown'];
            // const backgroundColor = slideStyles[index % slideStyles.length];
            // slide.style.backgroundColor = backgroundColor;
        });

        // Get the container element using the provided ID
        const containerID = config.containerID;
        const containerElement = document.getElementById(containerID);

        // Check if the container element with the specified ID is found
        if (!containerElement) {
            console.error('Container element with the specified ID not found.');
            return;
        }

        // Append the container to the container element and then add slides to the container
        containerElement.appendChild(container);
        container.append(...slides);
    }



    // Initialization code
    document.addEventListener('DOMContentLoaded', () => {
        initializeSlides(config.slideClass, config);

        // Attach click event listeners to the slides
        document.querySelectorAll('.' + config.slideClass).forEach(element => {
            element.addEventListener('click', (e) => {
                let xy = getCenterLocation(document.getElementById(config.containerID));
                focusslide(getSlideNumberFromElement(e.target), xy);
            });
        });

        // Triggering the default active slide
        let defaultSlide = getElementBySlideNumber(config.defaultActiveSlide);
        if (defaultSlide) {
            defaultSlide.click();
        }
    });
}





