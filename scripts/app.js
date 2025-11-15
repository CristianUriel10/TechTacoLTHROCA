const firebaseConfig = {
  apiKey: "AIzaSyBK5304WT8Ozel2tgBrtDGZUigiR5T0Ht0",
  authDomain: "techtacolthroca.firebaseapp.com",
  projectId: "techtacolthroca",
  storageBucket: "techtacolthroca.firebasestorage.app",
  messagingSenderId: "579061670376",
  appId: "1:579061670376:web:58f0104856280e1f8a845d",
};

const NETWORK_PASSWORD = "TacoLTHR0!2025";
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
const copyPasswordBtn = document.getElementById("copy-password");
const copyFeedbackEl = document.getElementById("copy-feedback");

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

const handleCopyPassword = async () => {
  if (!navigator.clipboard) {
    if (copyFeedbackEl) {
      copyFeedbackEl.textContent =
        "No pudimos copiar automáticamente, copia manual.";
    }
    return;
  }

  try {
    await navigator.clipboard.writeText(NETWORK_PASSWORD);
    if (copyFeedbackEl) {
      copyFeedbackEl.textContent =
        "Contraseña copiada. ¡Listo para conectarte!";
    }
  } catch (error) {
    console.error("Clipboard error", error);
    if (copyFeedbackEl) {
      copyFeedbackEl.textContent = "Error al copiar. Intenta de nuevo.";
    }
  }
};

const isEmailRegistered = async (email) => {
  if (!db || !email) {
    return false;
  }

  const normalized = email.toLowerCase();

  try {
    const normalizedSnapshot = await db
      .collection("publicNetworkRegistrations")
      .where("emailNormalized", "==", normalized)
      .limit(1)
      .get();

    if (!normalizedSnapshot.empty) {
      return true;
    }

    const legacySnapshot = await db
      .collection("publicNetworkRegistrations")
      .where("email", "==", email)
      .limit(1)
      .get();

    return !legacySnapshot.empty;
  } catch (error) {
    console.error("Email duplicate check failed", error);
    return false;
  }
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
  const emailValue = data.get("email");
  const phoneValue = data.get("phone");
  const validation = window.validateFields({
    email: emailValue,
    phone: phoneValue,
  });

  if (!validation.valid) {
    showMessage(validation.message, true);
    return;
  }

  setLoading(true);
  showMessage("Guardando registro...");

  try {
    const payload = {
      email: emailValue.trim(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    const normalizedPhone = phoneValue?.trim();
    if (normalizedPhone) {
      payload.phone = normalizedPhone;
    }

    const alreadyRegisteredByEmail = await isEmailRegistered(payload.email);
    if (alreadyRegisteredByEmail) {
      showMessage(
        "Este correo ya está registrado. Usa tus datos existentes.",
        true
      );
      setLoading(false);
      return;
    }

    payload.emailNormalized = payload.email.toLowerCase();

    await db.collection("publicNetworkRegistrations").add(payload);

    showMessage(
      "Registro guardado. Ya puedes conectarte a RedTechTaco_LTHROCA."
    );
    form.hidden = true;
    if (wifiEl) {
      wifiEl.hidden = false;
    }
    form.reset();
  } catch (error) {
    console.error("Firestore write error", error);
    showMessage("Error al guardar. Intenta nuevamente.", true);
  } finally {
    setLoading(false);
  }
};

form.addEventListener("submit", handleSubmit);

if (copyPasswordBtn) {
  copyPasswordBtn.addEventListener("click", handleCopyPassword);
}
