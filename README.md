# 🏪 POS (Point of Sale) System

A comprehensive Point of Sale system designed for transit fare management, card issuance, and customer service operations. Built with React frontend and FastAPI backend, this system provides a complete solution for managing transit cards, processing payments, and handling customer interactions.

## 🚀 Features

### 💳 Card Management
- **Issue New Cards**: Create and print new transit cards with various media types
- **Register Cards**: Link cards to customer accounts with detailed information
- **Reload Cards**: Add value to existing cards with multiple payment methods
- **Balance Checking**: Real-time card balance verification via NFC tap or manual entry

### 🛍️ Product Management
- **Transit Passes**: 7-Day and 30-Day unlimited ride passes
- **Stored Value**: Add cash value to cards for pay-per-ride usage
- **Multiple Payment Methods**: Support for cash and credit/debit card payments
- **Receipt Generation**: Automatic receipt printing and digital copies

### 👥 Customer Management
- **Customer Lookup**: Search and view customer information by ID
- **Customer Registration**: Link cards to customer profiles
- **Transaction History**: View complete transaction records

### 📊 Reporting & Analytics
- **System Reports**: Comprehensive dashboard with key metrics
- **Transaction Tracking**: Detailed logs of all POS operations
- **Performance Analytics**: Monitor system usage and trends

### 🔐 Security & Authentication
- **User Authentication**: Secure login system with session management
- **API Key Protection**: All backend endpoints protected with API keys
- **Role-based Access**: Different permission levels for users

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0**: Modern UI framework with hooks
- **React Router DOM 6.30.1**: Client-side routing
- **Vite 4.0.0**: Fast build tool and development server
- **Axios 1.6.0**: HTTP client for API communication
- **FontAwesome 6.5.0**: Icon library
- **React Icons 4.12.0**: Additional icon components

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **PostgreSQL**: Primary database (with SQLite fallback)
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **Python-Jose**: JWT authentication
- **Passlib**: Password hashing

### Infrastructure
- **Render**: Cloud deployment platform
- **PostgreSQL**: Cloud database hosting
- **CORS**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
POS/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main application entry point
│   ├── api.py              # API route definitions
│   ├── models.py           # Database models
│   ├── database.py         # Database configuration
│   ├── requirements.txt    # Python dependencies
│   ├── env.example         # Environment variables template
│   └── render.yaml         # Deployment configuration
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── HomeDashboard.jsx
│   │   ├── IssueCardForm.jsx
│   │   ├── AddProduct.jsx
│   │   ├── Login.jsx
│   │   └── ... (other components)
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx
│   ├── services/          # API service functions
│   │   └── api.js
│   ├── App.jsx           # Main application component
│   └── index.jsx         # Application entry point
├── package.json          # Node.js dependencies
└── index.html           # HTML template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL (or SQLite for development)

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

5. **Start the server**
   ```bash
   python main.py
   # Or with uvicorn directly:
   uvicorn main:app --host 0.0.0.0 --port 8001 --reload
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/pos_db

# API Keys
POS_API_KEY=pos_secret_key
CRM_API_KEY=mysecretkey

# CRM Backend URL
CRM_BASE_URL=https://crm-n577.onrender.com

# Server Configuration
PORT=8001
HOST=0.0.0.0
```

### Frontend Configuration

Update the API base URL in `src/components/api.js`:

```javascript
const BASE_URL = "http://127.0.0.1:8000";  // Development
// const BASE_URL = "https://your-production-url.com";  // Production
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration

### Card Operations
- `POST /api/cards/issue` - Issue new card
- `POST /api/cards/{id}/reload` - Reload card balance
- `GET /api/cards/{id}/balance` - Get card balance
- `GET /api/cards/{id}/transactions` - Get card transactions

### Product Management
- `POST /api/cards/{id}/products` - Add product to card
- `POST /api/payment/simulate` - Simulate payment processing

### Customer Management
- `GET /api/customers/{id}` - Get customer information

### Reporting
- `GET /api/reports/summary` - Get system reports summary

### Simulation
- `POST /api/simulate/cardTap` - Simulate card tap events

## 🎯 Usage Guide

### Basic Workflow

1. **Login**: Access the system with your credentials
2. **Dashboard**: View main menu options and system status
3. **Card Operations**: Issue, reload, or check card balances
4. **Product Sales**: Add transit passes or stored value to cards
5. **Customer Service**: Look up customer information and manage accounts
6. **Reporting**: Generate reports and view analytics

### Key Features

- **NFC Card Reading**: Tap cards on reader for instant identification
- **Multiple Payment Methods**: Support for cash and card payments
- **Receipt Printing**: Automatic receipt generation for all transactions
- **Real-time Updates**: Live balance and transaction updates
- **Error Handling**: Comprehensive error messages and recovery options

## 🚀 Deployment

### Render Deployment

The backend is configured for deployment on Render:

1. **Connect Repository**: Link your GitHub repository to Render
2. **Environment Variables**: Set required environment variables
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Frontend Deployment

Deploy the React frontend to any static hosting service:

1. **Build**: `npm run build`
2. **Upload**: Deploy the `dist` folder to your hosting service
3. **Configure**: Update API endpoints for production

## 🔧 Development

### Adding New Features

1. **Backend**: Add new endpoints in `backend/api.py`
2. **Frontend**: Create new components in `src/components/`
3. **Database**: Update models in `backend/models.py`
4. **Testing**: Add tests in `backend/test_api.py`

### Code Style

- **Frontend**: Use functional components with hooks
- **Backend**: Follow FastAPI best practices
- **Database**: Use SQLAlchemy ORM patterns
- **API**: RESTful design with consistent response formats

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Check DATABASE_URL in environment variables
2. **API Key Errors**: Verify POS_API_KEY and CRM_API_KEY are set correctly
3. **CORS Issues**: Ensure CORS middleware is properly configured
4. **Port Conflicts**: Check if ports 5173 (frontend) and 8001 (backend) are available

### Error Messages

- **"Invalid API key"**: Check your API key configuration
- **"Database connection failed"**: Verify database URL and credentials
- **"Card not found"**: Ensure card exists in the system
- **"Payment failed"**: Check payment method and transaction details



---

**Built with ❤️ for efficient transit management** 
