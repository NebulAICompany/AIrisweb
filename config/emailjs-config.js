/**
 * EmailJS Configuration
 * Bu dosya güvenlik için .gitignore'a eklenmiştir
 * Gerçek değerleri buraya yazın ve dosyayı Git'e eklemeyin
 */

// EmailJS kimlik bilgileri
window.EMAILJS_CONFIG = {
  // EmailJS Public Key - EmailJS dashboard'dan alın
  publicKey: "RCirv8j1Hdd5u3soI",

  // EmailJS Service ID - EmailJS dashboard'dan alın
  serviceId: "service_m8yq9e8",

  // EmailJS Template ID - EmailJS dashboard'dan alın
  templateId: "template_kc8bl1l",

  // Hedef email adresi
  toEmail: "nebulaicompany@gmail.com",
};

// Güvenli email adresi oluşturma
window.getSecureEmail = function () {
  return "nebulaicompany" + "@" + "gmail.com";
};
