// Global declaration of API KEY
const weatherAPIKey = "c47c2b78915a64773789f3c29e4305aa";
const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`;

//Gallery Images 
const galleryImages = [

    {
        src: "./assets/gallery/image1.jpg",
        alt: "Thumbnail Image 1"
    },

    {
        src: "./assets/gallery/image2.jpg",
        alt: "Thumbnail Image 2"
    },
    {
        src: "./assets/gallery/image3.jpg",
        alt: "Thumbnail Image 3"
    }

];

//Products Data
const products = [
    {
        title: "AstroFiction",
        author: "John Doe",
        price: 49.9,
        image: "./assets/products/img6.png"
    },
    {
        title: "Space Odissey",
        author: "Marie Anne",
        price: 35,
        image: "./assets/products/img1.png"
    },
    {
        title: "Doomed City",
        author: "Jason Cobert",
        price: 0,
        image: "./assets/products/img2.png"
    },
    {
        title: "Black Dog",
        author: "John Doe",
        price: 85.35,
        image: "./assets/products/img3.png"
    },
    {
        title: "My Little Robot",
        author: "Pedro Paulo",
        price: 0,
        image: "./assets/products/img5.png"
    },
    {
        title: "Garden Girl",
        author: "Ankit Patel",
        price: 45,
        image: "./assets/products/img4.png"
    }
];

// Menu Section
function menuHandler() {
    document.querySelector("#open-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

    document.querySelector("#close-nav-menu").addEventListener("click", function () {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//Temperature Conversion Function
function celsiusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}

// Greeting Section
function greetingHandler() {
    let currentHour = new Date().getHours();
    let greetingText;
    if (currentHour < 12) {
        greetingText = "Good Morning!";
    }
    else if (currentHour < 19) {
        greetingText = "Good Afternoon!";
    }
    else if (currentHour < 24) {
        greetingText = "Good evening!";
    }
    else {
        greetingText = "Welcome!";
    }

    document.querySelector("#greeting").innerHTML = greetingText;

}

// Weather Section
function weatherHandler() {
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIUrl
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let condition = data.weather[0].description;
                let location = data.name;
                let temperature = data.main.temp;
                //console.log(data);

                let fahrWeatherText = `The Weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature.toFixed(1))}°F outside.`;
                let celsiusWeatherText = `The Weather is ${condition} in ${location} and it's ${temperature}°C outside.`;

                document.querySelector("p#weather").innerHTML = celsiusWeatherText;

                document.querySelector(".weather-group").addEventListener("click", function (e) {
                    if (e.target.id == "celsius") {
                        document.querySelector("p#weather").innerHTML = celsiusWeatherText;
                        console.log("Clicked the celsius button");
                    }
                    else if (e.target.id == "fahr") {
                        document.querySelector("p#weather").innerHTML = fahrWeatherText;
                        console.log("Clicked the fahrenheit button");
                    }
                });

            }).catch(err => {
                document.querySelector("p#weather").innerHTML = "Unable to get the weather!";
            });
    });
}

// Local Time Section
function clockHandler() {
    setInterval(function () {
        let localTime = new Date();
        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");;
    }, 1000);
}

//Gallery Section
function galleryHandler() {
    let mainImage = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    mainImage.src = galleryImages[0].src;
    mainImage.alt = galleryImages[0].alt;


    galleryImages.forEach(function (image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        thumb.addEventListener("click", function (e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImage = galleryImages[selectedIndex];
            mainImage.src = selectedImage.src;
            mainImage.alt = selectedImage.alt;

            thumbnails.querySelectorAll("img").forEach(function (img) {
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });
        thumbnails.appendChild(thumb);
    });
}

//Product Section
function populateProducts(productList) {
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";

    // Run a loop thought the product and create am HTML element ("product-item") for each of them
    productList.forEach(function (product, index) {

        // Create the HTML element for the individual product
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");

        // Create the product Image
        let productImage = document.createElement("img");
        productImage.src = product.image;
        productImage.alt = "Image for" + product.title;

        // Create a product details section
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //Create product title,author,price-title and price
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        let priceTitle = document.createElement("p");
        priceTitle.classList.add("price-title");
        priceTitle.textContent = "Price";

        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";

        // Append the product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(priceTitle);
        productDetails.append(productPrice);

        // Add all child HTML elements of the product
        productElm.append(productImage);
        productElm.append(productDetails);

        // Add complete individual product to the product section
        productSection.append(productElm);

    });
}

function productHandler() {

    let freeProducts = products.filter(item => !item.price || item.price <= 0);

    let paidProducts = products.filter(item => item.price > 0);


    populateProducts(products);

    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productFilter = document.querySelector(".products-filter");

    productFilter.addEventListener("click", function (e) {
        if (e.target.id === "all") {
            populateProducts(products);
        }
        else if (e.target.id === "paid") {
            populateProducts(paidProducts);
        }
        else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });
}

//Footer Section
function footerHandler() {
    //ⓒ 2024 - All rights reserved
    // let currentYear = new Date().getFullYear;
    document.querySelector("footer").textContent = `ⓒ 2024 - All rights reserved`;
}

//Page Load
menuHandler();
greetingHandler();
weatherHandler();
clockHandler();
galleryHandler();
productHandler();
footerHandler();
