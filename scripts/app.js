const firebaseConfig = {
  apiKey: "AIzaSyBK5304WT8Ozel2tgBrtDGZUigiR5T0Ht0",
  authDomain: "techtacolthroca.firebaseapp.com",
  projectId: "techtacolthroca",
  storageBucket: "techtacolthroca.firebasestorage.app",
  messagingSenderId: "579061670376",
  appId: "1:579061670376:web:58f0104856280e1f8a845d",
};

const NETWORK_SSID = "RedTechTaco_LTHROCA";
const NETWORK_PASSWORD = "TacoLTHR0!2025";
const LOCAL_STORAGE_KEY = "techtacoRegistrationComplete";
const IP_ENDPOINT = "https://api.ipify.org?format=json";
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
const thankYouEl = document.getElementById("thank-you");
const copyPasswordBtn = document.getElementById("copy-password");
const copyFeedbackEl = document.getElementById("copy-feedback");
const returningBanner = document.getElementById("returning-banner");

let clientIp = null;

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

const markLocalRegistration = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, "true");
  } catch (error) {
    console.warn("Local storage unavailable", error);
  }
};

const hasLocalRegistration = () => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEY) === "true";
  } catch (error) {
    return false;
  }
};

const showReturningState = () => {
  if (returningBanner) {
    returningBanner.hidden = false;
  }
  form.hidden = true;
  wifiEl.hidden = true;
  if (thankYouEl) {
    thankYouEl.hidden = false;
  }
};

const showThankYouScreen = () => {
  if (wifiEl) {
    wifiEl.hidden = true;
  }
  if (thankYouEl) {
    thankYouEl.hidden = false;
  }
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
      copyFeedbackEl.textContent = "Contraseña copiada. Gracias por tu visita.";
    }
    markLocalRegistration();
    showThankYouScreen();
  } catch (error) {
    console.error("Clipboard error", error);
    if (copyFeedbackEl) {
      copyFeedbackEl.textContent = "Error al copiar. Intenta de nuevo.";
    }
  }
};

const fetchClientIp = async () => {
  try {
    const response = await fetch(IP_ENDPOINT);
    if (!response.ok) {
      throw new Error("IP response not ok");
    }
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn("IP fetch failed", error);
    return null;
  }
};

const checkExistingRegistration = async (ip) => {
  if (!db || !ip) {
    return false;
  }

  try {
    const snapshot = await db
      .collection("publicNetworkRegistrations")
      .where("ip", "==", ip)
      .limit(1)
      .get();
    return !snapshot.empty;
  } catch (error) {
    console.error("Returning check failed", error);
    return false;
  }
};

const evaluateReturningVisitor = async () => {
  if (hasLocalRegistration()) {
    showReturningState();
    return;
  }

  clientIp = await fetchClientIp();
  if (!clientIp) {
    return;
  }

  const alreadyRegistered = await checkExistingRegistration(clientIp);
  if (alreadyRegistered) {
    markLocalRegistration();
    showReturningState();
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

    if (clientIp) {
      payload.ip = clientIp;
    }

    await db.collection("publicNetworkRegistrations").add(payload);

    showMessage(
      "Registro guardado. Ya puedes conectarte a RedTechTaco_LTHROCA."
    );
    markLocalRegistration();
    if (wifiEl) {
      wifiEl.hidden = false;
    }
    if (thankYouEl) {
      thankYouEl.hidden = true;
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

evaluateReturningVisitor();
