# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A Next.js 15 food ordering application built with TypeScript, featuring a pizza ordering system with user authentication, shopping cart functionality, and admin management. The application uses modern React patterns with server components and client-side state management.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with credentials provider
- **State Management**: Redux Toolkit (cart management)
- **Styling**: Tailwind CSS with shadcn/ui components
- **UI Components**: Radix UI primitives, Lucide icons
- **Development**: Turbopack (--turbopack flag), ESLint

## Architecture

### Database Schema (Prisma)
- **Users**: Authentication and profile information with roles (USER/ADMIN)  
- **Products**: Food items with categories, sizes, and extra ingredients
- **Categories**: Organization of products into groups (Pizza, Margherita, Pepperoni, etc.)
- **Orders**: Customer orders with delivery information and order items
- **Size/Extra models**: Configurable pricing for product variations

### Directory Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/auth/           # NextAuth.js API routes
│   ├── auth/               # Authentication pages (signin, signup)
│   ├── cart/               # Shopping cart page and components
│   ├── menu/               # Menu browsing page
│   └── _components/        # Page-specific components
├── components/             # Reusable UI components
│   ├── ui/                 # shadcn/ui base components  
│   ├── menu/               # Menu-related components (MenuItem, AddToCart)
│   ├── header/             # Navigation and header components
│   └── providers/          # Context providers (Redux)
├── constants/              # Enums and constants (Routes, Pages, UserRole, etc.)
├── lib/                    # Utilities (Prisma client, formatters, cart helpers)
├── redux/                  # Redux store and slices (cart management)
├── server/                 # Server actions and database queries
│   ├── _actions/           # Server actions (auth)
│   └── db/                 # Database query functions
├── types/                  # TypeScript type definitions
└── validations/            # Zod validation schemas
```

### Key Patterns

1. **Server Components + Client Components**: Pages are server components fetching data, with client components for interactivity (cart, forms)

2. **Server Actions**: Authentication and data mutations handled via server actions in `src/server/_actions/`

3. **Database Access Layer**: Centralized queries in `src/server/db/` with caching using `@/lib/cache`

4. **Type-Safe Database**: Custom Prisma client location (`./prisma/generated/prisma`) with comprehensive TypeScript types

5. **Redux for Client State**: Cart state managed with Redux Toolkit, persisted across page navigation

6. **Route Constants**: Centralized routing constants in `src/constants/enums.ts` to prevent typos

## Common Development Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production  
npm start            # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npm run db:migrate   # Run Prisma migrations
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio GUI
npm run db:reset     # Reset database (careful!)
npm run seed         # Seed database with sample data
```

## Development Notes

### Authentication
- Uses NextAuth.js with credentials provider
- Custom login logic in `src/server/_actions/auth.ts`  
- User sessions managed with JWT strategy
- Password hashing with bcrypt

### Cart Management
- Redux Toolkit slice at `src/redux/cartSlice.ts`
- Supports product customization (sizes, extra ingredients)
- Client-side persistence during session
- Integration with product variants and pricing

### Database Seeding
- Comprehensive seed script at `scripts/seed.ts`
- Creates sample categories, products with variants, and pricing
- Useful for development and testing

### Component Architecture
- shadcn/ui for base components with Tailwind styling
- Menu components handle product display and cart interactions
- Dialog-based cart addition with size/extras selection
- Responsive design with mobile-first approach

### Environment Setup
- Requires `DATABASE_URL` for PostgreSQL connection
- `NEXTAUTH_SECRET` for authentication
- Custom Prisma client output path configured

### File Paths and Aliases
- Uses `@/` alias pointing to `src/`
- TypeScript path mapping configured in `tsconfig.json`
- Components reference Prisma types from custom location
