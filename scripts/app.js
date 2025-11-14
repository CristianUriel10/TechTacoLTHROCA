const firebaseConfig = {
  apiKey: "AIzaSyBK5304WT8Ozel2tgBrtDGZUigiR5T0Ht0",
  authDomain: "techtacolthroca.firebaseapp.com",
  projectId: "techtacolthroca",
  storageBucket: "techtacolthroca.firebasestorage.app",
  messagingSenderId: "579061670376",
  appId: "1:579061670376:web:58f0104856280e1f8a845d",
};
/**
 * Initializes Firebase app safely.
 * @returns {firebase.firestore.Firestore | null}
 */
const bootstrapFirestore = () => {
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase init error", error);
      return null;
    }
  }
  return firebase.firestore();
};

const db = bootstrapFirestore();
const form = document.getElementById("registration-form");
const messageEl = document.getElementById("form-message");
const buttonEl = form.querySelector(".button");
const wifiEl = document.getElementById("wifi-credentials");

/**
 * Updates submit button loading state.
 * @param {boolean} loading
 */
const setLoading = (loading) => {
  buttonEl.disabled = loading;
  buttonEl.dataset.loading = loading ? "true" : "false";
};

/**
 * Displays a helper message below the form.
 * @param {string} text
 * @param {boolean} isError
 */
const showMessage = (text, isError = false) => {
  messageEl.textContent = text;
  messageEl.classList.toggle("form__message--error", isError);
};

/**
 * Handles form submission and Firestore persistence.
 * @param {SubmitEvent} event
 */
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!db) {
    showMessage("Configura Firebase antes de continuar.", true);
    return;
  }

  const data = new FormData(form);
  const validation = window.validateFields({
    email: data.get("email"),
    phone: data.get("phone"),
  });

  if (!validation.valid) {
    showMessage(validation.message, true);
    return;
  }

  setLoading(true);
  showMessage("Guardando registro...");

  try {
    await db.collection("publicNetworkRegistrations").add({
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    showMessage(
      "Registro guardado. Ya puedes conectarte a RedTechTaco_LTHROCA."
    );
    wifiEl.hidden = false;
    form.reset();
  } catch (error) {
    console.error("Firestore write error", error);
    showMessage("Error al guardar. Intenta nuevamente.", true);
  } finally {
    setLoading(false);
  }
};

form.addEventListener("submit", handleSubmit);
