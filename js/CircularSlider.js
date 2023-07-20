function setupCircularSlider(containerClass, contentClass, radius, centerPoint, duration = 200) {
  const container = document.querySelector(`.${containerClass}`);
  const divs = container.querySelectorAll(`.${contentClass}`);
  const numDivs = divs.length;

  function getCenterLocation(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { x: centerX, y: centerY };
  }

  function relocateCenterToGivenLocation(element, targetPoint) {
    const centerLocation = getCenterLocation(element);
    const offsetX = targetPoint.x - centerLocation.x;
    const offsetY = targetPoint.y - centerLocation.y;

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

  function getPointsInCircle(radius, centerPoint, n) {
    const points = [];

    const angleIncrement = (2 * Math.PI) / n;
    for (let i = 0; i < n; i++) {
      const angle = i * angleIncrement;
      const x = centerPoint.x + radius * Math.cos(angle);
      const y = centerPoint.y + radius * Math.sin(angle);
      points.push({ x, y });
    }

    return points;
  }

  function arrangeDivsInPoints(points) {
    divs.forEach((div, i) => {
      const point = points[i];
      relocateCenterToGivenLocation(div, point);
    });
  }

  function selectElementsAtIntervals(list, interval, startIndex = 0, n = list.length) {
    const selectedElements = [];
    const modulo = (n, m) => ((n % m) + m) % m;

    let currentIndex = modulo(startIndex, list.length);
    for (let i = 0; i < n; i++) {
      const element = list[currentIndex];
      selectedElements.push(element);

      currentIndex = modulo(currentIndex + interval, list.length);
    }

    return selectedElements;
  }

  function rotateByDSteps(interval, currentIndex, n, direction = 1) {
    let counter = 0;
    function rotate() {
      if (counter < n && counter > n * -1) {
        const currentIndexWithOffset = currentIndex + counter;
        const ps = selectElementsAtIntervals(points, interval, currentIndexWithOffset);
        arrangeDivsInPoints(ps);
        counter += direction;
        setTimeout(rotate, duration / 2);
      }
    }
    rotate();
  }

  function autoRotate(interval, currentIndex, direction = 1, timeInterval = 1000) {
    let slideIndex = currentIndex;
    function hf() {
      rotateByDSteps(interval, slideIndex, interval, direction);
      slideIndex += interval * direction;
      setTimeout(hf, timeInterval);
    }

    hf();
  }

  const points = getPointsInCircle(radius, centerPoint, numDivs);
  arrangeDivsInPoints(points);

  return {
    rotateByDSteps,
    autoRotate,
  };
}

// Usage example
// const circularSlider = setupCircularSlider('ccontainer', 'cslide', 100, { x: 300, y: 300 }, 200);
// circularSlider.autoRotate(3, 0, 1, 1000);
