import { PrismaClient } from '../prisma/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data in correct order (due to foreign key constraints)
  // Delete in reverse order of dependencies
  await prisma.orderProduct.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.extra.deleteMany();
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  console.log('🗑️  Cleared existing data');

  // Create categories first (required for products)
  const pizzaCategory = await prisma.category.create({
    data: {
      name: 'Pizza',
      order: 1
    }
  });
  const margheritaCategory = await prisma.category.create({
    data: {
      name: 'Margherita',
      order: 2
    }
  });

  const pepperoniCategory = await prisma.category.create({
    data: {
      name: 'Pepperoni',
      order: 3
    }
  });

  const veggieCategory = await prisma.category.create({
    data: {
      name: 'Vegetarian',
      order: 4
    }
  });

  const bbqChickenCategory = await prisma.category.create({
    data: {
      name: 'BBQ Chicken',
      order: 5
    }
  });
  console.log(`✅ Created categories`);

  // Create sample products with sizes and extras organized by category
  const productsData = [
    // General Pizza Category
    {
      name: 'Supreme Pizza',
      description: 'Loaded with pepperoni, sausage, bell peppers, onions, mushrooms, and olives. The ultimate pizza experience.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.99,
      order: 1,
      categoryId: pizzaCategory.id
    },
    {
      name: 'Hawaiian Pizza',
      description: 'Sweet and savory combination of ham, pineapple, and mozzarella cheese. A tropical twist on pizza.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 10.99,
      order: 2,
      categoryId: pizzaCategory.id
    },
    {
      name: 'Meat Lovers Pizza',
      description: 'A carnivore\'s dream with pepperoni, sausage, bacon, and ham. Loaded with protein and flavor.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 13.99,
      order: 3,
      categoryId: pizzaCategory.id
    },

    // Margherita Category
    {
      name: 'Classic Margherita',
      description: 'Traditional Neapolitan pizza with San Marzano tomatoes, fresh mozzarella, and basil leaves. Simple perfection.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 8.99,
      order: 1,
      categoryId: margheritaCategory.id
    },
    {
      name: 'Margherita Deluxe',
      description: 'Premium version with buffalo mozzarella, cherry tomatoes, and fresh basil. Elevated classic taste.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 11.99,
      order: 2,
      categoryId: margheritaCategory.id
    },
    {
      name: 'Margherita with Arugula',
      description: 'Classic margherita topped with fresh arugula and parmesan shavings. A fresh twist on tradition.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 10.99,
      order: 3,
      categoryId: margheritaCategory.id
    },

    // Pepperoni Category
    {
      name: 'Classic Pepperoni',
      description: 'Traditional pizza topped with spicy pepperoni slices and melted mozzarella cheese. Perfect for meat lovers.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 9.99,
      order: 1,
      categoryId: pepperoniCategory.id
    },
    {
      name: 'Double Pepperoni',
      description: 'Extra pepperoni for those who can\'t get enough. Double the meat, double the flavor.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.99,
      order: 2,
      categoryId: pepperoniCategory.id
    },
    {
      name: 'Spicy Pepperoni',
      description: 'Hot pepperoni with jalapeños and red pepper flakes. For those who like it hot.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 11.99,
      order: 3,
      categoryId: pepperoniCategory.id
    },
    {
      name: 'Pepperoni & Mushroom',
      description: 'Classic combination of pepperoni and fresh mushrooms. A timeless duo.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 11.49,
      order: 4,
      categoryId: pepperoniCategory.id
    },

    // Vegetarian Category
    {
      name: 'Garden Veggie',
      description: 'Fresh bell peppers, mushrooms, onions, tomatoes, and olives. A garden on your pizza.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 10.99,
      order: 1,
      categoryId: veggieCategory.id
    },
    {
      name: 'Mediterranean Veggie',
      description: 'Sun-dried tomatoes, olives, artichokes, and feta cheese. A taste of the Mediterranean.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.49,
      order: 2,
      categoryId: veggieCategory.id
    },
    {
      name: 'Spinach & Ricotta',
      description: 'Creamy ricotta cheese with fresh spinach and garlic. Light yet satisfying.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 11.99,
      order: 3,
      categoryId: veggieCategory.id
    },
    {
      name: 'Mushroom Deluxe',
      description: 'A variety of mushrooms including portobello, shiitake, and button mushrooms with herbs.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 11.49,
      order: 4,
      categoryId: veggieCategory.id
    },

    // BBQ Chicken Category
    {
      name: 'BBQ Chicken Classic',
      description: 'Grilled chicken with tangy BBQ sauce, red onions, and cilantro. A smoky delight.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 12.99,
      order: 1,
      categoryId: bbqChickenCategory.id
    },
    {
      name: 'BBQ Chicken Bacon',
      description: 'BBQ chicken with crispy bacon, red onions, and mozzarella. The perfect combination.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 14.99,
      order: 2,
      categoryId: bbqChickenCategory.id
    },
    {
      name: 'Honey BBQ Chicken',
      description: 'Sweet honey BBQ sauce with grilled chicken, pineapple, and jalapeños. Sweet meets heat.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 13.99,
      order: 3,
      categoryId: bbqChickenCategory.id
    },
    {
      name: 'Buffalo Chicken',
      description: 'Spicy buffalo chicken with ranch drizzle, celery, and blue cheese crumbles.',
      image: '/assets/images/pizza-hero.png',
      basePrice: 13.49,
      order: 4,
      categoryId: bbqChickenCategory.id
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
            { name: 'SAUSAGE', price: 2.0 },
            { name: 'MUSHROOMS', price: 1.0 },
            { name: 'ONIONS', price: 0.5 },
            { name: 'PEPPERS', price: 1.0 },
            { name: 'TOMATOES', price: 1.0 },
            { name: 'OLIVES', price: 1.5 }
          ]
        }
      }
    });
    console.log(`✅ Created product: ${product.name} with sizes and extras`);
  }

  // Create a sample user
  const sampleUser = await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'hashedpassword123', // In real app, this should be properly hashed
      name: 'John Doe',
      phone: '+1234567890',
      streetAddress: '123 Main St',
      postalCode: '12345',
      city: 'New York',
      country: 'USA',
      role: 'USER'
    }
  });
  console.log(`✅ Created sample user: ${sampleUser.name}`);

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
