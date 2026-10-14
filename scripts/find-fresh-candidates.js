const fs = require('fs');
const mockDataContent = fs.readFileSync('lib/mock-data.ts', 'utf8');

const candidateList = [
  // Headphones for prod-extra-6-mniv
  { target: 'prod-extra-6-mniv', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-extra-6-mniv', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-extra-6-mniv', url: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=80' },

  // Black iPhone for prod-mobiles-1-cmvg
  { target: 'prod-mobiles-1-cmvg', url: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-mobiles-1-cmvg', url: 'https://images.unsplash.com/photo-1530319067432-f2a729c03db5?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-mobiles-1-cmvg', url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&auto=format&fit=crop&q=80' },

  // White phone for prod-mobiles-9-ud97
  { target: 'prod-mobiles-9-ud97', url: 'https://images.unsplash.com/photo-1598327105854-c8674faddf79?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-mobiles-9-ud97', url: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-mobiles-9-ud97', url: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80' },

  // Women rose gold watch for prod-fashion-5-rb6q
  { target: 'prod-fashion-5-rb6q', url: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-fashion-5-rb6q', url: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-fashion-5-rb6q', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80' },

  // Gold face cream for prod-beauty-7-gvpt
  { target: 'prod-beauty-7-gvpt', url: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-beauty-7-gvpt', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80' },
  { target: 'prod-beauty-7-gvpt', url: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80' }
];

async function run() {
  for (const item of candidateList) {
    const photoId = item.url.split('?')[0].replace('https://images.unsplash.com/', '');
    const inMockData = mockDataContent.includes(photoId);
    if (inMockData) {
      console.log(`[SKIP - IN MOCK DATA] ${item.target} -> ${photoId}`);
      continue;
    }
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      if (res.ok) {
        console.log(`[VERIFIED 200 OK & UNIQUE] ${item.target} -> ${item.url}`);
      } else {
        console.log(`[FAIL ${res.status}] ${item.target} -> ${photoId}`);
      }
    } catch (e) {
      console.log(`[ERR] ${item.target} -> ${e.message}`);
    }
  }
}

run();
