import { initRegistration } from "./registration.js";
import { initHome } from "./home.js";
import { initSavedPage } from "./saved.js";
import { initLogin } from "./login.js";

try {
  initRegistration();
} catch (e) {
  console.log("რეგისტრაციის გვერდი არ არის");
}

try {
  initHome();
} catch (e) {
  console.log("მთავარი გვერდი არ არის");
}

try {
  initSavedPage();
} catch (e) {
  console.log("შენახულების გვერდი არ არის");
}

try {
  initLogin();
} catch (e) {
  console.log("ლოგინის გვერდი არ არის");
}
