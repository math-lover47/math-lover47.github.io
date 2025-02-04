// Your original services array remains unchanged.
const services = [
  {
    title: "Post-operative rehabilitation",
    items: [
      {
        title: "orthopedics",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 5000,
      },
      {
        title: "neurology",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 7500,
      },
      {
        title: "cardiology",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
    ],
  },
  {
    title: "Chronic illness management programs rehabilitation",
    items: [
      {
        title: "diabetes mellitus",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 5000,
      },
      {
        title: "coronary heart disease",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 7500,
      },
      {
        title: "arterial hypertension",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "bronchial asthma",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 12500,
      },
      {
        title: "chronic obstructive pulmonary disease",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 15000,
      },
    ],
  },
  {
    title: "Sports injury recovery",
    items: [
      {
        title: "hockey",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 5000,
      },
      {
        title: "tennis",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 5000,
      },
      {
        title: "football",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 5000,
      },
    ],
  },
  {
    title: " Preventive health and wellness for kids",
    items: [
      {
        title: "providing a healthy diet",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 20000,
      },
      {
        title: "physical activity according to age and interests",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "good sleep",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "psychological well-being",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "hygiene",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "immunizations",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "regular visits to the pediatrician",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
      {
        title: "preventive medical examinations and health check-ups",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        price: 10000,
      },
    ],
  },
];

// Sort function remains the same.
function sortServicesAlphabetically(servicesArray) {
  // Sort main categories
  servicesArray.sort((a, b) => a.title.localeCompare(b.title));

  // Sort items within each category
  servicesArray.forEach((category) => {
    category.items.sort((a, b) => a.title.localeCompare(b.title));
  });

  return servicesArray;
}

// We keep the sorted services globally so we can search/filter them.
const sortedServices = sortServicesAlphabetically([...services]);

// This function renders the services inside the "services-container" div.
// It will be called both on initial load and when performing a search.
function renderServices(servicesToRender) {
  const container = document.getElementById("services-container");
  container.innerHTML = ""; // Clear previous content

  servicesToRender.forEach((category) => {
    // Create a button for the category title.
    const categoryBtn = document.createElement("button");
    categoryBtn.className = "collapsible fw-bold";
    categoryBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i> ${category.title}`;

    // Create a container (panel) for the category’s items.
    const categoryPanel = document.createElement("div");
    categoryPanel.className = "panel";

    // For every item in this category, create a collapsible item.
    category.items.forEach((item) => {
      const itemBtn = document.createElement("button");
      itemBtn.className = "collapsible fw-bold";
      itemBtn.innerHTML = `<i class="fa-solid fa-chevron-down"></i> ${item.title}`;

      const itemPanel = document.createElement("div");
      itemPanel.className = "panel";
      itemPanel.innerHTML = `
        <p style="display: none">${item.title}</p>
        <p>${item.description}</p>
        <button class="add-to-cart" data-price="${item.price}">
            Get for ${item.price} tenge
        </button>
      `;

      categoryPanel.appendChild(itemBtn);
      categoryPanel.appendChild(itemPanel);
    });

    container.appendChild(categoryBtn);
    container.appendChild(categoryPanel);
  });

  // After creating new elements, re-bind the collapsible and cart event listeners.
  addCollapsibleListeners();
  addCartListeners();
}

// This function binds the collapsible functionality to all elements with class "collapsible".
function addCollapsibleListeners() {
  document.querySelectorAll(".collapsible").forEach((button) => {
    // Remove any existing click handlers if necessary (optional cleanup)
    button.onclick = null;
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });
}

// This function binds the "add-to-cart" click events to all add buttons.
function addCartListeners() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    // Remove any previously attached event listeners by cloning (optional)
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.addEventListener("click", (event) => {
      const serviceButton = event.target;

      // If the button already has the remove-btn class, do nothing.
      if (serviceButton.classList.contains("remove-btn")) {
        return;
      }

      // Get the service name from the hidden paragraph.
      const serviceName = serviceButton.parentElement
        .querySelector("p")
        .textContent.trim();
      const servicePrice = serviceButton.getAttribute("data-price");

      if (typeof servicePrice == String) {
        servicePrice = Number(servicePrice);
      }

      // Create a new list item in the cart.
      const cartList = document.getElementById("cart-list");
      const listItem = document.createElement("li");
      const paragraph = listItem.appendChild(document.createElement("p"));
      paragraph.textContent = `${serviceName} - ${servicePrice} tenge`;
      paragraph.classList.add("paragraph");

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-btn");
      listItem.appendChild(removeButton);

      cartList.appendChild(listItem);

      // Update total price.
      let totalPrice = parseInt(
        document.getElementById("total-price").textContent
      );
      totalPrice += servicePrice;
      document.getElementById("total-price").textContent = totalPrice;

      // Change the service button to a remove button.
      serviceButton.textContent = "Remove";
      serviceButton.classList.add("remove-btn");

      // Add click listener to the service button (as a remove action).
      serviceButton.addEventListener("click", () => {
        if (cartList.contains(listItem)) {
          cartList.removeChild(listItem);
          totalPrice -= servicePrice;
          document.getElementById("total-price").textContent = totalPrice;
          serviceButton.textContent = `Get for ${servicePrice} tenge`;
          serviceButton.classList.remove("remove-btn");
        }
      });

      // Also bind the remove button in the cart.
      removeButton.addEventListener("click", () => {
        if (cartList.contains(listItem)) {
          cartList.removeChild(listItem);
          totalPrice -= servicePrice;
          document.getElementById("total-price").textContent = totalPrice;
          serviceButton.textContent = `Get for ${servicePrice} tenge`;
          serviceButton.classList.remove("remove-btn");
        }
      });
    });
  });
}

// This function filters the sortedServices based on the search query.
// It returns a new array of categories (with items filtered) that match the query.
function filterServices(query) {
  // Normalize the query for case-insensitive matching.
  const normalizedQuery = query.trim().toLowerCase();

  // If query is empty, return the full sortedServices.
  if (!normalizedQuery) {
    return sortedServices;
  }

  // Filter categories and items.
  const filtered = sortedServices
    .map((category) => {
      // Check if the category title itself matches.
      const categoryMatches = category.title
        .toLowerCase()
        .includes(normalizedQuery);
      // Filter items based on whether their title matches.
      const filteredItems = category.items.filter((item) =>
        item.title.toLowerCase().includes(normalizedQuery)
      );
      // If the category title matches, we show all items.
      if (categoryMatches) {
        return { ...category };
      }
      // Otherwise, only return the category if there are matching items.
      if (filteredItems.length > 0) {
        return {
          title: category.title,
          items: filteredItems,
        };
      }
      // If no match at all, return null.
      return null;
    })
    .filter((category) => category !== null);

  return filtered;
}

// When the DOM is loaded, render the full services list and bind events.
document.addEventListener("DOMContentLoaded", () => {
  renderServices(sortedServices);

  // Search functionality: when the "Search" button is clicked.
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector(".search-input");
  const noResultsDiv = document.querySelector(".no-results");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    const filteredServices = filterServices(query);
    renderServices(filteredServices);

    // Show or hide the "no-results" message.
    if (filteredServices.length === 0) {
      noResultsDiv.style.display = "block";
    } else {
      noResultsDiv.style.display = "none";
    }
  });

  // Optionally, you can also filter results as the user types:
  searchInput.addEventListener("keyup", () => {
    const query = searchInput.value;
    const filteredServices = filterServices(query);
    renderServices(filteredServices);
    if (filteredServices.length === 0) {
      noResultsDiv.style.display = "block";
    } else {
      noResultsDiv.style.display = "none";
    }
  });

  // "Buy Now" functionality remains unchanged.
  let totalPrice = 0;
  const cartList = document.getElementById("cart-list");
  const totalPriceElement = document.getElementById("total-price");

  document.getElementById("buy-now").addEventListener("click", () => {
    totalPrice = parseInt(totalPriceElement.textContent);
    if (totalPrice > 0) {
      const months = new Map([
        [1, "January"],
        [2, "February"],
        [3, "March"],
        [4, "April"],
        [5, "May"],
        [6, "June"],
        [7, "July"],
        [8, "August"],
        [9, "September"],
        [10, "October"],
        [11, "November"],
        [12, "December"],
      ]);
      const d = new Date();
      d.setFullYear(2026);
      id = Math.floor(Math.random() * 1000000 + 1);
      CounsultationIds.add(id);
      alert(
        `Thank you for your purchase! Total: ${totalPrice.toFixed(2)} tenge
         You buy it in ${d.getDate()} ${months.get(d.getMonth() + 1)}
         It's available until ${d.getFullYear()}
         Counsultation ID - ${id}`
      );
      cartList.innerHTML = "";
      totalPrice = 0;
      totalPriceElement.textContent = totalPrice;

      // Reset all service buttons back to "Get for ..." after purchase.
      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.textContent = `Get for ${button.getAttribute(
          "data-price"
        )} tenge`;
        button.classList.remove("remove-btn");
      });
    } else {
      alert("Your cart is empty!");
    }
  });
});

var CounsultationIds = new Set();
