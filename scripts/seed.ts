import { PrismaClient } from '../prisma/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data in correct order (due to foreign key constraints)
  await prisma.extra.deleteMany();
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Create sample products with sizes and extras
  const productsData = [
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves. A timeless favorite that never goes out of style.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 8.99, // Base price for small
      order: 1
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Traditional pizza topped with spicy pepperoni slices and melted mozzarella cheese. Perfect for meat lovers.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 9.99,
      order: 2
    },
    {
      name: 'Supreme Pizza',
      description: 'Loaded with pepperoni, sausage, bell peppers, onions, mushrooms, and olives. The ultimate pizza experience.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.99,
      order: 3
    },
    {
      name: 'Hawaiian Pizza',
      description: 'Sweet and savory combination of ham, pineapple, and mozzarella cheese. A tropical twist on pizza.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 10.99,
      order: 4
    }
  ];

  for (const productData of productsData) {
    // Create product with sizes and extras
    const product = await prisma.product.create({
      data: {
        ...productData,
        sizes: {
          create: [
            { name: 'SMALL', price: 0 }, // Base price
            { name: 'MEDIUM', price: 4 }, // +$4
            { name: 'LARGE', price: 8 }   // +$8
          ]
        },
        extras: {
          create: [
            { name: 'CHEESE', price: 1.5 },
            { name: 'BACON', price: 2.5 },
            { name: 'PEPPERONI', price: 2.0 },
            { name: 'MUSHROOMS', price: 1.0 },
            { name: 'ONIONS', price: 0.5 },
            { name: 'PEPPERS', price: 1.0 }
          ]
        }
      }
    });
    console.log(`✅ Created product: ${product.name} with sizes and extras`);
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
