const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const destinations = [
    {
      name: 'Santorini Archipelago',
      country: 'Greece',
      code: 'ATH-SANT',
      description: 'Exclusive cliff-side villas with private infinity pools overlooking the Aegean Sea.',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e',
      price: 1800,
      popular: true,
      category: 'Romance'
    },
    {
      name: 'Kyoto Imperial Experience',
      country: 'Japan',
      code: 'KIX-KYO',
      description: 'Immersive cultural journey featuring private tea ceremonies and luxury ryokans.',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
      price: 2200,
      popular: true,
      category: 'Culture'
    },
    {
      name: 'Bora Bora Overwater Retreat',
      country: 'French Polynesia',
      code: 'BOB-LUX',
      description: 'Premium glass-bottom bungalows in the heart of the Pacific Ocean.',
      image: 'https://images.unsplash.com/photo-1549294413-26f195200c16',
      price: 4500,
      popular: true,
      category: 'Luxury'
    },
    {
      name: 'Dubai Skyline Penthouse',
      country: 'UAE',
      code: 'DXB-SKY',
      description: 'Unapologetic luxury at the very top of the world.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      price: 3200,
      popular: true,
      category: 'Luxury'
    },
    {
      name: 'Swiss Alps Heli-Skiing',
      country: 'Switzerland',
      code: 'ZRH-ALPS',
      description: 'Private helicopter drops on untouched powder peaks.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      price: 5500,
      popular: false,
      category: 'Adventure'
    },
    {
      name: 'Amalfi Coast Yacht Charter',
      country: 'Italy',
      code: 'NAP-AML',
      description: 'A week on a private 80ft yacht cruising the dramatic Italian coastline.',
      image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc',
      price: 8500,
      popular: false,
      category: 'Luxury'
    },
    {
      name: 'Serengeti Private Safari',
      country: 'Tanzania',
      code: 'JRO-SRG',
      description: 'Luxury tented camps and private wildlife tracking guides.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801',
      price: 6000,
      popular: true,
      category: 'Adventure'
    },
    {
      name: 'Reykjavik Nothern Lights',
      country: 'Iceland',
      code: 'KEF-AUR',
      description: 'Glass igloo accommodations directly beneath the Aurora Borealis.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      price: 3100,
      popular: true,
      category: 'Scenic'
    },
    {
      name: 'Parisian VIP Fashion Week',
      country: 'France',
      code: 'CDG-PAR',
      description: 'Front-row access to high fashion and a suite near the Eiffel Tower.',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
      price: 4800,
      popular: false,
      category: 'Culture'
    },
    {
      name: 'Machu Picchu VIP Train',
      country: 'Peru',
      code: 'CUZ-MAC',
      description: 'Travel aboard the Hiram Bingham luxury train through the Andes.',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
      price: 2800,
      popular: false,
      category: 'Scenic'
    },
    {
      name: 'Venetian Grand Canal Suite',
      country: 'Italy',
      code: 'VCE-VEN',
      description: 'Opulent palazzo stays with private gondolier service.',
      image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0',
      price: 2900,
      popular: true,
      category: 'Romance'
    },
    {
      name: 'New York Elite Residency',
      country: 'USA',
      code: 'JFK-NYC',
      description: 'VIP helicopter tours and a Central Park penthouse suite.',
      image: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625',
      price: 3500,
      popular: true,
      category: 'Luxury'
    },
    {
      name: 'Maldives Private Atoll',
      country: 'Maldives',
      code: 'MLE-PRV',
      description: 'Rent an entire island with dedicated staff and underwater spa access.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
      price: 15000,
      popular: false,
      category: 'Omega Fleet'
    },
    {
      name: 'Cape Town Wine Estate',
      country: 'South Africa',
      code: 'CPT-WINE',
      description: 'Exclusive tastings at private estates in the Stellenbosch region.',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99',
      price: 2100,
      popular: false,
      category: 'Culture'
    },
    {
      name: 'Banff Wilderness Lodge',
      country: 'Canada',
      code: 'YYC-BNF',
      description: 'Luxury log cabins surrounded by glacial lakes and snow-capped peaks.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      price: 2600,
      popular: true,
      category: 'Scenic'
    },
    {
      name: 'Rio Carnival VIP Box',
      country: 'Brazil',
      code: 'GIG-RIO',
      description: 'Exclusive access to the Sambadrome with premium hospitality.',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325',
      price: 4000,
      popular: false,
      category: 'Culture'
    },
    {
      name: 'Marrakech Desert Palace',
      country: 'Morocco',
      code: 'RAK-MAR',
      description: 'Palatial riads and sweeping camel tours at sunset.',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70',
      price: 1900,
      popular: true,
      category: 'Romance'
    },
    {
      name: 'Seoul Gangnam Highlife',
      country: 'South Korea',
      code: 'ICN-SEO',
      description: 'The epicenter of K-luxury, complete with personal shopping concierges.',
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241',
      price: 2400,
      popular: true,
      category: 'Culture'
    },
    {
      name: 'Antarctic Explorer',
      country: 'Antarctica',
      code: 'USH-ANT',
      description: 'A 10-day luxury icebreaker expedition to the White Continent.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      price: 12000,
      popular: false,
      category: 'Omega Fleet'
    },
    {
      name: 'Space Orbit Experience',
      country: 'Exosphere',
      code: 'LOM-ORB',
      description: 'The ultimate Omega Fleet journey. See the curvature of the Earth.',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
      price: 250000,
      popular: true,
      category: 'Omega Fleet'
    }
  ];

  console.log(`Seeding ${destinations.length} premium destinations...`);
  for (const dest of destinations) {
    try {
      const exists = await prisma.destination.findUnique({
        where: { code: dest.code }
      });
      if (!exists) {
        await prisma.destination.create({ data: dest });
        console.log(`Added: ${dest.name}`);
      } else {
        console.log(`Skipped (already exists): ${dest.name}`);
      }
    } catch (e) {
      console.error(`Error adding ${dest.name}:`, e);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Finished seeding external destinations.');
  });
