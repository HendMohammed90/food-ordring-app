import { PrismaClient } from '../prisma/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.product.deleteMany();
  console.log('🗑️  Cleared existing products');

  // Create sample products
  const products = [
    {
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves. A timeless favorite that never goes out of style.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.99,
      order: 1
    },
    {
      name: 'Pepperoni Pizza',
      description: 'Traditional pizza topped with spicy pepperoni slices and melted mozzarella cheese. Perfect for meat lovers.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 14.99,
      order: 2
    },
    {
      name: 'Supreme Pizza',
      description: 'Loaded with pepperoni, sausage, bell peppers, onions, mushrooms, and olives. The ultimate pizza experience.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 18.99,
      order: 3
    },
    {
      name: 'Hawaiian Pizza',
      description: 'Sweet and savory combination of ham, pineapple, and mozzarella cheese. A tropical twist on pizza.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 15.99,
      order: 4
    },
    {
      name: 'Veggie Deluxe',
      description: 'Fresh vegetables including bell peppers, mushrooms, onions, tomatoes, and olives on a bed of mozzarella.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 16.99,
      order: 5
    },
    {
      name: 'BBQ Chicken Pizza',
      description: 'Grilled chicken with tangy BBQ sauce, red onions, and cilantro. A smoky and delicious option.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 17.99,
      order: 6
    },
    {
      name: 'Meat Lovers',
      description: 'For the carnivores! Loaded with pepperoni, sausage, ham, and bacon. Pure meat indulgence.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 19.99,
      order: 7
    },
    {
      name: 'White Pizza',
      description: 'Creamy white sauce base with ricotta, mozzarella, and parmesan cheese. Elegant and delicious.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 16.99,
      order: 8
    }
  ];

  for (const product of products) {
    const created = await prisma.product.create({
      data: product
    });
    console.log(`✅ Created product: ${created.name}`);
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
