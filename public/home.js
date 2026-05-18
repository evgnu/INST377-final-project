async function carousel() {
    const carousel = document.getElementById("carousel");
        
    for (let i = 0; i < 10; i++) {
        const randomID = Math.floor(Math.random() * 385)
        const res = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${randomID}`);
        const data = await res.json();
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        const img = document.createElement("img");
        img.src = data.data.image;
        slide.appendChild(img);
        carousel.appendChild(slide);
    }
    new Swiper(".swiper", {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
            },
        pagination: {
            el: ".swiper-pagination",
            },
        });
}

window.onload = function() {
    carousel();
}