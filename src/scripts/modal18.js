document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("ageVerificationModal");
  const confirmButton = document.getElementById("confirmAge");
  const denyButton = document.getElementById("denyAge");
  const birthdateInput = document.getElementById("birthdate");
  const errorMessage = document.getElementById("errorMessage");

  modal.style.display = "flex";

  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  confirmButton.addEventListener("click", function () {
    const birthdate = birthdateInput.value;

    if (!birthdate) {
      alert("Por favor, insira sua data de nascimento.");
      return;
    }

    const age = calculateAge(birthdate);

    if (age >= 18) {
      modal.style.display = "none";
    } else {
      errorMessage.style.display = "block";
    }
  });

  denyButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
