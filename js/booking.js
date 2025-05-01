// Booking Form JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");
  const pickupDate = document.getElementById("pickup-date");
  const returnDate = document.getElementById("return-date");
  
  if (!bookingForm || !pickupDate || !returnDate) return;
  
  // Fonctions existantes pour les dates
  function setMinDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formattedToday = formatDate(today);
    const formattedTomorrow = formatDate(tomorrow);
    
    pickupDate.min = formattedToday;
    returnDate.min = formattedTomorrow;
    
    if (!pickupDate.value) {
      pickupDate.value = formattedToday;
    }
    
    if (!returnDate.value) {
      returnDate.value = formattedTomorrow;
    }
  }
  
  function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    
    return `${year}-${month}-${day}`;
  }
  
  // Mise à jour de la date de retour
  pickupDate.addEventListener("change", function() {
    const selectedPickupDate = new Date(this.value);
    const minReturnDate = new Date(selectedPickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);
    
    returnDate.min = formatDate(minReturnDate);
    
    if (new Date(returnDate.value) < minReturnDate) {
      returnDate.value = formatDate(minReturnDate);
    }
    
    calculateRental();
  });
  
  // Calcul du prix estimé
  function calculateRental() {
    const vehicleType = document.getElementById("vehicle-type").value;
    const pickupDateValue = new Date(pickupDate.value);
    const returnDateValue = new Date(returnDate.value);
    
    const timeDiff = returnDateValue.getTime() - pickupDateValue.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const basePrices = {
      car: 55,
      motorcycle: 25,
      atv: 45
    };
    
    if (vehicleType && basePrices[vehicleType]) {
      const basePrice = basePrices[vehicleType];
      const totalPrice = basePrice * daysDiff;
      
      const priceDisplay = document.getElementById("estimated-price");
      if (priceDisplay) {
        priceDisplay.innerHTML = `
          <p>Durée de location: <strong>${daysDiff} jour(s)</strong></p>
          <p>Prix estimé: <strong>${totalPrice}€</strong></p>
        `;
      }
    }
  }
  
  // Initialisation
  setMinDates();
  
  // Événements pour le calcul du prix
  if (document.getElementById("vehicle-type")) {
    document.getElementById("vehicle-type").addEventListener("change", calculateRental);
  }
  
  returnDate.addEventListener("change", calculateRental);
  
  // NOUVELLE PARTIE: Gestion de la soumission du formulaire
  bookingForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    
    // Récupération des données du formulaire
    const name = document.getElementById("booking-name").value;
    const email = document.getElementById("booking-email").value;
    const phone = document.getElementById("booking-phone")?.value || "";
    const vehicleType = document.getElementById("vehicle-type").value;
    const pickupDateValue = pickupDate.value;
    const returnDateValue = returnDate.value;
    const pickupLocation = document.getElementById("pickup-location").value;
    
    // Validation
    if (!name || !email || !vehicleType || !pickupLocation) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Préparation des données
    const bookingData = {
      formType: "booking",
      name,
      email,
      phone,
      vehicleType,
      pickupDate: pickupDateValue,
      returnDate: returnDateValue,
      pickupLocation
    };
    
    try {
      // Affichage d'un indicateur de chargement
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement en cours...';
      submitBtn.disabled = true;
      
      // Envoi des données au script Google
      const response = await fetch("https://script.google.com/macros/s/AKfycbxJ27qT7M6QZAvJWUnJGVCuM_EKKiiJow7SWqO8PEXVgQcCUNZIRrxlLgNsFBSgv0TgvA/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData)
      });
      
      const result = await response.json();
      
      // Restauration du bouton
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
      
      if (result.success) {
        // Message de succès
        alert("Votre demande de réservation a été envoyée avec succès. Nous vous contacterons rapidement pour confirmer votre réservation.");
        bookingForm.reset();
        setMinDates();
      } else {
        // Message d'erreur
        alert("Erreur: " + (result.message || "Une erreur est survenue. Veuillez réessayer."));
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      alert("Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet et réessayer.");
      
      // Restauration du bouton en cas d'erreur
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn.innerHTML = "Réserver maintenant";
      submitBtn.disabled = false;
    }
  });
});