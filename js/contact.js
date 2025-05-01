// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      
      // Récupération des données du formulaire
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone")?.value || "";
      const message = document.getElementById("message").value;
      
      // Validation
      if (!name || !email || !message) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      
      // Préparation des données
      const contactData = {
        formType: "contact",
        name,
        email,
        phone,
        message
      };
      
      try {
        // Affichage d'un indicateur de chargement
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Envoi des données au script Google
        const response = await fetch("https://script.google.com/macros/s/AKfycbxJ27qT7M6QZAvJWUnJGVCuM_EKKiiJow7SWqO8PEXVgQcCUNZIRrxlLgNsFBSgv0TgvA/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData)
        });
        
        const result = await response.json();
        
        // Restauration du bouton
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        if (result.success) {
          // Message de succès
          alert("Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.");
          contactForm.reset();
        } else {
          // Message d'erreur
          alert("Erreur: " + (result.message || "Une erreur est survenue. Veuillez réessayer."));
        }
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
        alert("Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet et réessayer.");
        
        // Restauration du bouton en cas d'erreur
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = "Envoyer";
        submitBtn.disabled = false;
      }
    });
  });