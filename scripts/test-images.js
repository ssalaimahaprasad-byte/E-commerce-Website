const testUrls = [
  // 1. Bose SoundLink Micro
  { id: 'prod-accessories-5-yz9g', candidate: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80' },
  // 2. JBL Flip 6
  { id: 'prod-electronics-4-6sd7', candidate: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80' },
  // 3. Sennheiser Accentum Plus
  { id: 'prod-extra-6-mniv', candidate: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80' },
  // 4. OnePlus Bullets Wireless Z2 Neckband
  { id: 'prod-extra-3-qqci', candidate: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80' },
  // 5. Apple iPad Air 11-inch
  { id: 'prod-computers-8-ttlw', candidate: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80' },
  // 6. Apple iPhone 15 Black
  { id: 'prod-mobiles-1-cmvg', candidate: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80' },
  // 7. Samsung Galaxy S24 Ultra variant
  { id: 'prod-mobiles-2-hq27', candidate: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&auto=format&fit=crop&q=80' },
  // 8. OnePlus 12 5G Silky Black
  { id: 'prod-mobiles-3-wfog', candidate: 'https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80' },
  // 9. Nothing Phone (2a) White
  { id: 'prod-mobiles-9-ud97', candidate: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80' },
  // 10. Logitech G502 HERO Gaming Mouse
  { id: 'prod-extra-2-0in0', candidate: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80' }, // wait, need gaming mouse
  // 11. LG UltraGear Gaming Monitor
  { id: 'prod-computers-7-wzly', candidate: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80' },
  // 12. Prestige Cookware Set
  { id: 'prod-home-and-kitchen-1-jhjo', candidate: 'https://images.unsplash.com/photo-1584990347449-3221a2082260?w=800&auto=format&fit=crop&q=80' },
  // 13. Hawkins Pressure Cooker
  { id: 'prod-home-and-kitchen-6-xa0x', candidate: 'https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&auto=format&fit=crop&q=80' },
  // 14. Solimo Dutch Oven
  { id: 'prod-home-and-kitchen-7-pncu', candidate: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80' },
  // 15. Titan Raga Women's Rose Gold Watch
  { id: 'prod-fashion-5-rb6q', candidate: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80' },
  // 16. Garmin Running GPS Smartwatch
  { id: 'prod-sports-7-ryis', candidate: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80' },
  // 17. Apple Watch Series 9
  { id: 'prod-extra-1-9x5f', candidate: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&auto=format&fit=crop&q=80' },
  // 18. Ray-Ban Wayfarer Classic Black
  { id: 'prod-extra-8-rb4n', candidate: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80' },
  // 19. L'Oreal Revitalift Hyaluronic Acid Serum
  { id: 'prod-beauty-1-cjfh', candidate: 'https://images.unsplash.com/photo-1608248597359-0f625095d66b?w=800&auto=format&fit=crop&q=80' },
  // 20. Forest Essentials Soundarya Cream
  { id: 'prod-beauty-7-gvpt', candidate: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80' },
  // 21. Philips BT3231 Beard Trimmer
  { id: 'prod-beauty-2-g4of', candidate: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80' },
  // 22. Spigen USB-C Cable
  { id: 'prod-accessories-2-1i8t', candidate: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&auto=format&fit=crop&q=80' },
  // 23. UGREEN USB-C Hub
  { id: 'prod-accessories-4-sqer', candidate: 'https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?w=800&auto=format&fit=crop&q=80' },
  // 24. DailyObjects Sling Bag
  { id: 'prod-accessories-6-xcho', candidate: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80' },
  // 25. Prestige Iris Mixer Grinder
  { id: 'prod-extra-9-7mwi', candidate: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80' },
  // 26. Neutrogena Hydro Boost Water Gel
  { id: 'prod-beauty-6-jdz6', candidate: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80' },
  // 27. Maybelline Matte Ink Liquid Lipstick
  { id: 'prod-extra-10-i0fg', candidate: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80' },
  // 28. Tata Sampann Toor Dal
  { id: 'prod-grocery-6-82zn', candidate: 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&auto=format&fit=crop&q=80' },
  // 29. Cadbury Celebrations Chocolate Pack
  { id: 'prod-extra-7-n4un', candidate: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=800&auto=format&fit=crop&q=80' },
  // 30. Kellogg's Muesli
  { id: 'prod-grocery-7-jnan', candidate: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80' },
  // 31. Nivia Storm Football
  { id: 'prod-sports-6-lf3b', candidate: 'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=800&auto=format&fit=crop&q=80' },
  // 32. Cosco Red Cricket Tennis Balls
  { id: 'prod-extra-4-f8lg', candidate: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80' },
  // 33. Play-Doh Compound
  { id: 'prod-toys-6-6a0r', candidate: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop&q=80' },
  // 34. Pampers Baby Diapers
  { id: 'prod-extra-5-p7ii', candidate: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80' },
  // 35. Belkin 3-in-1 MagSafe Stand
  { id: 'prod-accessories-7-pmwt', candidate: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=800&auto=format&fit=crop&q=80' }
];

async function run() {
  console.log(`Testing ${testUrls.length} candidate URLs...`);
  let passed = 0;
  for (const item of testUrls) {
    try {
      const res = await fetch(item.candidate, { method: 'HEAD' });
      if (res.ok) {
        passed++;
        console.log(`[OK ${res.status}] ${item.id} -> ${res.headers.get('content-type')}`);
      } else {
        console.error(`[FAIL ${res.status}] ${item.id} -> ${item.candidate}`);
      }
    } catch (err) {
      console.error(`[ERR] ${item.id} -> ${err.message}`);
    }
  }
  console.log(`\nResults: ${passed} / ${testUrls.length} passed.`);
}

run();
