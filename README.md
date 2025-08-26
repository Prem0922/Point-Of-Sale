# POS Application

A Point of Sale system for transit card operations, built with FastAPI backend and React frontend. The POS system acts as a proxy to the CRM backend, providing standardized responses and additional logging.

## 🏗️ Architecture

- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Frontend**: React + JavaScript + CSS Modules
- **Database**: PostgreSQL (with POSLog for audit trails)
- **Proxy**: Acts as gateway to CRM backend with standardized response format
- **Authentication**: API key-based security

## 📁 Project Structure

```
POS/
├── backend/                 # FastAPI backend
│   ├── __init__.py
│   ├── main.py             # FastAPI app entry point
│   ├── api.py              # Main API routes and logic
│   ├── models.py           # SQLAlchemy database models
│   ├── database.py         # Database connection and session
│   ├── test_api.py         # API testing utilities
│   ├── requirements.txt    # Python dependencies
│   ├── env.example         # Environment variables template
│   └── render.yaml         # Render deployment configuration
├── src/                    # React frontend
│   ├── components/         # UI components
│   │   ├── AddProduct*.jsx # Product management components
│   │   ├── CardBalance.jsx # Card balance checking
│   │   ├── CustomerLookup.jsx # Customer search
│   │   ├── IssueCardForm.jsx # Card issuance
│   │   ├── Login.jsx       # Authentication
│   │   ├── Reports.jsx     # Reporting interface
│   │   └── Sidebar.jsx     # Navigation
│   ├── context/            # React context providers
│   │   └── AuthContext.jsx # Authentication state
│   ├── services/           # API service layer
│   │   └── api.js          # Axios-based API client
│   ├── App.jsx             # Main app component
│   └── index.jsx           # Entry point
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **npm or yarn**
- **PostgreSQL** (recommended)
- **CRM Backend** running (required for POS operations)

### 1. Backend Setup

#### Clone and Navigate
```bash
cd POS/backend
```

#### Create Virtual Environment
**Windows:**
```bash
python -m venv .venv
.\.venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Environment Configuration
Create a `.env` file in `POS/backend/`:
```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/pos_db

# CRM Backend Configuration
CRM_BASE_URL=http://127.0.0.1:8000
CRM_API_KEY=your_crm_api_key_here

# POS API Security
POS_API_KEY=your_pos_api_key_here
```

#### Initialize Database
```bash
# Create tables and schema
python -c "from database import engine, Base; Base.metadata.create_all(bind=engine)"
```

#### Run Backend Server
```bash
python -m uvicorn main:app --reload --port 8001
```

**Backend will be available at:**
- API Base: `http://127.0.0.1:8001`
- Swagger Docs: `http://127.0.0.1:8001/docs`
- ReDoc: `http://127.0.0.1:8001/redoc`
- Health Check: `http://127.0.0.1:8001/health`

### 2. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd POS
```

#### Install Dependencies
```bash
npm install
```

#### Run Development Server
```bash
npm start
# or
npm run dev
```

**Frontend will be available at:**
- `http://localhost:3000` (React default port)

#### Build for Production
```bash
npm run build
```

## 🗄️ Database Models

### Core Entities

- **POSLog**: Audit trail for all POS operations
  - `operation`: Type of operation performed
  - `card_id`: Card involved in operation
  - `customer_id`: Customer involved
  - `amount`: Transaction amount
  - `status`: Operation result
  - `transaction_id`: Unique transaction identifier
  - `robot_run_id`: Automation run identifier
  - `timestamp`: When operation occurred
  - `details`: Additional operation details

### Database Schema
```sql
-- POS Logs table
pos_logs:
  - id (PK): Auto-incrementing integer
  - operation: "issue_card", "reload", "add_product", etc.
  - card_id: "4716000000000001"
  - customer_id: "CUST000001"
  - amount: "25.00"
  - status: "success" or "error"
  - transaction_id: "uuid-string"
  - robot_run_id: "optional-automation-id"
  - timestamp: "2024-01-15T10:30:00Z"
  - details: "Card issued successfully"
```

## 🔌 API Endpoints

### Security
All endpoints require header: `x-api-key: <POS_API_KEY>`

### Core Operations
- `POST /api/cards/issue` - Issue new transit card
- `POST /api/cards/{card_id}/reload` - Add funds to card
- `POST /api/cards/{card_id}/products` - Add transit products
- `GET /api/cards/{card_id}/balance` - Check card balance
- `POST /api/payment/simulate` - Simulate payment processing

### Customer Operations
- `GET /api/customers/{customer_id}` - Get customer information

### Transaction Operations
- `GET /api/cards/{card_id}/transactions` - Get card transaction history
- `GET /api/reports/summary` - Get system summary reports

### Simulation
- `POST /api/simulate/cardTap` - Simulate card tap event

### System
- `GET /health` - Health check endpoint
- `GET /` - Root endpoint with available operations

## 🔄 Response Format

All POS endpoints return standardized responses:

```json
{
  "status": "success" | "error",
  "timestamp": "2024-01-15T10:30:00Z",
  "transactionId": "uuid-string",
  "robotRunId": "optional-automation-id",
  "message": "Operation description",
  "data": {
    // Operation-specific data
  }
}
```

## 🧪 Testing

### Backend Testing
```bash
cd POS/backend

# Test health endpoint
curl http://127.0.0.1:8001/health

# Test API key authentication
curl -H "x-api-key: your_pos_api_key" http://127.0.0.1:8001/

# Test without API key (should fail)
curl http://127.0.0.1:8001/
```

### API Testing Script
```bash
cd POS/backend

# Run comprehensive API tests
python test_api.py
```

### Frontend Testing
1. Open `http://localhost:3000` in browser
2. Navigate through different components
3. Test card operations
4. Verify API calls in browser dev tools

### Integration Testing
```bash
# Ensure CRM backend is running on port 8000
curl http://127.0.0.1:8000/

# Test POS proxy to CRM
curl -H "x-api-key: your_pos_api_key" \
     -H "Content-Type: application/json" \
     -d '{"card_id":"4716000000000001","amount":25.0}' \
     http://127.0.0.1:8001/api/cards/4716000000000001/reload
```

## 🔧 Configuration

### Backend Configuration
- **Database**: Configure via `DATABASE_URL` environment variable
- **CRM Integration**: Set `CRM_BASE_URL` and `CRM_API_KEY`
- **POS Security**: Set `POS_API_KEY` for endpoint protection
- **CORS**: Configured for development (allows all origins)

### Frontend Configuration
- **API Base URL**: Configured to call POS backend
- **Authentication**: API key-based via headers
- **Routing**: Component-based navigation

## 🚨 Troubleshooting

### Common Issues

#### POS Backend Won't Start
```bash
# Check if port 8001 is available
netstat -an | grep 8001

# Check Python version
python --version

# Verify virtual environment
which python
```

#### CRM Connection Issues
```bash
# Test CRM connectivity
curl http://127.0.0.1:8000/

# Verify CRM_BASE_URL and CRM_API_KEY
echo $CRM_BASE_URL
echo $CRM_API_KEY
```

#### Database Connection Issues
```bash
# Test database connection
python -c "from database import engine; print(engine.url)"

# Recreate database schema
python -c "from database import engine, Base; Base.metadata.create_all(bind=engine)"
```

#### Frontend Build Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### API Authentication Errors
- Verify `x-api-key` header is sent
- Check `POS_API_KEY` environment variable
- Ensure backend is running on correct port

### Debug Mode
```bash
# Backend with debug logging
python -m uvicorn main:app --reload --port 8001 --log-level debug

# Frontend with verbose logging
npm start -- --verbose
```

## 📊 Monitoring

### Health Checks
- Backend: `GET /health`
- CRM Integration: Verify CRM backend connectivity
- Database: Check connection status

### Logs
- Backend: FastAPI logging
- Database: POSLog table for audit trails
- Frontend: Browser console logs

### Audit Trail
All operations are logged to the `POSLog` table with:
- Operation type and details
- Success/failure status
- Transaction IDs for tracking
- Timestamps for chronological analysis

## 🚀 Deployment

### Production Considerations
1. **Environment Variables**: Set all secrets via environment
2. **Database**: Use PostgreSQL with proper credentials
3. **CRM Integration**: Ensure CRM backend is accessible
4. **CORS**: Restrict to production domains
5. **Logging**: Enable structured logging
6. **Security**: Rotate API keys regularly

### Render Deployment
The project includes `render.yaml` for easy deployment:

```yaml
services:
  - type: web
    name: pos-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: DATABASE_URL
        value: postgresql://...
      - key: CRM_BASE_URL
        value: https://crm-backend.onrender.com
      - key: CRM_API_KEY
        sync: false
      - key: POS_API_KEY
        sync: false
```

### Docker (Optional)
```dockerfile
# Example Dockerfile for backend
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

## 🔗 CRM Integration

### How It Works
1. POS receives requests from frontend
2. POS validates `x-api-key` header
3. POS forwards request to CRM backend
4. CRM processes the operation
5. POS wraps CRM response in standardized format
6. POS logs the operation to `POSLog` table

### Required CRM Endpoints
- `POST /cards/issue`
- `POST /cards/{id}/reload`
- `POST /cards/{id}/products`
- `GET /cards/{id}/balance`
- `POST /payment/simulate`
- `GET /customers/{id}`
- `GET /cards/{id}/transactions`
- `GET /reports/summary`
- `POST /simulate/cardTap`


