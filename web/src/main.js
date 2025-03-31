function fetchData(queryWord) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.open(
      "GET",
      `http://localhost:3000/api/scrape?keyword=${queryWord}&nocache=${Math.random()}`,
      true
    );
    xhttp.onreadystatechange = function () {
      // Check if the request is done
      if (this.readyState == 4) {
        // Check if the request was successful
        if (this.status == 200) {
          // Parse the response and resolve the promise
          resolve(JSON.parse(this.responseText));
        } else {
          // Reject the promise with the error message
          reject(`Fetch error: ${this.statusText}`);
        }
      }
    };
    // Send the request
    xhttp.send();
  });
}

document.querySelector("#search-button").addEventListener("click", async () => {
  // Get the search query from the input field
  const searchQuery = document.getElementById("search")?.value;

  if (!searchQuery) {
    alert("Please enter a search query before continue!");
    return;
  }

  try {
    const result = await fetchData(searchQuery);
    console.log(result);
    let products = [];
    if (result) {
      products = result
        .map((product) => {
          return `
        <li>
          <div>
            <img src="${product.imageUrl}" alt="test image placeholder" />
          </div>
          <div class="product-info">
            <span class="title">${product.title}</span>
            <span class="rating">${product.rating}⭐</span>
            <span class="reviews">${product.reviews.split(" ")[5]} Reviews</span>
            <a class="buy-button" href=${
              product.itemUrl
            } rel="nofollow" target="_blank">Buy now</a>
          </div>
        </li>
    `;
        })
        .join("");
    }
    document.querySelector(".product-list").innerHTML = products;
  } catch (error) {
    console.error(error);
    alert(
      "An error occurred while fetching data from the server, please check the developer console for more details."
    );
  }
});

  document.querySelector(".product-list").addEventListener("click", (event) => {
    if (event.target.tagName === "IMG" && event.target.style.scale === "2") {
      event.target.style.scale = "1";
      event.target.style.cursor = "zoom-in";
      return;
    }
    if (event.target.tagName === "IMG") {
      event.target.style.borderRadius = "15px";
      event.target.style.scale = "2";
      event.target.style.cursor = "zoom-out";
    }
  });