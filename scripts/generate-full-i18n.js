const fs = require('fs');

const additions = {
  en: {
    by: "by",
    Price: "Price",
    hero1Title: "Renzocart Great Indian Shopping Festival",
    hero1Subtitle: "India's Biggest Deals of the Season | Up to 75% Off",
    hero1Badge: "MEGA SAVINGS LIVE",
    hero2Title: "Flagship Smartphones & Pro Audio",
    hero2Subtitle: "iPhone 15, Galaxy S24 Ultra, Sony WH-1000XM5 & OnePlus 12",
    hero2Badge: "FLAGSHIP LAUNCHES",
    hero3Title: "High Performance Computing & Gaming",
    hero3Subtitle: "ASUS Zenbook OLED, Lenovo Legion RTX 4070 & Keychron Pro",
    hero3Badge: "PRO COMPUTING",
    hero4Title: "Revamp Your Home & Kitchen in Style",
    hero4Subtitle: "Philips Digital Air Fryers, Prestige Granite Sets & Wakefit Ortho",
    hero4Badge: "UP TO 60% OFF",
    tileElectronicsTitle: "Up to 70% off | Electronics & Audio",
    tileMobilesTitle: "Flagship Mobiles & Fast Chargers",
    tileFashionTitle: "Styles for Men & Women",
    tileHomeTitle: "Home, Kitchen & Essentials",
    shopMobiles: "Shop mobiles",
    exploreFashion: "Explore fashion",
    discoverHomeItems: "Discover home items",
    under1000: "Under ₹1,000",
    price1000To5000: "₹1,000 - ₹5,000",
    price5000To25000: "₹5,000 - ₹25,000",
    over25000: "Over ₹25,000",
    breadcrumbHome: "Home",
    secureTransaction: "Secure transaction",
    shipsFrom: "Ships from",
    soldBy: "Sold by",
    addToWishList: "Add to Wish List",
    customersAlsoViewed: "Customers who viewed this item also viewed",
    limitedTimeDeal: "Limited time deal",
    deliveryByTomorrow: "Delivery by Tomorrow",
    deliveryBy: "Delivery by",
    tomorrow: "Tomorrow",
    addedCheck: "✓ Added",
    pairItWith: "Pair it with:",
    viewProduct: "View product",
    emiAvailable: "EMI Available. Select eligible bank card at checkout.",
    secure256: "🔒 256-bit Secure",
    cardSubtitle: "Visa, Mastercard, RuPay, Maestro, American Express",
    upiSubtitle: "Instant payment with PhonePe, Google Pay, Paytm or Any UPI App",
    codSubtitle: "Pay with Cash or UPI scanner when courier delivers your package.",
    emptyCartNotice: "Please add items to your cart before proceeding to checkout.",
    shopProducts: "Shop Products",
    orderPlacedSuccess: "Order placed successfully, thank you!",
    orderPlacedEmailNotice: "Confirmation has been sent to your registered email.",
    ordersSubtitle: "View real-time shipment tracking, initiate returns, or re-order past purchases.",
    searchOrdersPlaceholder: "Search all orders or products...",
    noPurchasesToBuyAgain: "No previous purchases found to buy again.",
    startShopping: "Start Shopping",
    reorderFavorites: "Re-order past favorites with 1-click add to cart.",
    purchasedOn: "Purchased on",
    itemsCount: "{count} items",
    orderNumberLabel: "Order #",
    shipTo: "Ship To",
    viewOrPrintInvoice: "View or Print Invoice",
    productsOnOffer: "Product on Offer",
    dealPrice: "Deal Price",
    dealDates: "Dates (Start - End)",
    dealStockLabel: "Deal Stock",
    dealStatus: "Status",
    dealActions: "Actions",
    activeLive: "Active Live",
    scheduled: "Scheduled",
    expired: "Expired",
    disabled: "Disabled",
    addProductToDeals: "+ Add Product to Today's Deals",
    soldCountText: "{count} sold",
    dealsDesc: "Only authorized administrators can add, configure discount percentages, manage stock, and schedule deals.",
    customerAccount: "Customer Account",
    welcomeBackUser: "Welcome back, {name}",
    yourAccountTitle: "Your Renzocart Account",
    accountSubtitle: "Manage your orders, profile preferences, and security settings.",
    signInToAccount: "Sign In to Your Account",
    ordersCardDesc: "Track, return, buy again, or download invoices.",
    trackCardDesc: "Check live status, AWB, and estimated arrival.",
    helpCardDesc: "Instant solutions, shipping guides, return terms.",
    contactCardDesc: "24x7 customer support via email and phone.",
    defaultAddress: "Default Address",
    fastDeliveryHub: "Fast Delivery Hub",
    aboutHeroTitle: "Empowering Seamless Shopping for Millions Across India",
    aboutHeroDesc: "Welcome to Renzocart. Born from a vision to provide authentic products, transparent pricing, and lightning-fast logistics.",
    genuineBadge: "100% Genuine",
    genuineDesc: "Direct brand partnerships ensure verified serials, warranties, and tamper-evident packaging.",
    nextDayDelivery: "Next-Day Delivery",
    nextDayDesc: "State-of-the-art fulfillment centers serving 19,000+ PIN codes with automated dispatching.",
    hassleFreeReturns: "Hassle-Free Returns",
    returnsDesc: "Transparent 7-day doorstep pickup and instant refund processing via secure UPI & card gateways.",
    ourCommitment: "Our Core Commitment",
    commitmentDesc: "At Renzocart, customer obsession is not just a motto; it is how we engineer our product search, secure checkout, and logistics pipelines.",
    exploreCatalog: "Explore Catalog",
    locationSelectDesc: "Select your delivery destination to view live product availability, shipping speeds, and local discounts.",
    country: "Country",
    stateLabel: "State",
    cityLabel: "City / District",
    pincodeLabel: "6-Digit Indian PIN Code",
    applyLocation: "Apply Location",
    resetLocation: "Reset to Default (Chennai 600001)",
    detectingHub: "Detecting nearest hub...",
    verifyingCredentials: "Verifying credentials…",
    autofillAdmin: "Autofill Admin",
    demoAdminLabel: "Demo Admin:",
    passwordFieldLabel: "Password:",
    reenterPasswordPlaceholder: "Re-enter password",
    namePlaceholder: "First and last name"
  },
  ta: {
    by: "வழங்கியவர்",
    Price: "விலை",
    hero1Title: "ரென்சோகார்ட் கிரேட் இந்தியன் ஷாப்பிங் திருவிழா",
    hero1Subtitle: "சீசனின் மிகப்பெரிய டீல்கள் | 75% வரை தள்ளுபடி",
    hero1Badge: "மெகா சேமிப்பு நேரலை",
    hero2Title: "ஃபிளாக்ஷிப் ஸ்மார்ட்போன்கள் & ப்ரோ ஆடியோ",
    hero2Subtitle: "ஐபோன் 15, கேலக்ஸி S24 அல்ட்ரா, சோனி WH-1000XM5 & ஒன்பிளஸ் 12",
    hero2Badge: "ஃபிளாக்ஷிப் அறிமுகங்கள்",
    hero3Title: "உயர் செயல்திறன் கம்ப்யூட்டிங் & கேமிங்",
    hero3Subtitle: "ஆசஸ் ஜென்புக் OLED, லெனோவா லீஜியன் RTX 4070 & கீக்ரான் ப்ரோ",
    hero3Badge: "ப்ரோ கம்ப்யூட்டிங்",
    hero4Title: "உங்கள் வீடு மற்றும் சமையலறையை புதுப்பியுங்கள்",
    hero4Subtitle: "பிலிப்ஸ் டிஜிட்டல் ஏர் பிரையர், பிரஸ்டீஜ் கிரானைட் செட்",
    hero4Badge: "60% வரை தள்ளுபடி",
    tileElectronicsTitle: "70% வரை தள்ளுபடி | எலக்ட்ரானிக்ஸ் & ஆடியோ",
    tileMobilesTitle: "ஃபிளாக்ஷிப் மொபைல்கள் & வேகமான சார்ஜர்கள்",
    tileFashionTitle: "ஆண்கள் & பெண்களுக்கான ஸ்டைல்கள்",
    tileHomeTitle: "வீடு, சமையலறை & அத்தியாவசிய பொருட்கள்",
    shopMobiles: "மொபைல்களைப் பார்க்கவும்",
    exploreFashion: "ஃபேஷனை ஆராயவும்",
    discoverHomeItems: "வீட்டுப் பொருட்களைக் கண்டறியவும்",
    under1000: "₹1,000க்கு கீழ்",
    price1000To5000: "₹1,000 - ₹5,000",
    price5000To25000: "₹5,000 - ₹25,000",
    over25000: "₹25,000க்கு மேல்",
    breadcrumbHome: "முகப்பு",
    secureTransaction: "பாதுகாப்பான பரிவர்த்தனை",
    shipsFrom: "அனுப்புபவர்",
    soldBy: "விற்பனையாளர்",
    addToWishList: "விருப்பப்பட்டியலில் சேர்க்கவும்",
    customersAlsoViewed: "இந்த பொருளைப் பார்த்த வாடிக்கையாளர்கள் இதையும் பார்த்துள்ளனர்",
    limitedTimeDeal: "வரையறுக்கப்பட்ட நேர சலுகை",
    deliveryByTomorrow: "நாளைக்குள் டெலிவரி",
    deliveryBy: "டெலிவரி நாள்",
    tomorrow: "நாளை",
    addedCheck: "✓ சேர்க்கப்பட்டது",
    pairItWith: "இணைத்து வாங்கவும்:",
    viewProduct: "தயாரிப்பைப் பார்க்கவும்",
    emiAvailable: "இஎம்ஐ வசதி உள்ளது. பணம் செலுத்தும் போது தகுதியான கார்டைத் தேர்ந்தெடுக்கவும்.",
    secure256: "🔒 256-பிட் பாதுகாப்பானது",
    cardSubtitle: "விசா, மாஸ்டர்கார்டு, ரூபே, மேஸ்ட்ரோ, அமெரிக்கன் எக்ஸ்பிரஸ்",
    upiSubtitle: "PhonePe, Google Pay, Paytm அல்லது ஏதேனும் UPI ஆப் மூலம் உடனடி கட்டணம்",
    codSubtitle: "டெலிவரி செய்யும் போது பணம் அல்லது UPI ஸ்கேனர் மூலம் செலுத்தலாம்.",
    emptyCartNotice: "செக் அவுட் செய்வதற்கு முன் உங்கள் கார்ட்டில் பொருட்களைச் சேர்க்கவும்.",
    shopProducts: "பொருட்களை வாங்கவும்",
    orderPlacedSuccess: "ஆர்டர் வெற்றிகரமாக பதிவு செய்யப்பட்டது, நன்றி!",
    orderPlacedEmailNotice: "உங்கள் பதிவுசெய்யப்பட்ட மின்னஞ்சலுக்கு உறுதிப்படுத்தல் அனுப்பப்பட்டுள்ளது.",
    ordersSubtitle: "நேரலை கண்காணிப்பைப் பார்க்கவும், ரிட்டர்ன்களைத் தொடங்கவும், அல்லது மீண்டும் வாங்கவும்.",
    searchOrdersPlaceholder: "அனைத்து ஆர்டர்கள் அல்லது தயாரிப்புகளைத் தேடுங்கள்...",
    noPurchasesToBuyAgain: "மீண்டும் வாங்குவதற்கு முந்தைய ஆர்டர்கள் எதுவும் இல்லை.",
    startShopping: "ஷாப்பிங்கைத் தொடங்குங்கள்",
    reorderFavorites: "1-கிளிக் மூலம் கார்ட்டில் சேர்த்து மீண்டும் ஆர்டர் செய்யுங்கள்.",
    purchasedOn: "வாங்கப்பட்ட தேதி",
    itemsCount: "{count} பொருட்கள்",
    orderNumberLabel: "ஆர்டர் எண் #",
    shipTo: "டெலிவரி முகவரி",
    viewOrPrintInvoice: "விலைப்பட்டியலை பார்க்க அல்லது அச்சிட",
    productsOnOffer: "சலுகையில் உள்ள தயாரிப்பு",
    dealPrice: "சலுகை விலை",
    dealDates: "தேதிகள் (தொடக்கம் - முடிவு)",
    dealStockLabel: "சலுகை இருப்பு",
    dealStatus: "நிலை",
    dealActions: "செயல்கள்",
    activeLive: "செயலில் உள்ளது",
    scheduled: "திட்டமிடப்பட்டது",
    expired: "காலாவதியானது",
    disabled: "முடக்கப்பட்டது",
    addProductToDeals: "+ இன்றைய டீல்களில் தயாரிப்பைச் சேர்க்கவும்",
    soldCountText: "{count} விற்கப்பட்டது",
    dealsDesc: "அங்கீகரிக்கப்பட்ட நிர்வாகிகள் மட்டுமே தள்ளுபடி சதவிகிதங்களை உள்ளமைக்கலாம், இருப்பை நிர்வகிக்கலாம் மற்றும் டீல்களை திட்டமிடலாம்.",
    customerAccount: "வாடிக்கையாளர் கணக்கு",
    welcomeBackUser: "மீண்டும் வருக, {name}",
    yourAccountTitle: "உங்கள் ரென்சோகார்ட் கணக்கு",
    accountSubtitle: "உங்கள் ஆர்டர்கள், சுயவிவர விருப்பங்கள் மற்றும் பாதுகாப்பு அமைப்புகளை நிர்வகிக்கவும்.",
    signInToAccount: "உங்கள் கணக்கில் உள்நுழையவும்",
    ordersCardDesc: "கண்காணிக்கவும், திரும்பப் பெறவும், மீண்டும் வாங்கவும் அல்லது இன்வாய்ஸ்களைப் பதிவிறக்கவும்.",
    trackCardDesc: "நேரலை நிலை, AWB மற்றும் எதிர்பார்க்கப்படும் வருகையை சரிபார்க்கவும்.",
    helpCardDesc: "உடனடி தீர்வுகள், ஷிப்பிங் வழிகாட்டிகள், திரும்பப் பெறும் விதிமுறைகள்.",
    contactCardDesc: "மின்னஞ்சல் மற்றும் தொலைபேசி மூலம் 24x7 வாடிக்கையாளர் ஆதரவு.",
    defaultAddress: "இயல்புநிலை முகவரி",
    fastDeliveryHub: "வேகமான டெலிவரி மையம்",
    aboutHeroTitle: "இந்தியா முழுவதும் மில்லியன் கணக்கான மக்களுக்கான ஷாப்பிங்",
    aboutHeroDesc: "ரென்சோகார்ட்டிற்கு வரவேற்கிறோம். அசல் தயாரிப்புகள், வெளிப்படையான விலை மற்றும் அதிவேக டெலிவரியை வழங்க உருவாக்கப்பட்ட தளம்.",
    genuineBadge: "100% அசல்",
    genuineDesc: "நேரடி பிராண்ட் கூட்டாண்மை மூலம் சரிபார்க்கப்பட்ட உத்தரவாதம் மற்றும் பாதுகாப்பான பேக்கிங்.",
    nextDayDelivery: "அடுத்த நாள் டெலிவரி",
    nextDayDesc: "19,000க்கும் மேற்பட்ட பின்கோடுகளில் அடுத்த நாள் டெலிவரி சேவை.",
    hassleFreeReturns: "எளிதான ரிட்டர்ன்ஸ்",
    returnsDesc: "7-நாள் வீட்டு வாசலில் பிக்கப் மற்றும் UPI/கார்டுகளுக்கு உடனடி ரீஃபண்ட்.",
    ourCommitment: "எங்கள் முக்கிய உறுதிப்பாடு",
    commitmentDesc: "ரென்சோகார்ட்டில், வாடிக்கையாளர் திருப்தி என்பது ஒரு முழக்கம் மட்டுமல்ல; அதுவே எங்கள் ஒவ்வொரு சேவையின் அடித்தளம்.",
    exploreCatalog: "பொருட்களை ஆராயுங்கள்",
    locationSelectDesc: "லைவ் தயாரிப்பு இருப்பு, ஷிப்பிங் வேகம் மற்றும் உள்ளூர் தள்ளுபடிகளைக் காண உங்கள் டெலிவரி இடத்தை தேர்ந்தெடுக்கவும்.",
    country: "நாடு",
    stateLabel: "மாநிலம்",
    cityLabel: "நகரம் / மாவட்டம்",
    pincodeLabel: "6-இலக்க இந்திய பின்கோடு",
    applyLocation: "இருப்பிடத்தைப் பயன்படுத்துங்கள்",
    resetLocation: "இயல்புநிலைக்கு மீட்டமைக்கவும் (சென்னை 600001)",
    detectingHub: "அருகிலுள்ள மையம் கண்டறியப்படுகிறது...",
    verifyingCredentials: "சான்றுகள் சரிபார்க்கப்படுகின்றன…",
    autofillAdmin: "நிர்வாகி தானியங்கு நிரப்பு",
    demoAdminLabel: "டெமோ நிர்வாகி:",
    passwordFieldLabel: "கடவுச்சொல்:",
    reenterPasswordPlaceholder: "கடவுச்சொல்லை மீண்டும் உள்ளிடவும்",
    namePlaceholder: "முதல் மற்றும் கடைசி பெயர்"
  },
  hi: {
    by: "द्वारा",
    Price: "कीमत",
    hero1Title: "रेन्ज़ोकार्ट ग्रेट इंडियन शॉपिंग फेस्टिवल",
    hero1Subtitle: "सीजन के सबसे बड़े डील्स | 75% तक छूट",
    hero1Badge: "मेगा बचत लाइव",
    hero2Title: "फ्लैगशिप स्मार्टफोन्स और प्रो ऑडियो",
    hero2Subtitle: "आईफोन 15, गैलेक्सी S24 अल्ट्रा, सोनी WH-1000XM5 और वनप्लस 12",
    hero2Badge: "फ्लैगशिप लॉन्च",
    hero3Title: "हाई परफॉर्मेंस कंप्यूटिंग और गेमिंग",
    hero3Subtitle: "एसस ज़ेनबुक OLED, लेनोवो लीजन RTX 4070 और कीक्रॉन प्रो",
    hero3Badge: "प्रो कंप्यूटिंग",
    hero4Title: "अपने घर और किचन को दें नया अंदाज",
    hero4Subtitle: "फिलिप्स डिजिटल एयर फ्रायर्स, प्रेस्टीज ग्रेनाइट सेट्स",
    hero4Badge: "60% तक छूट",
    tileElectronicsTitle: "70% तक छूट | इलेक्ट्रॉनिक्स और ऑडियो",
    tileMobilesTitle: "फ्लैगशिप मोबाइल्स और फास्ट चार्जर्स",
    tileFashionTitle: "पुरुषों और महिलाओं के लिए फैशन",
    tileHomeTitle: "घर, किचन और आवश्यक वस्तुएं",
    shopMobiles: "मोबाइल खरीदें",
    exploreFashion: "फैशन देखें",
    discoverHomeItems: "घरेलू सामान देखें",
    under1000: "₹1,000 से कम",
    price1000To5000: "₹1,000 - ₹5,000",
    price5000To25000: "₹5,000 - ₹25,000",
    over25000: "₹25,000 से अधिक",
    breadcrumbHome: "होम",
    secureTransaction: "सुरक्षित लेनदेन",
    shipsFrom: "भेजने वाला",
    soldBy: "विक्रेता",
    addToWishList: "विशलिस्ट में जोड़ें",
    customersAlsoViewed: "इस आइटम को देखने वाले ग्राहकों ने यह भी देखा",
    limitedTimeDeal: "सीमित समय का ऑफर",
    deliveryByTomorrow: "कल तक डिलीवरी",
    deliveryBy: "डिलीवरी",
    tomorrow: "कल",
    addedCheck: "✓ जोड़ा गया",
    pairItWith: "इसके साथ खरीदें:",
    viewProduct: "उत्पाद देखें",
    emiAvailable: "ईएमआई उपलब्ध है। चेकआउट पर पात्र बैंक कार्ड चुनें।",
    secure256: "🔒 256-बिट सुरक्षित",
    cardSubtitle: "वीज़ा, मास्टरकार्ड, रुपे, मेस्ट्रो, अमेरिकन एक्सप्रेस",
    upiSubtitle: "PhonePe, Google Pay, Paytm या किसी भी UPI ऐप से तत्काल भुगतान",
    codSubtitle: "कूरियर द्वारा पैकेज डिलीवर करने पर नकद या UPI स्कैनर से भुगतान करें।",
    emptyCartNotice: "चेकआउट करने से पहले कृपया अपने कार्ट में सामान जोड़ें।",
    shopProducts: "उत्पाद खरीदें",
    orderPlacedSuccess: "ऑर्डर सफलतापूर्वक दिया गया, धन्यवाद!",
    orderPlacedEmailNotice: "आपके पंजीकृत ईमेल पर पुष्टि भेज दी गई है।",
    ordersSubtitle: "रियल-टाइम शिपमेंट ट्रैकिंग देखें, रिटर्न शुरू करें, या पिछली खरीदारी फिर से करें।",
    searchOrdersPlaceholder: "सभी ऑर्डर या उत्पाद खोजें...",
    noPurchasesToBuyAgain: "फिर से खरीदने के लिए कोई पिछली खरीदारी नहीं मिली।",
    startShopping: "खरीदारी शुरू करें",
    reorderFavorites: "1-क्लिक में कार्ट में जोड़कर पसंदीदा सामान फिर से ऑर्डर करें।",
    purchasedOn: "खरीदा गया",
    itemsCount: "{count} आइटम",
    orderNumberLabel: "ऑर्डर #",
    shipTo: "शिपिंग पता",
    viewOrPrintInvoice: "इनवॉइस देखें या प्रिंट करें",
    productsOnOffer: "ऑफर पर उत्पाद",
    dealPrice: "डील मूल्य",
    dealDates: "तिथियां (शुरुआत - अंत)",
    dealStockLabel: "डील स्टॉक",
    dealStatus: "स्थिति",
    dealActions: "कार्रवाई",
    activeLive: "सक्रिय लाइव",
    scheduled: "शेड्यूल किया गया",
    expired: "समाप्त",
    disabled: "अक्षम",
    addProductToDeals: "+ आज के डील्स में उत्पाद जोड़ें",
    soldCountText: "{count} बिके",
    dealsDesc: "केवल अधिकृत प्रशासक ही छूट प्रतिशत कॉन्फ़िगर कर सकते हैं, स्टॉक प्रबंधित कर सकते हैं और डील्स शेड्यूल कर सकते हैं।",
    customerAccount: "ग्राहक खाता",
    welcomeBackUser: "वापसी पर स्वागत है, {name}",
    yourAccountTitle: "आपका रेन्ज़ोकार्ट खाता",
    accountSubtitle: "अपने ऑर्डर, प्रोफ़ाइल प्राथमिकताओं और सुरक्षा सेटिंग्स को प्रबंधित करें।",
    signInToAccount: "अपने खाते में साइन इन करें",
    ordersCardDesc: "ट्रैक करें, वापस करें, फिर से खरीदें, या इनवॉइस डाउनलोड करें।",
    trackCardDesc: "लाइव स्थिति, AWB और आगमन समय जांचें।",
    helpCardDesc: "त्वरित समाधान, शिपिंग गाइड, रिटर्न की शर्तें।",
    contactCardDesc: "ईमेल और फोन के माध्यम से 24x7 ग्राहक सहायता।",
    defaultAddress: "डिफ़ॉल्ट पता",
    fastDeliveryHub: "फास्ट डिलीवरी हब",
    aboutHeroTitle: "भारत भर में लाखों लोगों के लिए निर्बाध खरीदारी",
    aboutHeroDesc: "रेन्ज़ोकार्ट में आपका स्वागत है। प्रामाणिक उत्पाद, पारदर्शी मूल्य निर्धारण और सुपरफास्ट डिलीवरी प्रदान करने के विज़न से निर्मित।",
    genuineBadge: "100% असली",
    genuineDesc: "सीधी ब्रांड साझेदारी सत्यापित वारंटी और सुरक्षित पैकेजिंग सुनिश्चित करती है।",
    nextDayDelivery: "अगले दिन डिलीवरी",
    nextDayDesc: "19,000 से अधिक पिन कोड्स पर अत्याधुनिक केंद्रों से सुपरफास्ट डिलीवरी।",
    hassleFreeReturns: "आसान रिटर्न",
    returnsDesc: "पारदर्शी 7-दिन डोरस्टेप पिकअप और यूपीआई व कार्ड पर त्वरित रिफंड।",
    ourCommitment: "हमारी मुख्य प्रतिबद्धता",
    commitmentDesc: "रेन्ज़ोकार्ट में, ग्राहक संतुष्टि केवल एक नारा नहीं है; यह हमारी कार्यशैली की नींव है।",
    exploreCatalog: "कैटलॉग देखें",
    locationSelectDesc: "लाइव उत्पाद उपलब्धता, शिपिंग गति और स्थानीय छूट देखने के लिए अपना डिलीवरी गंतव्य चुनें।",
    country: "देश",
    stateLabel: "राज्य",
    cityLabel: "शहर / जिला",
    pincodeLabel: "6-अंकीय भारतीय पिन कोड",
    applyLocation: "स्थान लागू करें",
    resetLocation: "डिफ़ॉल्ट पर रीसेट करें (चेन्नई 600001)",
    detectingHub: "निकटतम हब का पता लगाया जा रहा है...",
    verifyingCredentials: "साख सत्यापित की जा रही है…",
    autofillAdmin: "व्यवस्थापक ऑटोफिल",
    demoAdminLabel: "डेमो एडमिन:",
    passwordFieldLabel: "पासवर्ड:",
    reenterPasswordPlaceholder: "पासवर्ड दोबारा दर्ज करें",
    namePlaceholder: "पहला और आखिरी नाम"
  },
  ml: {
    by: "വഴി",
    Price: "വില",
    hero1Title: "റെൻസോകാർട്ട് ഗ്രേറ്റ് ഇന്ത്യൻ ഷോപ്പിംഗ് ഫെസ്റ്റിവൽ",
    hero1Subtitle: "സീസണിലെ ഏറ്റവും വലിയ ഡീലുകൾ | 75% വരെ കിഴിവ്",
    hero1Badge: "മെഗാ സേവിംഗ്സ് ലൈവ്",
    hero2Title: "ഫ്ലാഗ്ഷിപ്പ് സ്മാർട്ട്ഫോണുകളും പ്രോ ഓഡിയോയും",
    hero2Subtitle: "ഐഫോൺ 15, ഗാലക്സി S24 അൾട്രാ, സോണി WH-1000XM5 & വൺപ്ലസ് 12",
    hero2Badge: "ഫ്ലാഗ്ഷിപ്പ് ലോഞ്ചുകൾ",
    hero3Title: "ഉയർന്ന പ്രകടനമുള്ള കമ്പ്യൂട്ടിംഗും ഗെയിമിംഗും",
    hero3Subtitle: "ആസൂസ് സെൻബുക്ക് OLED, ലെനോവോ ലെജിയൻ RTX 4070 & കീക്രോൺ പ്രോ",
    hero3Badge: "പ്രോ കമ്പ്യൂട്ടിംഗ്",
    hero4Title: "നിങ്ങളുടെ വീടും അടുക്കളയും പുനർനിർമ്മിക്കുക",
    hero4Subtitle: "ഫിലിപ്സ് ഡിജിറ്റൽ എയർ ഫ്രയർ, പ്രസ്റ്റീജ് ഗ്രാനൈറ്റ് സെറ്റുകൾ",
    hero4Badge: "60% വരെ കിഴിവ്",
    tileElectronicsTitle: "70% വരെ കിഴിവ് | ഇലക്ട്രോണിക്സ് & ഓഡിയോ",
    tileMobilesTitle: "ഫ്ലാഗ്ഷിപ്പ് മൊബൈലുകളും ഫാസ്റ്റ് ചാർജറുകളും",
    tileFashionTitle: "പുരുഷന്മാർക്കും സ്ത്രീകൾക്കുമുള്ള ഫാഷൻ",
    tileHomeTitle: "വീട്, അടുക്കള & അവശ്യവസ്തുക്കൾ",
    shopMobiles: "മൊബൈലുകൾ വാങ്ങുക",
    exploreFashion: "ഫാഷൻ പര്യവേക്ഷണം ചെയ്യുക",
    discoverHomeItems: "വീട്ടുപകരണങ്ങൾ കണ്ടെത്തുക",
    under1000: "₹1,000-ൽ താഴെ",
    price1000To5000: "₹1,000 - ₹5,000",
    price5000To25000: "₹5,000 - ₹25,000",
    over25000: "₹25,000-ന് മുകളിൽ",
    breadcrumbHome: "ഹോം",
    secureTransaction: "സുരക്ഷിതമായ ഇടപാട്",
    shipsFrom: "ഷിപ്പ് ചെയ്യുന്നത്",
    soldBy: "വിൽപ്പനക്കാരൻ",
    addToWishList: "വിഷ്‌ലിസ്റ്റിൽ ചേർക്കുക",
    customersAlsoViewed: "ഈ ഇനം കണ്ട ഉപഭോക്താക്കൾ ഇതും കണ്ടു",
    limitedTimeDeal: "പരിമിത സമയ ഡീൽ",
    deliveryByTomorrow: "നാളെ ഡെലിവറി",
    deliveryBy: "ഡെലിവറി",
    tomorrow: "നാളെ",
    addedCheck: "✓ ചേർത്തു",
    pairItWith: "ഇതിനൊപ്പം വാങ്ങുക:",
    viewProduct: "ഉൽപ്പന്നം കാണുക",
    emiAvailable: "ഇഎംഐ ലഭ്യമാണ്. ചെക്ക്ഔട്ടിൽ യോഗ്യമായ ബാങ്ക് കാർഡ് തിരഞ്ഞെടുക്കുക.",
    secure256: "🔒 256-ബിറ്റ് സുരക്ഷിതം",
    cardSubtitle: "വിസ, മാസ്റ്റർകാർഡ്, റൂപേ, മാസ്ട്രോ, അമേരിക്കൻ എക്സ്പ്രസ്",
    upiSubtitle: "PhonePe, Google Pay, Paytm അല്ലെങ്കിൽ ഏതെങ്കിലും UPI ആപ്പ് വഴി തൽക്ഷണ പേയ്‌മെന്റ്",
    codSubtitle: "കൊറിയർ പാക്കേജ് ഡെലിവറി ചെയ്യുമ്പോൾ പണമായോ UPI സ്കാനർ വഴിയോ നൽകുക.",
    emptyCartNotice: "ചെക്ക്ഔട്ട് ചെയ്യുന്നതിന് മുമ്പ് ദയവായി നിങ്ങളുടെ കാർട്ടിലേക്ക് ഇനങ്ങൾ ചേർക്കുക.",
    shopProducts: "ഉൽപ്പന്നങ്ങൾ വാങ്ങുക",
    orderPlacedSuccess: "ഓർഡർ വിജയകരമായി നൽകി, നന്ദി!",
    orderPlacedEmailNotice: "നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത ഇമെയിലിലേക്ക് സ്ഥിരീകരണം അയച്ചിട്ടുണ്ട്.",
    ordersSubtitle: "തത്സമയ ഷിപ്പ്‌മെന്റ് ട്രാക്കിംഗ് കാണുക, റിട്ടേൺ ആരംഭിക്കുക, അല്ലെങ്കിൽ പഴയ വാങ്ങലുകൾ വീണ്ടും ഓർഡർ ചെയ്യുക.",
    searchOrdersPlaceholder: "എല്ലാ ഓർഡറുകളും ഉൽപ്പന്നങ്ങളും തിരയുക...",
    noPurchasesToBuyAgain: "വീണ്ടും വാങ്ങാൻ മുൻ വാങ്ങലുകളൊന്നും കണ്ടെത്തിയില്ല.",
    startShopping: "ഷോപ്പിംഗ് ആരംഭിക്കുക",
    reorderFavorites: "1-ക്ലിക്കിൽ കാർട്ടിലേക്ക് ചേർത്ത് പ്രിയപ്പെട്ടവ വീണ്ടും ഓർഡർ ചെയ്യുക.",
    purchasedOn: "വാങ്ങിയ തീയതി",
    itemsCount: "{count} ഇനങ്ങൾ",
    orderNumberLabel: "ഓർഡർ #",
    shipTo: "ഡെലിവറി വിലാസം",
    viewOrPrintInvoice: "ഇൻവോയ്സ് കാണുക അല്ലെങ്കിൽ പ്രിന്റ് ചെയ്യുക",
    productsOnOffer: "ഓഫറിലുള്ള ഉൽപ്പന്നം",
    dealPrice: "ഡീൽ വില",
    dealDates: "തീയതികൾ (ആരംഭം - അവസാനം)",
    dealStockLabel: "ഡീൽ സ്റ്റോക്ക്",
    dealStatus: "സ്റ്റാറ്റസ്",
    dealActions: "നടപടികൾ",
    activeLive: "സജീവം",
    scheduled: "ഷെഡ്യൂൾ ചെയ്തത്",
    expired: "കാലഹരണപ്പെട്ടു",
    disabled: "പ്രവർത്തനരഹിതം",
    addProductToDeals: "+ ഇന്നത്തെ ഡീലുകളിലേക്ക് ഉൽപ്പന്നം ചേർക്കുക",
    soldCountText: "{count} വിറ്റു",
    dealsDesc: "അധികാരപ്പെടുത്തിയ അഡ്മിനിസ്ട്രേറ്റർമാർക്ക് മാത്രമേ കിഴിവ് ശതമാനം ക്രമീകരിക്കാനും സ്റ്റോക്ക് കൈകാര്യം ചെയ്യാനും ഡീലുകൾ ഷെഡ്യൂൾ ചെയ്യാനും കഴിയൂ.",
    customerAccount: "ഉപഭോക്തൃ അക്കൗണ്ട്",
    welcomeBackUser: "വീണ്ടും സ്വാഗതം, {name}",
    yourAccountTitle: "നിങ്ങളുടെ റെൻസോകാർട്ട് അക്കൗണ്ട്",
    accountSubtitle: "നിങ്ങളുടെ ഓർഡറുകൾ, പ്രൊഫൈൽ മുൻഗണനകൾ, സുരക്ഷാ ക്രമീകരണങ്ങൾ എന്നിവ കൈകാര്യം ചെയ്യുക.",
    signInToAccount: "നിങ്ങളുടെ അക്കൗണ്ടിൽ സൈൻ ഇൻ ചെയ്യുക",
    ordersCardDesc: "ട്രാക്ക് ചെയ്യുക, റിട്ടേൺ ചെയ്യുക, വീണ്ടും വാങ്ങുക, ഇൻവോയ്സ് ഡൗൺലോഡ് ചെയ്യുക.",
    trackCardDesc: "തത്സമയ സ്റ്റാറ്റസ്, AWB, കണക്കാക്കിയ വരവ് എന്നിവ പരിശോധിക്കുക.",
    helpCardDesc: "തൽക്ഷണ പരിഹാരങ്ങൾ, ഷിപ്പിംഗ് ഗൈഡുകൾ, റിട്ടേൺ നിബന്ധനകൾ.",
    contactCardDesc: "ഇമെയിലും ഫോണും വഴി 24x7 ഉപഭോക്തൃ പിന്തുണ.",
    defaultAddress: "സ്ഥിരസ്ഥിതി വിലാസം",
    fastDeliveryHub: "ഫാസ്റ്റ് ഡെലിവറി ഹബ്",
    aboutHeroTitle: "ഇന്ത്യയിലുടനീളമുള്ള ദശലക്ഷക്കണക്കിന് ആളുകൾക്ക് തടസ്സമില്ലാത്ത ഷോപ്പിംഗ്",
    aboutHeroDesc: "റെൻസോകാർട്ടിലേക്ക് സ്വാഗതം. ഒറിജിനൽ ഉൽപ്പന്നങ്ങളും സുതാര്യമായ വിലയും അതിവേഗ ഡെലിവറിയും നൽകുന്ന പ്ലാറ്റ്ഫോം.",
    genuineBadge: "100% ഒറിജിനൽ",
    genuineDesc: "നേരിട്ടുള്ള ബ്രാൻഡ് പങ്കാളിത്തം പരിശോധിച്ച വാറണ്ടിയും സുരക്ഷിതമായ പാക്കേജിംഗും ഉറപ്പാക്കുന്നു.",
    nextDayDelivery: "അടുത്ത ദിവസത്തെ ഡെലിവറി",
    nextDayDesc: "19,000+ പിൻകോഡുകളിൽ അത്യാധുനിക കേന്ദ്രങ്ങളിലൂടെ അടുത്ത ദിവസത്തെ ഡെലിവറി.",
    hassleFreeReturns: "തടസ്സമില്ലാത്ത റിട്ടേൺസ്",
    returnsDesc: "സുതാര്യമായ 7 ദിവസത്തെ ഡോർസ്റ്റെപ്പ് പിക്കപ്പും തൽക്ഷണ റീഫണ്ടും.",
    ourCommitment: "ഞങ്ങളുടെ പ്രധാന പ്രതിബദ്ധത",
    commitmentDesc: "റെൻസോകാർട്ടിൽ, ഉപഭോക്തൃ സംതൃപ്തി ഒരു മുദ്രാവാക്യം മാത്രമല്ല; ഞങ്ങളുടെ പ്രവർത്തനങ്ങളുടെ അടിസ്ഥാനമാണത്.",
    exploreCatalog: "കാറ്റലോഗ് കാണുക",
    locationSelectDesc: "തത്സമയ ഉൽപ്പന്ന ലഭ്യത, ഷിപ്പിംഗ് വേഗത, പ്രാദേശിക കിഴിവുകൾ എന്നിവ കാണുന്നതിന് നിങ്ങളുടെ ഡെലിവറി സ്ഥലം തിരഞ്ഞെടുക്കുക.",
    country: "രാജ്യം",
    stateLabel: "സംസ്ഥാനം",
    cityLabel: "നഗരം / ജില്ല",
    pincodeLabel: "6-അക്ക ഇന്ത്യൻ പിൻ കോഡ്",
    applyLocation: "ലൊക്കേഷൻ പ്രയോഗിക്കുക",
    resetLocation: "സ്ഥിരസ്ഥിതിയിലേക്ക് പുനഃസജ്ജമാക്കുക (ചെന്നൈ 600001)",
    detectingHub: "ഏറ്റവും അടുത്തുള്ള ഹബ് കണ്ടെത്തുന്നു...",
    verifyingCredentials: "വിവരങ്ങൾ പരിശോധിക്കുന്നു…",
    autofillAdmin: "അഡ്മിൻ ഓട്ടോഫിൽ",
    demoAdminLabel: "ഡെമോ അഡ്മിൻ:",
    passwordFieldLabel: "പാസ്‌വേഡ്:",
    reenterPasswordPlaceholder: "പാസ്‌വേഡ് വീണ്ടും നൽകുക",
    namePlaceholder: "ആദ്യ പേരും അവസാന പേരും"
  },
  kn: {
    by: "ಮೂಲಕ",
    Price: "ಬೆಲೆ",
    hero1Title: "ರೆಂಜೋಕಾರ್ಟ್ ಗ್ರೇಟ್ ಇಂಡಿಯನ್ ಶಾಪಿಂಗ್ ಫೆಸ್ಟಿವಲ್",
    hero1Subtitle: "ಸೀಸನ್‌ನ ಅತಿ ದೊಡ್ಡ ಡೀಲ್‌ಗಳು | 75% ವರೆಗೆ ರಿಯಾಯಿತಿ",
    hero1Badge: "ಮೆಗಾ ಉಳಿತಾಯ ಲೈವ್",
    hero2Title: "ಫ್ಲ್ಯಾಗ್ಶಿಪ್ ಸ್ಮಾರ್ಟ್‌ಫೋನ್‌ಗಳು ಮತ್ತು ಪ್ರೊ ಆಡಿಯೋ",
    hero2Subtitle: "ಐಫೋನ್ 15, ಗ್ಯಾಲಕ್ಸಿ S24 ಅಲ್ಟ್ರಾ, ಸೋನಿ WH-1000XM5 & ಒನ್‌ಪ್ಲಸ್ 12",
    hero2Badge: "ಫ್ಲ್ಯಾಗ್ಶಿಪ್ ಬಿಡುಗಡೆಗಳು",
    hero3Title: "ಹೈ ಪರ್ಫಾರ್ಮೆನ್ಸ್ ಕಂಪ್ಯೂಟಿಂಗ್ ಮತ್ತು ಗೇಮಿಂಗ್",
    hero3Subtitle: "ಆಸುಸ್ ಝೆನ್‌ಬುಕ್ OLED, ಲೆನೊವೊ ಲೀಜಿಯನ್ RTX 4070 & ಕೀಕ್ರೋನ್ ಪ್ರೊ",
    hero3Badge: "ಪ್ರೊ ಕಂಪ್ಯೂಟಿಂಗ್",
    hero4Title: "ನಿಮ್ಮ ಮನೆ ಮತ್ತು ಅಡುಗೆಮನೆಯನ್ನು ನವೀಕರಿಸಿ",
    hero4Subtitle: "ಫಿಲಿಪ್ಸ್ ಡಿಜಿಟಲ್ ಏರ್ ಫ್ರೈಯರ್, ಪ್ರೆಸ್ಟೀಜ್ ಗ್ರಾನೈಟ್ ಸೆಟ್‌ಗಳು",
    hero4Badge: "60% ವರೆಗೆ ರಿಯಾಯಿತಿ",
    tileElectronicsTitle: "70% ವರೆಗೆ ರಿಯಾಯಿತಿ | ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಮತ್ತು ಆಡಿಯೋ",
    tileMobilesTitle: "ಫ್ಲ್ಯಾಗ್ಶಿಪ್ ಮೊಬೈಲ್‌ಗಳು ಮತ್ತು ವೇಗದ ಚಾರ್ಜರ್‌ಗಳು",
    tileFashionTitle: "ಪುರುಷರು ಮತ್ತು ಮಹಿಳೆಯರ ಶೈಲಿಗಳು",
    tileHomeTitle: "ಮನೆ, ಅಡುಗೆಮನೆ ಮತ್ತು ಅಗತ್ಯ ವಸ್ತುಗಳು",
    shopMobiles: "ಮೊಬೈಲ್‌ಗಳನ್ನು ಖರೀದಿಸಿ",
    exploreFashion: "ಫ್ಯಾಷನ್ ಅನ್ವೇಷಿಸಿ",
    discoverHomeItems: "ಮನೆ ವಸ್ತುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    under1000: "₹1,000 ಕ್ಕಿಂತ ಕಡಿಮೆ",
    price1000To5000: "₹1,000 - ₹5,000",
    price5000To25000: "₹5,000 - ₹25,000",
    over25000: "₹25,000 ಕ್ಕಿಂತ ಹೆಚ್ಚು",
    breadcrumbHome: "ಮುಖಪುಟ",
    secureTransaction: "ಸುರಕ್ಷಿತ ವಹಿವಾಟು",
    shipsFrom: "ಇಲ್ಲಿಂದ ಕಳುಹಿಸಲಾಗುತ್ತದೆ",
    soldBy: "ಮಾರಾಟಗಾರ",
    addToWishList: "ವಿಶ್‌ಲಿಸ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    customersAlsoViewed: "ಈ ವಸ್ತುವನ್ನು ನೋಡಿದ ಗ್ರಾಹಕರು ಇವುಗಳನ್ನೂ ನೋಡಿದ್ದಾರೆ",
    limitedTimeDeal: "ಸೀಮಿತ ಸಮಯದ ಆಫರ್",
    deliveryByTomorrow: "ನಾಳೆ ಡೆಲಿವರಿ",
    deliveryBy: "ಡೆಲಿವರಿ",
    tomorrow: "ನಾಳೆ",
    addedCheck: "✓ ಸೇರಿಸಲಾಗಿದೆ",
    pairItWith: "ಇದರೊಂದಿಗೆ ಖರೀದಿಸಿ:",
    viewProduct: "ಉತ್ಪನ್ನ ವೀಕ್ಷಿಸಿ",
    emiAvailable: "ಇಎಂಐ ಲಭ್ಯವಿದೆ. ಚೆಕ್‌ಔಟ್‌ನಲ್ಲಿ ಸೂಕ್ತ ಬ್ಯಾಂಕ್ ಕಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ.",
    secure256: "🔒 256-ಬಿಟ್ ಸುರಕ್ಷಿತ",
    cardSubtitle: "ವೀಸಾ, ಮಾಸ್ಟರ್‌ಕಾರ್ಡ್, ರುಪೇ, ಮೆಸ್ಟ್ರೋ, ಅಮೇರಿಕನ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್",
    upiSubtitle: "PhonePe, Google Pay, Paytm ಅಥವಾ ಯಾವುದೇ UPI ಆ್ಯಪ್ ಮೂಲಕ ತಕ್ಷಣ ಪಾವತಿ",
    codSubtitle: "ಕೊರಿಯರ್ ನಿಮ್ಮ ಪ್ಯಾಕೇಜ್ ವಿತರಿಸಿದಾಗ ನಗದು ಅಥವಾ UPI ಸ್ಕ್ಯಾನರ್ ಮೂಲಕ ಪಾವತಿಸಿ.",
    emptyCartNotice: "ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯುವ ಮೊದಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕಾರ್ಟ್‌ಗೆ ವಸ್ತುಗಳನ್ನು ಸೇರಿಸಿ.",
    shopProducts: "ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ",
    orderPlacedSuccess: "ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಇರಿಸಲಾಗಿದೆ, ಧನ್ಯವಾದಗಳು!",
    orderPlacedEmailNotice: "ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್‌ಗೆ ದೃಢೀಕರಣ ಕಳುಹಿಸಲಾಗಿದೆ.",
    ordersSubtitle: "ನೈಜ-ಸಮಯದ ಸಾಗಣೆ ಟ್ರ್ಯಾಕಿಂಗ್ ವೀಕ್ಷಿಸಿ, ರಿಟರ್ನ್ಸ್ ಪ್ರಾರಂಭಿಸಿ, ಅಥವಾ ಹಿಂದಿನ ಖರೀದಿಗಳನ್ನು ಮರು-ಆರ್ಡರ್ ಮಾಡಿ.",
    searchOrdersPlaceholder: "ಎಲ್ಲಾ ಆರ್ಡರ್‌ಗಳು ಅಥವಾ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ...",
    noPurchasesToBuyAgain: "ಮತ್ತೆ ಖರೀದಿಸಲು ಹಿಂದಿನ ಖರೀದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    startShopping: "ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ",
    reorderFavorites: "1-ಕ್ಲಿಕ್ ಮೂಲಕ ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ ಹಿಂದಿನ ಮೆಚ್ಚಿನವುಗಳನ್ನು ಮರು-ಆರ್ಡರ್ ಮಾಡಿ.",
    purchasedOn: "ಖರೀದಿಸಿದ ದಿನಾಂಕ",
    itemsCount: "{count} ವಸ್ತುಗಳು",
    orderNumberLabel: "ಆರ್ಡರ್ #",
    shipTo: "ಶಿಪ್ಪಿಂಗ್ ವಿಳಾಸ",
    viewOrPrintInvoice: "ಇನ್‌ವಾಯ್ಸ್ ವೀಕ್ಷಿಸಿ ಅಥವಾ ಮುದ್ರಿಸಿ",
    productsOnOffer: "ಆಫರ್‌ನಲ್ಲಿರುವ ಉತ್ಪನ್ನ",
    dealPrice: "ಡೀಲ್ ಬೆಲೆ",
    dealDates: "ದಿನಾಂಕಗಳು (ಪ್ರಾರಂಭ - ಅಂತ್ಯ)",
    dealStockLabel: "ಡೀಲ್ ಸ್ಟಾಕ್",
    dealStatus: "ಸ್ಥಿತಿ",
    dealActions: "ಕ್ರಮಗಳು",
    activeLive: "ಸಕ್ರಿಯ ಲೈವ್",
    scheduled: "ವೇಳಾಪಟ್ಟಿ ಮಾಡಲಾಗಿದೆ",
    expired: "ಅವಧಿ ಮೀರಿದೆ",
    disabled: "ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ",
    addProductToDeals: "+ ಇಂದಿನ ಡೀಲ್‌ಗಳಿಗೆ ಉತ್ಪನ್ನ ಸೇರಿಸಿ",
    soldCountText: "{count} ಮಾರಾಟವಾಗಿದೆ",
    dealsDesc: "ಅಧಿಕೃತ ನಿರ್ವಾಹಕರು ಮಾತ್ರ ರಿಯಾಯಿತಿ ಶೇಕಡಾವಾರು ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು, ಸ್ಟಾಕ್ ನಿರ್ವಹಿಸಬಹುದು ಮತ್ತು ಡೀಲ್‌ಗಳನ್ನು ನಿಗದಿಪಡಿಸಬಹುದು.",
    customerAccount: "ಗ್ರಾಹಕ ಖಾತೆ",
    welcomeBackUser: "ಮತ್ತೆ ಸ್ವಾಗತ, {name}",
    yourAccountTitle: "ನಿಮ್ಮ ರೆಂಜೋಕಾರ್ಟ್ ಖಾತೆ",
    accountSubtitle: "ನಿಮ್ಮ ಆರ್ಡರ್‌ಗಳು, ಪ್ರೊಫೈಲ್ ಆದ್ಯತೆಗಳು ಮತ್ತು ಭದ್ರತಾ ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    signInToAccount: "ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    ordersCardDesc: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ, ರಿಟರ್ನ್ ಮಾಡಿ, ಮತ್ತೆ ಖರೀದಿಸಿ, ಅಥವಾ ಇನ್‌ವಾಯ್ಸ್‌ಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    trackCardDesc: "ಲೈವ್ ಸ್ಥಿತಿ, AWB ಮತ್ತು ಅಂದಾಜು ಆಗಮನವನ್ನು ಪರಿಶೀಲಿಸಿ.",
    helpCardDesc: "ತ್ವರಿತ ಪರಿಹಾರಗಳು, ಶಿಪ್ಪಿಂಗ್ ಮಾರ್ಗದರ್ಶಿಗಳು, ರಿಟರ್ನ್ ನಿಯಮಗಳು.",
    contactCardDesc: "ಇಮೇಲ್ ಮತ್ತು ಫೋನ್ ಮೂಲಕ 24x7 ಗ್ರಾಹಕ ಬೆಂಬಲ.",
    defaultAddress: "ಡೀಫಾಲ್ಟ್ ವಿಳಾಸ",
    fastDeliveryHub: "ವೇಗದ ವಿತರಣಾ ಕೇಂದ್ರ",
    aboutHeroTitle: "ಭಾರತದಾದ್ಯಂತ ಲಕ್ಷಾಂತರ ಜನರಿಗೆ ತಡೆರಹಿತ ಶಾಪಿಂಗ್",
    aboutHeroDesc: "ರೆಂಜೋಕಾರ್ಟ್‌ಗೆ ಸ್ವಾಗತ. ಅಧಿಕೃತ ಉತ್ಪನ್ನಗಳು, ಪಾರದರ್ಶಕ ಬೆಲೆ ಮತ್ತು ಅತಿವೇಗದ ಡೆಲಿವರಿ ಒದಗಿಸುವ ಉದ್ದೇಶದಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    genuineBadge: "100% ಅಧಿಕೃತ",
    genuineDesc: "ನೇರ ಬ್ರ್ಯಾಂಡ್ ಪಾಲುದಾರಿಕೆಗಳು ಪರಿಶೀಲಿಸಿದ ವಾರಂಟಿ ಮತ್ತು ಸುರಕ್ಷಿತ ಪ್ಯಾಕೇಜಿಂಗ್ ಅನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.",
    nextDayDelivery: "ಮರುದಿನವೇ ಡೆಲಿವರಿ",
    nextDayDesc: "19,000+ ಪಿನ್ ಕೋಡ್‌ಗಳಿಗೆ ಅತ್ಯಾಧುನಿಕ ಕೇಂದ್ರಗಳಿಂದ ಮರುದಿನವೇ ಡೆಲಿವರಿ.",
    hassleFreeReturns: "ತೊಂದರೆ ರಹಿತ ರಿಟರ್ನ್ಸ್",
    returnsDesc: "ಪಾರದರ್ಶಕ 7 ದಿನಗಳ ಮನೆ ಬಾಗಿಲಿನ ಪಿಕಪ್ ಮತ್ತು ಯುಪಿಐ ಮತ್ತು ಕಾರ್ಡ್‌ಗಳಿಗೆ ತ್ವರಿತ ಮರುಪಾವತಿ.",
    ourCommitment: "ನಮ್ಮ ಪ್ರಮುಖ ಬದ್ಧತೆ",
    commitmentDesc: "ರೆಂಜೋಕಾರ್ಟ್‌ನಲ್ಲಿ, ಗ್ರಾಹಕರ ತೃಪ್ತಿಯು ಕೇವಲ ಒಂದು ಘೋಷಣೆಯಲ್ಲ; ಅದು ನಮ್ಮ ಕಾರ್ಯವೈಖರಿಯ ಅಡಿಪಾಯವಾಗಿದೆ.",
    exploreCatalog: "ಕ್ಯಾಟಲಾಗ್ ಅನ್ವೇಷಿಸಿ",
    locationSelectDesc: "ಲೈವ್ ಉತ್ಪನ್ನ ಲಭ್ಯತೆ, ಶಿಪ್ಪಿಂಗ್ ವೇಗ ಮತ್ತು ಸ್ಥಳೀಯ ರಿಯಾಯಿತಿಗಳನ್ನು ವೀಕ್ಷಿಸಲು ನಿಮ್ಮ ಡೆಲಿವರಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    country: "ದೇಶ",
    stateLabel: "ರಾಜ್ಯ",
    cityLabel: "ನಗರ / ಜಿಲ್ಲೆ",
    pincodeLabel: "6-ಅಂಕಿಯ ಭಾರತೀಯ ಪಿನ್ ಕೋಡ್",
    applyLocation: "ಸ್ಥಳವನ್ನು ಅನ್ವಯಿಸಿ",
    resetLocation: "ಡೀಫಾಲ್ಟ್‌ಗೆ ಮರುಹೊಂದಿಸಿ (ಚೆನ್ನೈ 600001)",
    detectingHub: "ಹತ್ತಿರದ ಕೇಂದ್ರವನ್ನು ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
    verifyingCredentials: "ರುಜುವಾತುಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ…",
    autofillAdmin: "ನಿರ್ವಾಹಕ ಸ್ವಯಂ ಭರ್ತಿ",
    demoAdminLabel: "ಡೆಮೊ ನಿರ್ವಾಹಕ:",
    passwordFieldLabel: "ಪಾಸ್‌ವರ್ಡ್:",
    reenterPasswordPlaceholder: "ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಮರು-ನಮೂದಿಸಿ",
    namePlaceholder: "ಮೊದಲ ಮತ್ತು ಕೊನೆಯ ಹೆಸರು"
  }
};

const content = fs.readFileSync('lib/i18n.ts', 'utf8');

// Parse dictionaries out of lib/i18n.ts
let updatedContent = content;

// Verify additions keys
const newKeyCount = Object.keys(additions.en).length;
console.log(`Adding ${newKeyCount} comprehensive keys across all 5 languages...`);

for (const lang of ['en', 'ta', 'hi', 'ml', 'kn']) {
  const langKeys = additions[lang];
  // Find where this language's dictionary starts: `${lang}: {`
  const searchPattern = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?\\n)(\\s*\\},)`);
  const match = updatedContent.match(searchPattern);
  if (!match) {
    console.error(`Could not match ${lang} dictionary!`);
    continue;
  }

  // Format additions as key-values
  let additionStr = `    // --- Complete UI Additions (${lang.toUpperCase()}) ---\n`;
  for (const [k, v] of Object.entries(langKeys)) {
    // Avoid re-adding if already present
    if (!match[1].includes(`\n    ${k}:`)) {
      additionStr += `    ${k}: ${JSON.stringify(v)},\n`;
    }
  }

  updatedContent = updatedContent.replace(searchPattern, `$1${additionStr}$2`);
  console.log(`[UPDATED] ${lang.toUpperCase()} dictionary`);
}

// Now replace useTranslation and add LanguageProvider
const providerCode = `
const LANG_STORAGE_KEY = "renzocart:language";

export function getSavedLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const saved = (
      localStorage.getItem(LANG_STORAGE_KEY) ||
      localStorage.getItem("novacart:language") ||
      (document.cookie.split("; ").find((row) => row.startsWith("renzocart_lang="))?.split("=")[1]) ||
      ""
    ).toLowerCase().trim();
    if (saved === "ta" || saved === "hi" || saved === "ml" || saved === "kn") {
      return saved as Language;
    }
  } catch (e) {
    // ignore
  }
  return "en";
}

export function setSavedLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    localStorage.setItem("novacart:language", lang);
    document.cookie = "renzocart_lang=" + lang + "; path=/; max-age=31536000; SameSite=Lax";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
    window.dispatchEvent(new CustomEvent("renzocart:lang-changed", { detail: { lang } }));
  } catch (e) {
    // ignore
  }
}

interface LanguageContextType {
  lang: Language;
  changeLanguage: (newLang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  languages: LanguageOption[];
}

import React, { createContext, useContext } from "react";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const initial = getSavedLanguage();
    setLang(initial);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
    }

    const handleLangChange = (e: any) => {
      const nextLang = e.detail?.lang || getSavedLanguage();
      setLang(nextLang);
      if (typeof document !== "undefined") {
        document.documentElement.lang = nextLang;
      }
    };

    window.addEventListener("renzocart:lang-changed", handleLangChange);
    window.addEventListener("storage", handleLangChange);

    return () => {
      window.removeEventListener("renzocart:lang-changed", handleLangChange);
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  const changeLanguage = (newLang: Language) => {
    setSavedLanguage(newLang);
    setLang(newLang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const langDict = DICTIONARY[lang] || DICTIONARY.en;
    const text = langDict[key] ?? DICTIONARY.en[key] ?? key;
    if (!params) return text;
    let result = text;
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(new RegExp(\`\\\\{\${k}\\\\}\`, "g"), String(v));
    }
    return result;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, changeLanguage, t, languages: LANGUAGES } },
    children
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context) {
    return context;
  }

  // Fallback for standalone components
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    setLang(getSavedLanguage());

    const handleLangChange = (e: any) => {
      if (e.detail?.lang) {
        setLang(e.detail.lang);
      } else {
        setLang(getSavedLanguage());
      }
    };

    window.addEventListener("renzocart:lang-changed", handleLangChange);
    window.addEventListener("storage", handleLangChange);

    return () => {
      window.removeEventListener("renzocart:lang-changed", handleLangChange);
      window.removeEventListener("storage", handleLangChange);
    };
  }, []);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const langDict = DICTIONARY[lang] || DICTIONARY.en;
    const text = langDict[key] ?? DICTIONARY.en[key] ?? key;
    if (!params) return text;
    let result = text;
    for (const [k, v] of Object.entries(params)) {
      result = result.replace(new RegExp(\`\\\\{\${k}\\\\}\`, "g"), String(v));
    }
    return result;
  };

  const changeLanguage = (newLang: Language) => {
    setSavedLanguage(newLang);
    setLang(newLang);
  };

  return { t, lang, changeLanguage, languages: LANGUAGES };
}
`;

// Replace from `const LANG_STORAGE_KEY = ...` to end of file
const storageIndex = updatedContent.indexOf('const LANG_STORAGE_KEY = "renzocart:language";');
if (storageIndex !== -1) {
  updatedContent = updatedContent.substring(0, storageIndex) + providerCode.trim() + '\n';
}

fs.writeFileSync('lib/i18n.ts', updatedContent, 'utf8');
console.log('Successfully wrote updated lib/i18n.ts');
