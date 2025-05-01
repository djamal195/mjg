// Fleet Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const vehicleCards = document.querySelectorAll('.vehicle-card');
  const typeFilters = document.querySelectorAll('.filter-btn');
  const priceFilter = document.getElementById('price-range');
  const passengersFilter = document.getElementById('passengers');
  
  // Initialize current filters
  let currentFilters = {
    type: 'all',
    price: 'all',
    passengers: 'all'
  };
  
  // Apply all filters
  function applyFilters() {
    vehicleCards.forEach(card => {
      // Get card data attributes
      const cardType = card.dataset.category;
      const cardPrice = parseInt(card.dataset.price);
      const cardPassengers = parseInt(card.dataset.passengers);
      
      // Check if card matches all filters
      const matchesType = currentFilters.type === 'all' || cardType === currentFilters.type;
      const matchesPrice = currentFilters.price === 'all' || matchesPriceRange(cardPrice, currentFilters.price);
      const matchesPassengers = currentFilters.passengers === 'all' || matchesPassengersRange(cardPassengers, currentFilters.passengers);
      
      // Show or hide card based on filters
      if (matchesType && matchesPrice && matchesPassengers) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Check if price matches selected range
  function matchesPriceRange(price, range) {
    if (range === 'all') return true;
    
    const [min, max] = range.split('-');
    
    if (max === '+') {
      return price >= parseInt(min);
    } else {
      return price >= parseInt(min) && price <= parseInt(max);
    }
  }
  
  // Check if passengers matches selected range
  function matchesPassengersRange(passengers, range) {
    if (range === 'all') return true;
    
    const [min, max] = range.split('-');
    
    if (max === '+') {
      return passengers >= parseInt(min);
    } else {
      return passengers >= parseInt(min) && passengers <= parseInt(max);
    }
  }
  
  // Type filter event listeners
  typeFilters.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all type filters
      typeFilters.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked filter
      this.classList.add('active');
      
      // Update current type filter
      currentFilters.type = this.getAttribute('data-filter');
      
      // Apply all filters
      applyFilters();
    });
  });
  
  // Price filter event listener
  if (priceFilter) {
    priceFilter.addEventListener('change', function() {
      currentFilters.price = this.value;
      applyFilters();
    });
  }
  
  // Passengers filter event listener
  if (passengersFilter) {
    passengersFilter.addEventListener('change', function() {
      currentFilters.passengers = this.value;
      applyFilters();
    });
  }
  
  // Apply filters on page load
  applyFilters();
});