var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 20 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};

window.addEventListener('scroll', function (event) {
    document.querySelectorAll('.skills-item').forEach(element => {
        if(isInViewport(element)){
            element.classList.add('animate-enter')
        }
        else{
            element.classList.remove('animate-enter');
        }
    });

}, false);