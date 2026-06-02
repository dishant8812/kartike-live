/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SareeCategory, Review, TimelineEvent, FAQItem } from './types';

export const BUSINESS_INFO = {
  name: {
    en: "Kartike Saree Center",
    mr: "कार्तिके साडी सेंटर"
  },
  owner: {
    en: "Rupali Patil",
    mr: "रूपाली पाटील"
  },
  tagline: {
    en: "Complete Women's Fashion & Elegance",
    mr: "संपूर्ण महिला पेहराव आणि परंपरा"
  },
  phone: "+91 6263132218",
  whatsapp: "+916263132218",
  email: "dishant8812@gmail.com",
  address: {
    en: "Tambepura, Amalner, Maharashtra, India",
    mr: "तांबेपुरा, अमळनेर, महाराष्ट्र, भारत"
  },
  mapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14896.791550990886!2d75.056453!3d21.024765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDAxJzI5LjIiTiA3NcKwMDMnMjMuMiJF!5e0!3m2!1sen!2sin!4v1717255153205!5m2!1sen!2sin"
};

export const CATEGORIES: SareeCategory[] = [
  {
    id: "traditional",
    title: {
      en: "Traditional Sarees",
      mr: "पारंपारिक साड्या"
    },
    description: {
      en: "Indulge in royal heritages of shimmering zari borders, soft pure silks, and detailed handcrafted weaves.",
      mr: "चमकदार जरी काठ, मऊ शुद्ध सिल्क आणि हाताने विणलेल्या अत्यंत देखण्या पारंपारिक कलाकृती."
    },
    image: "https://placehold.co/600x800/800020/ffffff?text=Traditional+Sarees",
    benefits: [
      { en: "Authentic Pure Silk Thread", mr: "अस्सल शुद्ध रेशीम धागे" },
      { en: "Handcrafted Zari Pallu", mr: "हातमानावरील जरीचा जरतारी पल्लू" },
      { en: "Perfect for Grand Occasions", mr: "लग्नकार्य व शुभप्रसंगांसाठी अतिशय उत्तम" }
    ],
    subproducts: [
      { name: { en: "Yeola Paithani", mr: "येवला पैठणी" }, priceRange: "₹4,500 - ₹25,000", icon: "Crown" },
      { name: { en: "Banarasi Silk", mr: "बनारसी सिल्क" }, priceRange: "₹3,500 - ₹18,000", icon: "Gem" },
      { name: { en: "Bridal Nauvari Setup", mr: "वधू विशेष नऊवारी सेटअप" }, priceRange: "₹5,000 - ₹15,000", icon: "Sparkles" }
    ]
  },
  {
    id: "modern",
    title: {
      en: "Modern Wear & Dresses",
      mr: "आधुनिक पोशाख"
    },
    description: {
      en: "Stay ahead in style with sophisticated contemporary designs, designer suits, and trendy co-ord sets.",
      mr: "नवीनतम फॅशन, डिझायनर सूट्स आणि अतिशय स्टायलिश को-ऑर्ड सेट्ससह फॅशन विश्वात आघाडीवर राहा."
    },
    image: "https://placehold.co/600x800/800020/ffffff?text=Modern+Wear+and+Dresses",
    benefits: [
      { en: "Breathtaking Modern Cuts", mr: "आकर्षक आणि नवीन डिझाइन्स" },
      { en: "Premium Georgette & Crepe Fabrics", mr: "उत्कृष्ट दर्जाचे जॉर्जेट आणि क्रेप कापड" },
      { en: "Designed for Independent Women", mr: "स्मार्ट आणि आधुनिक महिलांचा पहिला पसंतीचा पर्याय" }
    ],
    subproducts: [
      { name: { en: "Designer Co-ord Sets", mr: "डिझायनर को-ऑर्ड सेट्स" }, priceRange: "₹1,200 - ₹3,500", icon: "Shirt" },
      { name: { en: "Party Wear Gowns", mr: "पार्टी वेअर गाउन्स" }, priceRange: "₹2,500 - ₹8,000", icon: "Sparkles" },
      { name: { en: "Boutique Kurtis & Suits", mr: "तपशीलवार डिझायनर कुर्ती आणि सूट्स" }, priceRange: "₹999 - ₹4,500", icon: "Layers" }
    ]
  },
  {
    id: "daily",
    title: {
      en: "Daily Wear",
      mr: "रोजच्या वापरासाठी"
    },
    description: {
      en: "Graceful daily drapes and casual wear designed for sheer comfort and effortless elegance.",
      mr: "दिवसभर प्रसन्न आणि तितकेच आरामदायक ठेवणाऱ्या रोजच्या वापरासाठीच्या साडी डिझाइन्स."
    },
    image: "https://placehold.co/600x800/800020/ffffff?text=Daily+Wear",
    benefits: [
      { en: "Highly Breathable Cotton Blend", mr: "अतिशय सुळसुळीत आणि थंड कॉटन कापड" },
      { en: "Easy to Wash and Maintain", mr: "धुण्यासाठी आणि सांभाळण्यासाठी सोपे" },
      { en: "Lightweight Elegance", mr: "वजनात हलकी आणि देखणी रचना" }
    ],
    subproducts: [
      { name: { en: "Pure Mulmul Cotton", mr: "शुद्ध मलमल कॉटन साडी" }, priceRange: "₹750 - ₹2,500", icon: "Feather" },
      { name: { en: "Casual Chiffon & linen", mr: "कॅज्युअल शिफॉन आणि लिनेन" }, priceRange: "₹500 - ₹1,800", icon: "Wind" },
      { name: { en: "Office Wear Salwar Suits", mr: "ऑफिस वेअर सलवार सूट्स" }, priceRange: "₹800 - ₹2,200", icon: "Briefcase" }
    ]
  },
  {
    id: "wholesale",
    title: {
      en: "Wholesale & Bulk",
      mr: "घाऊक खरेदी व रीसेलर"
    },
    description: {
      en: "Get exclusive wholesale pricing, premium quality supply, and a trusted supplier for your shop.",
      mr: "तुमच्या दुकानासाठी किंवा स्वतःच्या व्यवसायासाठी उत्तम घाऊक दरात अमर्याद साठा मिळवा."
    },
    image: "https://placehold.co/600x800/800020/ffffff?text=Wholesale+Collection",
    benefits: [
      { en: "Direct Weaver Pricing Structure", mr: "हातमाग कामगारांकडून थेट खरेदीचे भाव" },
      { en: "All India Delivery Network", mr: "संपूर्ण महाराष्ट्रात व भारतात जलद डिलिव्हरी" },
      { en: "Custom Boutique Curation Available", mr: "कस्टमाइज्ड बुटीक क्युरेशनची खास सोय" }
    ],
    subproducts: [
      { name: { en: "Bundle Catalog Lots", mr: "पूर्ण कॅटलॉग बंडल लॉट्स" }, priceRange: "Bulk Discount Quote", icon: "Package" },
      { name: { en: "Boutique Bulk Starter Pack", mr: "बुटीक स्टार्टर घाऊक पॅक" }, priceRange: "Custom Pricing", icon: "ShoppingBag" },
      { name: { en: "Reseller Network Program", mr: "घरगुती रीसेलर नेटवर्क योजना" }, priceRange: "Zero Security Deposit", icon: "Users" }
    ]
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "Our Roots",
    title: {
      en: "Deep Rich Traditions",
      mr: "पारंपारिक वारसा"
    },
    description: {
      en: "Inspired by deep-rooted weaver traditions of Maharashtra, providing handwoven sarees that preserve generational heritage.",
      mr: "महाराष्ट्राच्या विणकर परंपरेपासून प्रेरित होऊन पिढ्यानपिढ्या चाललेला हातमाग वारसा आम्ही जोपासतो."
    }
  },
  {
    year: "The Vision",
    title: {
      en: "Empowered Showroom Launch",
      mr: "भव्य शोरूम उभारणी"
    },
    description: {
      en: "Founded by Rupali Patil in Tambepura, Amalner, driven by a goal to make absolute premium sarees and ladies fashion accessible with unmatched high quality.",
      mr: "रूपाली पाटील यांनी अमळनेरमध्ये प्रीमियम दर्जाच्या साड्या सर्वांना परवडणाऱ्या दरात देण्याच्या ध्येयाने एका भव्य शोरूमची स्थापना केली."
    }
  },
  {
    year: "Wholesale Expansion",
    title: {
      en: "Wholesale & Trusted Supplier",
      mr: "घाऊक व होलसेल विस्तार"
    },
    description: {
      en: "Built a trusted direct weaver supply chain network allowing local retailers and women and resellers to buy in bulk with absolute confidence.",
      mr: "थेट विणकरांशी भागीदारी करून स्थानिक छोटे विक्रेते आणि घरगुती रीसेलर्स महिलांना विश्वासार्ह घाऊक दरात दर्जेदार माल पुरवला."
    }
  },
  {
    year: "Today & Beyond",
    title: {
      en: "Synonymous with Luxury & Trust",
      mr: "विश्वास आणि सन्मानाचे नाव"
    },
    description: {
      en: "Serving thousands of beautiful women across Amalner and nearby regions, delivering premium design curation with a promise of 100% quality trust.",
      mr: "अमळनेर आणि परिसरातील हजारो महिलांच्या विश्वासास पात्र ठरत दर्जेदार डिझाइन्सची उत्कृष्ट सेवा अखंडपणे देत आहोत."
    }
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    name: { en: "Priyanka Deshmukh", mr: "प्रियंका देशमुख" },
    location: { en: "Amalner", mr: "अमळनेर" },
    rating: 5,
    text: {
      en: "The Yeola Paithani I bought from Kartike Saree Center is stunning! The texture of pure silk is divine, and the gold zari border received compliments from everyone at my brother's wedding. Best showroom in Amalner!",
      mr: "कार्तिके साडी सेंटरमधून घेतलेली येवला पैठणी अप्रतिम आहे! शुद्ध रेशीमचा फील खूपच छान आहे. माझ्या भावाच्या लग्नात सर्वांनी पैठणीचे आणि सुंदर जरतारी पदराचे मनापासून कौतुक केले!"
    },
    avatar: "https://placehold.co/100x100/800020/ffffff?text=PD",
    date: "1 month ago"
  },
  {
    id: "r2",
    name: { en: "Savita Chaudhari", mr: "सविता चौधरी" },
    location: { en: "Chopda", mr: "चोपडा" },
    rating: 5,
    text: {
      en: "We bought our entire family wedding collection from Rupali Ma'am. The bridal sarees, designer gowns, and co-ord sets are of top boutique quality but priced extremely reasonably. Highly recommend their wholesale prices!",
      mr: "लग्नकार्याची सर्व साड्यांची खरेदी आम्ही रूपाली मॅडमकडूनच केली. वधूची साडी आणि डिझायनर कुर्तीचा दर्जा उत्कृष्ट आहे. घाऊक दरातील किमती इतर कुठेही मिळणे अशक्य आहे!"
    },
    avatar: "https://placehold.co/100x100/800020/ffffff?text=SC",
    date: "2 weeks ago"
  },
  {
    id: "r3",
    name: { en: "Vaishali Patil", mr: "वैशाली पाटील" },
    location: { en: "Dhule", mr: "धुळे" },
    rating: 5,
    text: {
      en: "I run a small home boutique, and Kartike Saree Center is my absolute go-to for bulk orders. Their cotton sarees and daily wear suits fly off my shelves. Honest rates and excellent service!",
      mr: "माझे छोटे घरगुती बुटीक आहे. कपडे खरेदीसाठी कार्तिके साडी सेंटर माझे हक्काचे ठिकाण आहे. तेथील कॉटन साड्या माझ्या ग्राहकांना खूप आवडतात. अतिशय प्रामाणिक दर आहेत!"
    },
    avatar: "https://placehold.co/100x100/800020/ffffff?text=VP",
    date: "3 days ago"
  }
];

export const GALLERY_IMAGES = [
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Golden+Sovereign+Silk",
    title: { en: "Golden Sovereign Silk", mr: "सुवर्णकाठ सिल्क साडी" },
    tag: { en: "Saree", mr: "साडी" }
  },
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Elite+Contemporary+Fusion",
    title: { en: "Elite Contemporary Fusion", mr: "एलिट मॉडर्न पोशाख" },
    tag: { en: "Modern", mr: "आधुनिक" }
  },
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Intricate+Silk+Loom",
    title: { en: "Intricate Silk Loom Details", mr: "अस्सल रेशीम विणकाम" },
    tag: { en: "Craftsmanship", mr: "नक्षीकाम" }
  },
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Royal+Pallu+Elegance",
    title: { en: "Royal Pallu Elegance", mr: "शाही पदराचा थाट" },
    tag: { en: "Tradition", mr: "परंपरा" }
  },
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Breathable+Premium+Cotton",
    title: { en: "Breathable Premium Cotton", mr: "शुद्ध मलमल कॉटन" },
    tag: { en: "Daily Wear", mr: "डेली वेअर" }
  },
  {
    src: "https://placehold.co/600x800/800020/ffffff?text=Imperial+Bridal+Jewel",
    title: { en: "Imperial Bridal Jewel Matching", mr: "लग्नसराई विशेष वधू शृंगार" },
    tag: { en: "Wedding", mr: "वधू शृंगार" }
  }
];

export const FAQS: FAQItem[] = [
  {
    question: {
      en: "Do you offer pure handloom Paithani sarees?",
      mr: "तुमच्याकडे मूळ हातमानावरील पैठणी साड्या मिळतील का?"
    },
    answer: {
      en: "Yes! We specialize in authentic Yeola handloom Paithani sarees with certified silk-thread weaving and genuine golden zari work, directly sourced from weavers.",
      mr: "होय! आमच्याकडे विणकरांकडून थेट खरेदी केलेल्या अस्सल येवला हातमानावरील शुद्ध सिल्क पैठणी साड्या आणि खरं जरीकाम केलेला उत्कृष्ट स्टॉक उपलब्ध आहे."
    }
  },
  {
    question: {
      en: "Can I buy single sarees at wholesale prices?",
      mr: "एक किंवा दोन साड्या होलसेल भावात मिळू शकतात का?"
    },
    answer: {
      en: "While our bulk categories require packing bundles, we offer highly competitive retail pricing directly to our walk-in customers which is significantly lower than typical high-street boutiques.",
      mr: "घाऊक खरेदीसाठी ठराविक नग एकत्र खरेदी करावे लागतात. तथापि, आमच्या रिटेल ग्राहकांसाठीही आमचे दर बाजारभावापेक्षा खूपच वाजवी आणि परवडणारे असतात."
    }
  },
  {
    question: {
      en: "Do you support home resellers or small shop entrepreneurs?",
      mr: "तुम्ही घरगुती रीसेलर किंवा नवीन दुकान सुरू करणाऱ्या महिलांना सहकार्य करता का?"
    },
    answer: {
      en: "Absolutely! Supporting women entrepreneurs is close to Rupali Patil's heart. We offer customized boutique starter packs, guidance, and bulk collections to help women start their offline or online micro-boutiques.",
      mr: "नक्कीच! रूपाली पाटील यांच्या पुढाकारातून आम्ही नवीन घरगुती व्यवसाय सुरू करणाऱ्या महिलांना बुटीक स्टार्टर पॅक, निवडक साडी कलेक्शन आणि मार्गदर्शनाची विशेष सुविधा देतो."
    }
  },
  {
    question: {
      en: "Do you have shipping or online inquiry options?",
      mr: "साडी खरेदीसाठी ऑनलाईन चौकशी किंवा डिलिव्हरीची सुविधा आहे का?"
    },
    answer: {
      en: "Yes! You can browse our website catalog and click on any 'WhatsApp Inquiry' or 'Enquire on WhatsApp' buttons to directly chat with Rupali Patil and place orders with high speed shipping across India.",
      mr: "होय! आमच्या कोणत्याही साडी प्रकाराखाली असलेल्या 'WhatsApp Inquiry' बटनावर क्लिक करून तुम्ही थेट रूपाली पाटील यांच्याशी संपर्क साधू शकता आणि संपूर्ण भारतात जलद शिपिंग सुविधेचा लाभ घेऊ शकता."
    }
  }
];
