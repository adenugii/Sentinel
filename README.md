<div align="center">

# 🔗 Sentinel - Blockchain Warranty Management System

**Sentinel** is a revolutionary marketplace platform that combines e-commerce with blockchain technology to provide secure, tamper-proof warranty management through smart contracts on Ethereum Sepolia testnet.

![Sentinel Banner](public/images/hero-bg.png)

</div>

## 🎯 Project Overview

Sentinel transforms traditional warranty management by leveraging blockchain technology to create immutable, transparent, and secure warranty certificates. This frontend application provides a seamless user experience for purchasing products while ensuring warranty authenticity through blockchain verification.

### 🔗 Backend Integration

This frontend seamlessly integrates with our robust blockchain backend:

**🔗 [Sentinel API Backend](https://github.com/muktiabdii/sentinel-api/)** - A comprehensive blockchain API for warranty management built with:
- **Solidity Smart Contracts** for warranty creation and verification
- **Ethereum Sepolia Testnet** for secure, decentralized warranty storage
- **Node.js/Express** RESTful API for seamless frontend integration
- **Web3 Integration** for blockchain transaction handling

## ✨ Key Features

### 🛒 E-Commerce Functionality
- **Product Catalog** - Browse and search official gadgets with detailed specifications
- **Shopping Cart** - Add multiple products with variant selection (color, storage, etc.)
- **Secure Checkout** - Complete purchase flow with order confirmation
- **Order Management** - Track order history and status updates

### 🔐 Blockchain-Powered Warranties
- **Immutable Warranty Certificates** - Each purchase generates a blockchain-backed warranty
- **Real-time Verification** - Check warranty authenticity through blockchain explorer
- **Transparent Transaction History** - View complete warranty lifecycle on Ethereum
- **Decentralized Storage** - Warranty data secured on Sepolia testnet

### 👤 User Experience
- **Authentication System** - Secure login/register with JWT token management
- **User Dashboard** - Personal warranty management and order history
- **Mobile-Responsive Design** - Optimized for all devices with Tailwind CSS
- **Real-time Updates** - Live warranty status and blockchain confirmation

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Frontend      │    │   Backend API    │    │   Blockchain        │
│   (Next.js)     │◄──►│   (Node.js)      │◄──►│   (Ethereum)        │
├─────────────────┤    ├──────────────────┤    ├─────────────────────┤
│ • React Components│    │ • REST Endpoints │    │ • Smart Contracts   │
│ • TypeScript     │    │ • JWT Auth       │    │ • Transaction Hash  │
│ • Tailwind CSS   │    │ • Database       │    │ • Block Verification│
│ • State Management│    │ • Web3 Integration│   │ • Immutable Records │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **Git** for version control
- **Modern Browser** with Web3 support (for blockchain features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/muktiabdii/sentinel.git
   cd sentinel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Configure your environment variables
   NEXT_PUBLIC_API_URL=https://sentinel-api-ochre.vercel.app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0+ | React framework with App Router |
| **TypeScript** | 5.0+ | Type-safe development |
| **Tailwind CSS** | 4.0+ | Utility-first styling |
| **React** | 19.2+ | Component-based UI library |
| **Framer Motion** | 12.23+ | Smooth animations and transitions |
| **Axios** | 1.13+ | HTTP client for API communication |
| **Lucide React** | 0.553+ | Beautiful icon library |

### Development Tools
| Tool | Purpose |
|------|---------|
| **ESLint** | Code linting and quality assurance |
| **PostCSS** | CSS processing with Tailwind |
| **TypeScript Compiler** | Static type checking |

## 📁 Project Structure

```
sentinel/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── 📁 (main)/                   # Main application pages
│   │   ├── account/                 # User account management
│   │   ├── cart/                    # Shopping cart
│   │   ├── checkout/                # Purchase flow
│   │   ├── products/                # Product catalog
│   │   └── warranties/              # Warranty management
│   └── layout.tsx                   # Root layout
├── 📁 components/                   # Reusable UI components
│   ├── 📁 domain/                   # Business logic components
│   ├── 📁 layout/                   # Layout components
│   └── 📁 ui/                       # Base UI components
├── 📁 core/                         # Core business logic
│   ├── 📁 entities/                 # Data models and types
│   ├── 📁 services/                 # API and business services
│   └── 📁 constants/                # Application constants
├── 📁 lib/                          # Utility libraries
│   └── apiClient.ts                 # Axios configuration
├── 📁 public/                       # Static assets
│   └── 📁 images/                   # Application images
└── 📁 context/                      # React Context providers
```

## 🔗 API Integration

### Backend Connection

The frontend connects to the blockchain backend through a carefully configured API client:

```typescript
// API Configuration
const BASE_URL = "/api/proxy";
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication with JWT
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Key API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | User authentication |
| `/api/products` | GET | Product catalog |
| `/api/warranties` | GET | User warranties |
| `/api/warranties/:id` | GET | Warranty details with blockchain data |
| `/api/orders` | POST | Create new order |

## 🔗 Blockchain Features

### Warranty Verification

Each warranty comes with blockchain verification showing:

- ✅ **Transaction Hash** - Unique identifier on blockchain
- 🔢 **Block Number** - Specific block containing the warranty
- ⏰ **Verification Timestamp** - When warranty was recorded
- 🌐 **Etherscan Link** - Direct link to view transaction

### Smart Contract Integration

```typescript
// Warranty data structure from blockchain
interface WarrantyDetail {
  id: number;
  blockchain_tx_hash: string;
  on_chain_status: string;
  blockchain_metadata: {
    block_number: number;
    verified_on: string;
    network_status: string;
  };
  explorer_url: string;
}
```

## 🎨 UI/UX Features

### Design System
- **Tailwind CSS** for consistent, responsive design
- **Lucide Icons** for beautiful, scalable icons
- **Framer Motion** for smooth animations
- **Mobile-First** responsive design approach

### Key Components
- **Product Cards** - Rich product display with images and pricing
- **Warranty Cards** - Blockchain-verified warranty certificates
- **Cart Management** - Add, remove, and update quantities
- **Checkout Flow** - Secure multi-step purchase process

## 🚀 Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/muktiabdii/sentinel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://sentinel-api-ochre.vercel.app
```

### Other Platforms

The application can be deployed on any platform supporting Next.js:

- **Netlify** - Static site hosting with serverless functions
- **Railway** - Full-stack deployment with database
- **DigitalOcean** - VPS deployment with custom configuration

## 🧪 Testing

```bash
# Run ESLint for code quality
npm run lint

# Type checking
npx tsc --noEmit

# Build verification
npm run build
```

## 📖 Documentation

- **📘 [API Documentation](https://github.com/muktiabdii/sentinel-api/)** - Backend API reference
- **🔗 [Smart Contract Docs](https://github.com/muktiabdii/sentinel-api/)** - Blockchain integration details
- **🎨 [Component Library](./components/)** - Reusable UI components
- **🏗️ [Architecture Guide](./docs/architecture.md)** - System design documentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Ethereum Foundation** for blockchain infrastructure
- **Vercel** for excellent deployment platform
- **Tailwind Labs** for the amazing CSS framework
- **Open Source Community** for the incredible tools and libraries

## 📞 Support

- **🐛 Bug Reports** - [GitHub Issues](https://github.com/muktiabdii/sentinel/issues)
- **💡 Feature Requests** - [GitHub Discussions](https://github.com/muktiabdii/sentinel/discussions)
- **📧 Contact** - [muktiabdii@example.com](mailto:muktiabdii@example.com)

---

<div align="center">

**Built with ❤️ by the Sentinel Team**

[Website](https://sentinel.example.com) • [Documentation](https://docs.sentinel.example.com) • [API](https://api.sentinel.example.com)

</div>
