const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
  projectId: "YOUR_FIREBASE_PROJECT_ID",
  storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
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
 * Validates form data before sending to Firestore.
 * @param {FormData} data
 * @returns {{ valid: boolean, message?: string }}
 */
const validateData = (data) => {
  const name = data.get("fullName")?.trim();
  const email = data.get("email")?.trim();
  const phone = data.get("phone")?.trim();
  const terms = data.get("terms");

  if (!name || name.length < 3) {
    return { valid: false, message: "Ingresa tu nombre completo." };
  }

  if (!email || !/^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,}$/.test(email)) {
    return { valid: false, message: "Correo electrónico inválido." };
  }

  if (!phone || phone.replace(/\\D/g, "").length < 8) {
    return { valid: false, message: "Número telefónico inválido." };
  }

  if (!terms) {
    return { valid: false, message: "Debes aceptar los términos de uso." };
  }

  return { valid: true };
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
  const validation = validateData(data);

  if (!validation.valid) {
    showMessage(validation.message, true);
    return;
  }

  setLoading(true);
  showMessage("Guardando registro...");

  try {
    await db.collection("publicNetworkRegistrations").add({
      fullName: data.get("fullName").trim(),
      email: data.get("email").trim(),
      phone: data.get("phone").trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    showMessage("Registro guardado. Disfruta la red.");
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

