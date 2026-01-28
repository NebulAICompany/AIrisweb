/**
 * Language Management System for AIris Website
 * Supports Turkish and English with best practices implementation
 */

class LanguageManager {
  constructor() {
    this.currentLanguage = "en"; // Default to English as requested
    this.supportedLanguages = ["en", "tr"];
    this.translations = this.getTranslations();
    this.isToggling = false; // Prevent rapid clicking
    this.handleLanguageToggle = null; // Event handler reference
    this.init();
  }

  init() {
    this.detectLanguage();
    this.loadLanguage();
    this.setupLanguageSwitcher();
    this.updatePageLanguage();
  }

  // Language detection with fallback to English
  detectLanguage() {
    // Check localStorage first
    const savedLanguage = localStorage.getItem("airis-language");
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
      return;
    }

    // Check browser language
    const browserLanguage = navigator.language || navigator.userLanguage;
    const primaryLanguage = browserLanguage.split("-")[0];

    if (this.supportedLanguages.includes(primaryLanguage)) {
      this.currentLanguage = primaryLanguage;
    } else {
      // Default to English as requested
      this.currentLanguage = "en";
    }
  }

  // Load and apply language
  loadLanguage() {
    this.applyTranslations();
    this.saveLanguage();
  }

  // Switch language
  switchLanguage(languageCode) {
    if (!this.supportedLanguages.includes(languageCode)) {
      console.warn(`Unsupported language code: ${languageCode}`);
      return;
    }

    if (this.currentLanguage === languageCode) {
      return; // Already in the requested language
    }

    this.currentLanguage = languageCode;
    this.loadLanguage();
    this.updatePageLanguage();
    this.updateLanguageSwitcher();
  }

  // Update HTML lang attribute for SEO
  updatePageLanguage() {
    document.documentElement.lang = this.currentLanguage;

    // Update meta tags for better SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content =
        this.translations[this.currentLanguage].meta.description;
    }

    // Update title for better SEO
    if (this.translations[this.currentLanguage].meta.title) {
      document.title = this.translations[this.currentLanguage].meta.title;
    }
  }

  // Apply translations to the page
  applyTranslations() {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      const translation = this.getTranslation(key);
      if (translation) {
        if (
          element.tagName === "INPUT" &&
          (element.type === "text" || element.type === "email")
        ) {
          element.placeholder = translation;
        } else if (element.tagName === "TEXTAREA") {
          element.placeholder = translation;
        } else if (element.tagName === "OPTION") {
          element.textContent = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  // Get translation by key
  getTranslation(key) {
    const keys = key.split(".");
    let translation = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return null;
      }
    }

    return translation;
  }

  // Save language preference
  saveLanguage() {
    localStorage.setItem("airis-language", this.currentLanguage);
  }

  // Setup language switcher
  setupLanguageSwitcher() {
    const switcher = document.getElementById("language-switcher");
    if (switcher) {
      // Remove existing event listeners to prevent duplicates
      switcher.removeEventListener("click", this.handleLanguageToggle);

      // Bind the handler to preserve 'this' context
      this.handleLanguageToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleLanguage();
      };

      switcher.addEventListener("click", this.handleLanguageToggle);
    }
  }

  // Toggle between languages
  toggleLanguage() {
    // Prevent rapid clicking
    if (this.isToggling) {
      return;
    }

    this.isToggling = true;
    const newLanguage = this.currentLanguage === "en" ? "tr" : "en";

    try {
      this.switchLanguage(newLanguage);
    } catch (error) {
      console.error("Language toggle error:", error);
    } finally {
      // Reset toggle lock after a short delay
      setTimeout(() => {
        this.isToggling = false;
      }, 300);
    }
  }

  // Update language switcher display
  updateLanguageSwitcher() {
    const switcher = document.getElementById("language-switcher");
    if (switcher) {
      const currentLangText =
        this.currentLanguage === "en" ? "Türkçe" : "English";
      switcher.textContent = currentLangText;
      switcher.setAttribute("aria-label", `Switch to ${currentLangText}`);
    }
  }

  // Get all translations
  getTranslations() {
    return {
      en: {
        meta: {
          title: "AIris: Enterprise Finance Automation - Nebula Intelligence",
          description:
            "Revolutionize your financial workflow with AIris. The unified intelligence engine for secure, autonomous, and strategic operations. Powered by Nebula Intelligence.",
        },
        nav: {
          home: "Home",
          features: "Features",
          demo: "Demo",
          gallery: "Gallery",
          contact: "Contact",
        },
        hero: {
          title: "All your financial operations",
          titleHighlight: "in one platform",
          description:
            "AIris handles document verification, financial analysis, data processing, and market research.",
          descriptionHighlight:
            "No additional resources needed - everything you need is here.",
          discover: "Discover AIris",
        },
        features: {
          title: "What can AIris do for you?",
          documentVerification: "Document Verification",
          financialAnalysis: "Financial Analysis",
          visualIntelligence: "Visual Intelligence",
          mathematicalComputing: "Mathematical Computing",
          webSearch: "Web Search",
          userMessage: "You",
          airisMessage: "AIris",
          documentQuestion: "Is this invoice authentic?",
          documentAnswer:
            "Document verified ✓ No fraud detected. All signatures and watermarks are authentic.",
          analysisQuestion: "Show me Tesla stock with moving averages",
          analysisAnswer:
            "Interactive chart generated ✓ Tesla at $248.50 with 50-day and 200-day moving averages.",
          visualQuestion: "What does this revenue chart show?",
          visualAnswer:
            "Chart analysis complete ✓ 23% Q3 growth with peak in September. Trend shows strong upward momentum.",
          mathQuestion: "Calculate CAGR and statistical significance",
          mathAnswer:
            "Analysis complete ✓ CAGR: 15.7% with 95% confidence interval. Results statistically significant.",
          searchQuestion: "Find latest news about this company",
          searchAnswer:
            "News retrieved ✓ 5 recent articles: earnings beat expectations, new partnerships announced.",
        },
        demo: {
          title: "See AIris in Action",
          description:
            "Watch how AIris transforms complex financial document processing into simple, automated workflows.",
          videoTitle: "AIris Product Demo",
          videoDescription: "Complete walkthrough of features and capabilities",
        },
        gallery: {
          title: "Gallery",
          mainDashboard: "Main Dashboard",
          financialCharts: "Financial Charts",
          documentVerification: "Document Verification",
        },
        security: {
          title: "Your Data, Your Control",
          description:
            "Enterprise-grade security with complete privacy protection.",
          onPremise: "On-Premise Processing",
          onPremiseDesc:
            "All data processing happens on your local infrastructure. Your documents never leave your environment.",
          encryption: "End-to-End Encryption",
          encryptionDesc:
            "Military-grade encryption protects your data at rest and in transit. Zero-knowledge architecture ensures privacy.",
          noDataCollection: "No Data Collection",
          noDataCollectionDesc:
            "We don't collect, store, or share your financial data. What's yours stays yours, always.",
        },
        contact: {
          title: "Ready to transform your workflow?",
          formTitle: "Send us a Message",
          name: "Name",
          namePlaceholder: "Your full name",
          email: "Email",
          emailPlaceholder: "your.email@example.com",
          subject: "Subject",
          subjectPlaceholder: "Enter your subject",
          message: "Message",
          messagePlaceholder: "Tell us how we can help you...",
          submit: "Submit",
          generalInquiry: "General Inquiry",
          requestDemo: "Request Demo",
          technicalSupport: "Technical Support",
          partnership: "Partnership",
          other: "Other",
        },
        footer: {
          tagline: "AI-Powered Financial Document Processing",
          product: "Product",
          legal: "Legal",
          privacyPolicy: "Privacy Policy",
          termsOfService: "Terms of Service",
          copyright: "NebulAI Intelligence. All rights reserved.",
        },
        legal: {
          backToHome: "Back to Home",
          lastUpdated: "Last updated: September 1, 2025",
          privacyPolicy: "Privacy Policy",
          termsOfService: "Terms of Service",
          contactUs: "Contact Us",
          terms: {
            section1: {
              title: "1. Acceptance of Terms",
              para1:
                'These Terms of Service ("Terms") govern your use of the AIris website and desktop application operated by Nebula Intelligence ("Company," "we," "our," or "us"). By accessing or using our services, you agree to be bound by these Terms.',
              para2:
                "If you do not agree to these Terms, please do not use our services.",
            },
            section2: {
              title: "2. Description of Service",
              para1:
                "AIris is an AI-powered desktop application designed for financial document processing, verification, and analysis. The application processes documents locally on your device and provides insights and analysis of financial data.",
              highlightTitle: "🔒 Local Processing",
              highlightText:
                "AIris processes all data locally on your device. Your financial documents and data are never transmitted to our servers or third parties.",
            },
            section3: {
              title: "3. License and Usage Rights",
              subsection1: {
                title: "3.1 License Grant",
                text: "Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to use AIris for your personal or business purposes.",
              },
              subsection2: {
                title: "3.2 Permitted Uses",
                text: "You may use AIris to:",
                list1: "Process and analyze your own financial documents",
                list2: "Verify document authenticity",
                list3: "Generate financial insights and reports",
                list4: "Detect potential fraud or inconsistencies",
              },
              subsection3: {
                title: "3.3 Prohibited Uses",
                text: "You may not:",
                list1: "Use AIris for any illegal or unauthorized purpose",
                list2:
                  "Attempt to reverse engineer, decompile, or disassemble the software",
                list3: "Distribute, sublicense, or resell the application",
                list4:
                  "Use AIris to process documents you do not have the right to access",
                list5:
                  "Interfere with or disrupt the application's functionality",
              },
            },
            section4: {
              title: "4. User Responsibilities",
              subsection1: {
                title: "4.1 Data Accuracy",
                text: "You are responsible for ensuring the accuracy and completeness of the data you input into AIris. We are not liable for decisions made based on inaccurate or incomplete data.",
              },
              subsection2: {
                title: "4.2 Compliance",
                text: "You must comply with all applicable laws and regulations when using AIris, including but not limited to data protection, privacy, and financial regulations.",
              },
              subsection3: {
                title: "4.3 Security",
                text: "You are responsible for maintaining the security of your device and ensuring that unauthorized users cannot access AIris or your processed data.",
              },
            },
            section5: {
              title: "5. Intellectual Property",
              para1:
                "AIris and all related intellectual property rights are owned by Nebula Intelligence. The application, including its design, functionality, and algorithms, is protected by copyright, trademark, and other intellectual property laws.",
              para2:
                "You retain ownership of your data and documents. We do not claim any rights to your financial information or processed documents.",
            },
            section6: {
              title: "6. Disclaimers and Limitations",
              warningTitle: "⚠️ Important Disclaimers",
              warningText:
                'AIris is provided "as is" without warranties of any kind. While we strive for accuracy, AI analysis may not be 100% accurate and should not be the sole basis for important decisions.',
              subsection1: {
                title: "6.1 No Warranties",
                text: "We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.",
              },
              subsection2: {
                title: "6.2 Limitation of Liability",
                text: "To the maximum extent permitted by law, Nebula Intelligence shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.",
              },
              subsection3: {
                title: "6.3 Accuracy Disclaimer",
                text: "While AIris uses advanced AI technology, the accuracy of analysis and verification cannot be guaranteed. Users should verify important findings through additional means.",
              },
            },
            section7: {
              title: "7. Privacy and Data Protection",
              text: "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information. AIris is designed with privacy-first principles, processing all data locally on your device.",
            },
            section8: {
              title: "8. Updates and Modifications",
              text: "We may update AIris and these Terms from time to time. We will notify you of significant changes through the application or our website. Continued use of AIris after changes constitutes acceptance of the updated Terms.",
            },
            section9: {
              title: "9. Termination",
              para1:
                "We may terminate or suspend your access to AIris at any time, with or without notice, for violation of these Terms or for any other reason at our sole discretion.",
              para2:
                "Upon termination, your right to use AIris ceases immediately. You may delete the application and any associated data from your device.",
            },
            section10: {
              title: "10. Governing Law",
              text: "These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to conflict of law principles.",
            },
            section11: {
              title: "11. Dispute Resolution",
              text: "Any disputes arising from these Terms or your use of AIris shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
            },
            section12: {
              title: "12. Severability",
              text: "If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.",
            },
            section13: {
              title: "13. Entire Agreement",
              text: "These Terms, together with our Privacy Policy, constitute the entire agreement between you and Nebula Intelligence regarding the use of AIris.",
            },
          },
          privacy: {
            section1: {
              title: "1. Introduction",
              para1:
                'Nebula Intelligence ("we," "our," or "us") operates the AIris website and desktop application. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AIris application.',
              para2:
                "Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the site or use our services.",
            },
            section2: {
              title: "2. Information We Collect",
              subsection1: {
                title: "2.1 Website Usage Information",
                text: "When you visit our website, we may collect:",
                list1: "IP address and browser information",
                list2: "Pages visited and time spent on our site",
                list3: "Referring website information",
                list4: "Device and operating system information",
              },
              subsection2: {
                title: "2.2 Contact Information",
                text: "If you contact us through our website, we may collect:",
                list1: "Name and email address",
                list2: "Company information (if provided)",
                list3: "Message content",
              },
              subsection3: {
                title: "2.3 Application Data",
                text: "Important: AIris is designed with privacy-first principles. The application processes your financial documents locally on your device. We do not collect, store, or transmit your financial data or documents to our servers.",
              },
            },
            section3: {
              title: "3. How We Use Your Information",
              text: "We use the information we collect to:",
              list1: "Provide and maintain our website and services",
              list2: "Respond to your inquiries and provide customer support",
              list3: "Improve our website and application",
              list4: "Send you updates about our services (with your consent)",
              list5: "Comply with legal obligations",
            },
            section4: {
              title: "4. Data Security and Privacy",
              highlightTitle: "🔒 Local Processing Guarantee",
              highlightText:
                "AIris processes all financial documents locally on your device. Your sensitive financial data never leaves your computer and is never transmitted to our servers or third parties.",
              subsection1: {
                title: "4.1 Security Measures",
                text: "We implement appropriate security measures to protect your information:",
                list1: "End-to-end encryption for any data transmission",
                list2: "Secure data storage practices",
                list3: "Regular security audits and updates",
                list4: "Access controls and authentication",
              },
              subsection2: {
                title: "4.2 Data Retention",
                text: "We retain website usage data for analytical purposes for up to 24 months. Contact information is retained only as long as necessary to respond to your inquiry or provide ongoing support.",
              },
            },
            section5: {
              title: "5. Cookies and Tracking",
              para1:
                "Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.",
              para2:
                "We do not use cookies for advertising or tracking across other websites.",
            },
            section6: {
              title: "6. Third-Party Services",
              text: "We may use third-party services for website analytics and functionality. These services have their own privacy policies and data practices. We do not share your personal information with third parties except as described in this policy.",
            },
            section7: {
              title: "7. Your Rights",
              text: "Depending on your location, you may have the following rights:",
              list1: "Access to your personal information",
              list2: "Correction of inaccurate information",
              list3: "Deletion of your personal information",
              list4: "Data portability",
              list5: "Objection to processing",
              list6: "Withdrawal of consent",
              note: "To exercise these rights, please contact us using the information provided below.",
            },
            section8: {
              title: "8. Children's Privacy",
              text: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
            },
            section9: {
              title: "9. International Data Transfers",
              text: "If you are accessing our services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.",
            },
            section10: {
              title: "10. Changes to This Privacy Policy",
              para1:
                'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.',
              para2:
                "You are advised to review this Privacy Policy periodically for any changes.",
            },
          },
        },
      },
      tr: {
        meta: {
          title: "AIris: Kurumsal Finans Otomasyonu - Nebula Intelligence",
          description:
            "AIris ile finansal iş akışınızda devrim yaratın. Güvenli, otonom ve stratejik operasyonlar için birleşik zeka motoru. Nebula Intelligence tarafından desteklenmektedir.",
        },
        nav: {
          home: "Ana Sayfa",
          features: "Özellikler",
          demo: "Demo",
          gallery: "Galeri",
          contact: "İletişim",
        },
        hero: {
          title: "Tüm finansal işlemleriniz",
          titleHighlight: "tek platformda",
          description:
            "AIris belge doğrulama, finansal analiz, veri işleme ve pazar araştırması yapar.",
          descriptionHighlight:
            "Ek kaynak gerekmez - ihtiyacınız olan her şey burada.",
          discover: "AIris'i Keşfedin",
        },
        features: {
          title: "AIris sizin için neler yapabilir?",
          documentVerification: "Belge Doğrulama",
          financialAnalysis: "Finansal Analiz",
          visualIntelligence: "Görsel Zeka",
          mathematicalComputing: "Matematiksel Hesaplama",
          webSearch: "Web Arama",
          userMessage: "Siz",
          airisMessage: "AIris",
          documentQuestion: "Bu fatura gerçek mi?",
          documentAnswer:
            "Belge doğrulandı ✓ Sahtecilik tespit edilmedi. Tüm imzalar ve filigranlar orijinal.",
          analysisQuestion: "Tesla hissesini hareketli ortalamalarla göster",
          analysisAnswer:
            "İnteraktif grafik oluşturuldu ✓ Tesla $248.50'de 50 günlük ve 200 günlük hareketli ortalamalarla.",
          visualQuestion: "Bu gelir grafiği ne gösteriyor?",
          visualAnswer:
            "Grafik analizi tamamlandı ✓ Q3'te %23 büyüme, Eylül'de zirve. Trend güçlü yukarı momentum gösteriyor.",
          mathQuestion: "CAGR ve istatistiksel anlamlılığı hesapla",
          mathAnswer:
            "Analiz tamamlandı ✓ CAGR: %15.7, %95 güven aralığı. Sonuçlar istatistiksel olarak anlamlı.",
          searchQuestion: "Bu şirket hakkında son haberleri bul",
          searchAnswer:
            "Haberler alındı ✓ 5 son makale: kazançlar beklentileri aştı, yeni ortaklıklar duyuruldu.",
        },
        demo: {
          title: "AIris'i Çalışırken Görün",
          description:
            "AIris'in karmaşık finansal belge işlemeyi nasıl basit, otomatik iş akışlarına dönüştürdüğünü izleyin.",
          videoTitle: "AIris Ürün Demo",
          videoDescription: "Özellikler ve yeteneklerin tam kılavuzu",
        },
        gallery: {
          title: "Galeri",
          mainDashboard: "Ana Kontrol Paneli",
          financialCharts: "Finansal Grafikler",
          documentVerification: "Belge Doğrulama",
        },
        security: {
          title: "Verileriniz, Kontrolünüz",
          description: "Kurumsal düzeyde güvenlik ile tam gizlilik koruması.",
          onPremise: "Şirket İçi İşleme",
          onPremiseDesc:
            "Tüm veri işleme yerel altyapınızda gerçekleşir. Belgeleriniz ortamınızdan asla çıkmaz.",
          encryption: "Uçtan Uca Şifreleme",
          encryptionDesc:
            "Askeri düzeyde şifreleme verilerinizi hem beklerken hem de aktarım sırasında korur. Sıfır bilgi mimarisi gizliliği sağlar.",
          noDataCollection: "Veri Toplama Yok",
          noDataCollectionDesc:
            "Finansal verilerinizi toplamıyor, saklamıyor veya paylaşmıyoruz. Sizin olan her zaman sizin kalır.",
        },
        contact: {
          title: "İş akışınızı dönüştürmeye hazır mısınız?",
          formTitle: "Bize Mesaj Gönderin",
          name: "Ad",
          namePlaceholder: "Adınız ve soyadınız",
          email: "E-posta",
          emailPlaceholder: "email@ornek.com",
          subject: "Konu",
          subjectPlaceholder: "Konunuzu yazın",
          message: "Mesaj",
          messagePlaceholder: "Size nasıl yardımcı olabileceğimizi söyleyin...",
          submit: "Gönder",
          generalInquiry: "Genel Soru",
          requestDemo: "Demo Talep Et",
          technicalSupport: "Teknik Destek",
          partnership: "Ortaklık",
          other: "Diğer",
        },
        footer: {
          tagline: "AI Destekli Finansal Belge İşleme",
          product: "Ürün",
          legal: "Yasal",
          privacyPolicy: "Gizlilik Politikası",
          termsOfService: "Hizmet Şartları",
          copyright: "NebulAI Intelligence. Tüm hakları saklıdır.",
        },
        legal: {
          backToHome: "Ana Sayfaya Dön",
          lastUpdated: "Son güncelleme: 1 Eylül 2025",
          privacyPolicy: "Gizlilik Politikası",
          termsOfService: "Hizmet Şartları",
          contactUs: "İletişim",
          terms: {
            section1: {
              title: "1. Şartların Kabulü",
              para1:
                'Bu Hizmet Şartları ("Şartlar"), Nebula Intelligence ("Şirket," "biz," "bizim" veya "bizim") tarafından işletilen AIris web sitesi ve masaüstü uygulamasının kullanımınızı düzenler. Hizmetlerimize erişerek veya kullanarak bu Şartlara bağlı kalmayı kabul edersiniz.',
              para2:
                "Bu Şartları kabul etmiyorsanız, lütfen hizmetlerimizi kullanmayın.",
            },
            section2: {
              title: "2. Hizmet Açıklaması",
              para1:
                "AIris, finansal belge işleme, doğrulama ve analiz için tasarlanmış AI destekli bir masaüstü uygulamasıdır. Uygulama belgeleri cihazınızda yerel olarak işler ve finansal verilerin analizi ve içgörülerini sağlar.",
              highlightTitle: "🔒 Yerel İşleme",
              highlightText:
                "AIris tüm verileri cihazınızda yerel olarak işler. Finansal belgeleriniz ve verileriniz sunucularımıza veya üçüncü taraflara asla iletilmez.",
            },
            section3: {
              title: "3. Lisans ve Kullanım Hakları",
              subsection1: {
                title: "3.1 Lisans Verilmesi",
                text: "Bu Şartlara tabi olarak, AIris'i kişisel veya iş amaçlarınız için kullanmanız için sınırlı, münhasır olmayan, devredilemez bir lisans veriyoruz.",
              },
              subsection2: {
                title: "3.2 İzin Verilen Kullanımlar",
                text: "AIris'i şunlar için kullanabilirsiniz:",
                list1: "Kendi finansal belgelerinizi işlemek ve analiz etmek",
                list2: "Belge orijinalliğini doğrulamak",
                list3: "Finansal içgörüler ve raporlar oluşturmak",
                list4:
                  "Potansiyel sahteciliği veya tutarsızlıkları tespit etmek",
              },
              subsection3: {
                title: "3.3 Yasaklanan Kullanımlar",
                text: "Şunları yapamazsınız:",
                list1:
                  "AIris'i yasadışı veya yetkisiz herhangi bir amaç için kullanmak",
                list2:
                  "Yazılımı tersine mühendislik, dekompilasyon veya sökme girişiminde bulunmak",
                list3:
                  "Uygulamayı dağıtmak, alt lisanslamak veya yeniden satmak",
                list4:
                  "Erişim hakkınız olmayan belgeleri işlemek için AIris'i kullanmak",
                list5: "Uygulamanın işlevselliğini bozmak veya engellemek",
              },
            },
            section4: {
              title: "4. Kullanıcı Sorumlulukları",
              subsection1: {
                title: "4.1 Veri Doğruluğu",
                text: "AIris'e girdiğiniz verilerin doğruluğunu ve eksiksizliğini sağlamaktan siz sorumlusunuz. Yanlış veya eksik verilere dayalı kararlar için sorumlu değiliz.",
              },
              subsection2: {
                title: "4.2 Uyumluluk",
                text: "AIris'i kullanırken veri koruma, gizlilik ve finansal düzenlemeler dahil olmak üzere tüm geçerli yasalara ve düzenlemelere uymalısınız.",
              },
              subsection3: {
                title: "4.3 Güvenlik",
                text: "Cihazınızın güvenliğini sağlamaktan ve yetkisiz kullanıcıların AIris'e veya işlenmiş verilerinize erişememesini sağlamaktan siz sorumlusunuz.",
              },
            },
            section5: {
              title: "5. Fikri Mülkiyet",
              para1:
                "AIris ve tüm ilgili fikri mülkiyet hakları Nebula Intelligence'a aittir. Uygulama, tasarımı, işlevselliği ve algoritmaları dahil olmak üzere telif hakkı, marka ve diğer fikri mülkiyet yasalarıyla korunmaktadır.",
              para2:
                "Verilerinizin ve belgelerinizin sahipliğini elinde tutarsınız. Finansal bilgileriniz veya işlenmiş belgeleriniz üzerinde herhangi bir hak iddia etmiyoruz.",
            },
            section6: {
              title: "6. Feragatler ve Sınırlamalar",
              warningTitle: "⚠️ Önemli Feragatler",
              warningText:
                'AIris "olduğu gibi" herhangi bir garanti olmaksızın sağlanır. Doğruluk için çaba göstermemize rağmen, AI analizi %100 doğru olmayabilir ve önemli kararların tek temeli olmamalıdır.',
              subsection1: {
                title: "6.1 Garanti Yok",
                text: "Ticari satılabilirlik, belirli bir amaç için uygunluk ve ihlal etmeme dahil olmak üzere tüm garantileri reddediyoruz.",
              },
              subsection2: {
                title: "6.2 Sorumluluk Sınırlaması",
                text: "Yasaların izin verdiği maksimum ölçüde, Nebula Intelligence, kar kaybı, veri veya iş fırsatları dahil olmak üzere dolaylı, tesadüfi, özel, sonuçsal veya cezai zararlardan sorumlu olmayacaktır.",
              },
              subsection3: {
                title: "6.3 Doğruluk Feragatı",
                text: "AIris gelişmiş AI teknolojisi kullanmasına rağmen, analiz ve doğrulamanın doğruluğu garanti edilemez. Kullanıcılar önemli bulguları ek yollarla doğrulamalıdır.",
              },
            },
            section7: {
              title: "7. Gizlilik ve Veri Koruması",
              text: "Gizliliğiniz bizim için önemlidir. Bilgilerinizi nasıl topladığımızı, kullandığımızı ve koruduğumuzu anlamak için Gizlilik Politikamızı inceleyin. AIris, tüm verileri cihazınızda yerel olarak işleyerek gizlilik öncelikli ilkelerle tasarlanmıştır.",
            },
            section8: {
              title: "8. Güncellemeler ve Değişiklikler",
              text: "AIris'i ve bu Şartları zaman zaman güncelleyebiliriz. Önemli değişiklikleri uygulama veya web sitemiz aracılığıyla size bildireceğiz. Değişikliklerden sonra AIris'i kullanmaya devam etmek, güncellenmiş Şartları kabul ettiğiniz anlamına gelir.",
            },
            section9: {
              title: "9. Fesih",
              para1:
                "Bu Şartların ihlali veya tek taraflı takdirimize göre başka herhangi bir nedenle AIris'e erişiminizi herhangi bir zamanda, önceden haber vermeden veya haber vererek sonlandırabilir veya askıya alabiliriz.",
              para2:
                "Fesih durumunda, AIris'i kullanma hakkınız derhal sona erer. Uygulamayı ve cihazınızdaki tüm ilgili verileri silebilirsiniz.",
            },
            section10: {
              title: "10. Geçerli Hukuk",
              text: "Bu Şartlar, çakışma hukuku ilkelerine bakılmaksızın, Amerika Birleşik Devletleri Kaliforniya Eyaleti yasalarına göre yönetilecek ve yorumlanacaktır.",
            },
            section11: {
              title: "11. Uyuşmazlık Çözümü",
              text: "Bu Şartlardan veya AIris kullanımınızdan kaynaklanan uyuşmazlıklar, Amerikan Tahkim Birliği kurallarına uygun olarak bağlayıcı tahkim yoluyla çözülecektir.",
            },
            section12: {
              title: "12. Geçerlilik",
              text: "Bu Şartların herhangi bir hükmü uygulanamaz veya geçersiz bulunursa, kalan hükümler tam güç ve etkiyle yürürlükte kalacaktır.",
            },
            section13: {
              title: "13. Tam Anlaşma",
              text: "Bu Şartlar, Gizlilik Politikamızla birlikte, AIris kullanımı konusunda sizin ve Nebula Intelligence arasındaki tam anlaşmayı oluşturur.",
            },
          },
          privacy: {
            section1: {
              title: "1. Giriş",
              para1:
                'Nebula Intelligence ("biz," "bizim" veya "bizim") AIris web sitesi ve masaüstü uygulamasını işletir. Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya AIris uygulamamızı kullandığınızda bilgilerinizi nasıl topladığımızı, kullandığımızı, açıkladığımızı ve koruduğumuzu açıklar.',
              para2:
                "Lütfen bu Gizlilik Politikasını dikkatlice okuyun. Bu Gizlilik Politikasının şartlarını kabul etmiyorsanız, lütfen siteye erişmeyin veya hizmetlerimizi kullanmayın.",
            },
            section2: {
              title: "2. Topladığımız Bilgiler",
              subsection1: {
                title: "2.1 Web Sitesi Kullanım Bilgileri",
                text: "Web sitemizi ziyaret ettiğinizde şunları toplayabiliriz:",
                list1: "IP adresi ve tarayıcı bilgileri",
                list2: "Ziyaret edilen sayfalar ve sitemizde geçirilen süre",
                list3: "Yönlendiren web sitesi bilgileri",
                list4: "Cihaz ve işletim sistemi bilgileri",
              },
              subsection2: {
                title: "2.2 İletişim Bilgileri",
                text: "Web sitemiz aracılığıyla bizimle iletişime geçerseniz şunları toplayabiliriz:",
                list1: "Ad ve e-posta adresi",
                list2: "Şirket bilgileri (sağlanmışsa)",
                list3: "Mesaj içeriği",
              },
              subsection3: {
                title: "2.3 Uygulama Verileri",
                text: "Önemli: AIris gizlilik öncelikli ilkelerle tasarlanmıştır. Uygulama finansal belgelerinizi cihazınızda yerel olarak işler. Finansal verilerinizi veya belgelerinizi sunucularımıza toplamıyor, saklamıyor veya iletmiyoruz.",
              },
            },
            section3: {
              title: "3. Bilgilerinizi Nasıl Kullanıyoruz",
              text: "Topladığımız bilgileri şunlar için kullanırız:",
              list1: "Web sitemizi ve hizmetlerimizi sağlamak ve sürdürmek",
              list2: "Sorularınıza yanıt vermek ve müşteri desteği sağlamak",
              list3: "Web sitemizi ve uygulamamızı geliştirmek",
              list4:
                "Hizmetlerimiz hakkında güncellemeler göndermek (onayınızla)",
              list5: "Yasal yükümlülüklere uymak",
            },
            section4: {
              title: "4. Veri Güvenliği ve Gizlilik",
              highlightTitle: "🔒 Yerel İşleme Garantisi",
              highlightText:
                "AIris tüm finansal belgeleri cihazınızda yerel olarak işler. Hassas finansal verileriniz bilgisayarınızdan asla çıkmaz ve sunucularımıza veya üçüncü taraflara asla iletilmez.",
              subsection1: {
                title: "4.1 Güvenlik Önlemleri",
                text: "Bilgilerinizi korumak için uygun güvenlik önlemleri uygularız:",
                list1: "Herhangi bir veri iletimi için uçtan uca şifreleme",
                list2: "Güvenli veri depolama uygulamaları",
                list3: "Düzenli güvenlik denetimleri ve güncellemeler",
                list4: "Erişim kontrolleri ve kimlik doğrulama",
              },
              subsection2: {
                title: "4.2 Veri Saklama",
                text: "Web sitesi kullanım verilerini analitik amaçlarla 24 aya kadar saklarız. İletişim bilgileri, sorularınıza yanıt vermek veya sürekli destek sağlamak için gerekli olduğu sürece saklanır.",
              },
            },
            section5: {
              title: "5. Çerezler ve İzleme",
              para1:
                "Web sitemiz, tarama deneyiminizi geliştirmek için çerezler ve benzer izleme teknolojileri kullanabilir. Çerez ayarlarını tarayıcı tercihleriniz aracılığıyla kontrol edebilirsiniz.",
              para2:
                "Reklam veya diğer web sitelerinde izleme için çerez kullanmıyoruz.",
            },
            section6: {
              title: "6. Üçüncü Taraf Hizmetleri",
              text: "Web sitesi analitiği ve işlevselliği için üçüncü taraf hizmetleri kullanabiliriz. Bu hizmetlerin kendi gizlilik politikaları ve veri uygulamaları vardır. Kişisel bilgilerinizi bu politikada açıklandığı şekilde üçüncü taraflarla paylaşmıyoruz.",
            },
            section7: {
              title: "7. Haklarınız",
              text: "Konumunuza bağlı olarak aşağıdaki haklara sahip olabilirsiniz:",
              list1: "Kişisel bilgilerinize erişim",
              list2: "Yanlış bilgilerin düzeltilmesi",
              list3: "Kişisel bilgilerinizin silinmesi",
              list4: "Veri taşınabilirliği",
              list5: "İşlemeye itiraz",
              list6: "Onayın geri çekilmesi",
              note: "Bu hakları kullanmak için lütfen aşağıda verilen bilgileri kullanarak bizimle iletişime geçin.",
            },
            section8: {
              title: "8. Çocukların Gizliliği",
              text: "Hizmetlerimiz 13 yaşın altındaki çocuklar için tasarlanmamıştır. 13 yaşın altındaki çocuklardan bilerek kişisel bilgi toplamıyoruz. Ebeveyn veya vasi iseniz ve çocuğunuzun bize kişisel bilgi sağladığına inanıyorsanız, lütfen bizimle iletişime geçin.",
            },
            section9: {
              title: "9. Uluslararası Veri Transferleri",
              text: "Hizmetlerimize Amerika Birleşik Devletleri dışından erişiyorsanız, bilgilerinizin sunucularımızın bulunduğu Amerika Birleşik Devletleri'ne aktarılabileceğini, saklanabileceğini ve işlenebileceğini lütfen unutmayın.",
            },
            section10: {
              title: "10. Bu Gizlilik Politikasındaki Değişiklikler",
              para1:
                'Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikleri bu sayfaya yeni Gizlilik Politikasını yayınlayarak ve "Son güncelleme" tarihini güncelleyerek size bildireceğiz.',
              para2:
                "Herhangi bir değişiklik için bu Gizlilik Politikasını periyodik olarak incelemeniz önerilir.",
            },
          },
        },
      },
    };
  }
}

// Initialize language manager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Ensure DOM is fully loaded before initializing
  if (document.readyState === "loading") {
    return;
  }

  // Prevent multiple initializations
  if (window.languageManager) {
    console.warn("Language manager already initialized");
    return;
  }

  try {
    window.languageManager = new LanguageManager();
    console.log("Language manager initialized successfully");
  } catch (error) {
    console.error("Failed to initialize language manager:", error);
  }
});
