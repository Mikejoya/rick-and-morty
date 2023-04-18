const isIntersecting = (entries) => {
    return entries.isIntersecting;
}

function actionWhenObserved(entry) {
    const container = entry.target;
    console.log('observando1');
    const image = container.querySelector('img');
    const url = image.dataset.url;
    image.setAttribute('src', url);
    
    observer.unobserve(container);
}

const observer = new IntersectionObserver((entries)=> {
    entries.filter(isIntersecting).forEach(actionWhenObserved);
});

export function loadingImage(image) {
    observer.observe(image)
}
