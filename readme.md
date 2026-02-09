# 🔗 URL Shortener – Full Stack Project

> A complete full-stack URL shortening application featuring a React frontend and Node.js backend, deployed on AWS EC2 with production-grade infrastructure including Nginx reverse proxy, PM2 process management, and Let's Encrypt SSL.

[![Live Demo](https://img.shields.io/badge/demo-live-success.svg)](https://ashishrautela.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18+-blue.svg)](https://reactjs.org/)

## 🌐 Live Links

- **Frontend**: 👉 [[https://ashishrautela.in](https://ashishrautela.in/URL_Shortner)]
- **Backend API**: 👉 [[https://api.ashishrautela.in](https://api.ashishrautela.in/url/)]

---

## ✨ Features

### Frontend
- ✅ **Clean & Responsive UI** - Modern, mobile-friendly design
- 🎯 **Instant URL Shortening** - Real-time short URL generation
- 📋 **Copy to Clipboard** - One-click URL copying
- ⚙️ **Environment-Based Config** - Seamless development and production modes
- 🎨 **User-Friendly Interface** - Intuitive and accessible

### Backend
- 🔗 **URL Shortening** - Convert long URLs to short, shareable links
- 🚀 **Fast Redirects** - Efficient redirection to original URLs
- 🔄 **Duplicate Prevention** - Smart handling of existing URLs
- 💾 **MongoDB Persistence** - Reliable data storage
- 🌍 **CORS Enabled** - Cross-origin support for frontend
- ⚡ **Production Ready** - Optimized for scalability and performance

---

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript (ES6+)** - Programming language
- **Axios / Fetch API** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### Deployment & DevOps
- **AWS EC2** - Cloud hosting (Ubuntu)
- **Nginx** - Reverse proxy & web server
- **PM2** - Process manager
- **Certbot** - SSL/TLS certificates (Let's Encrypt)
- **GitHub** - Version control

---

## 📁 Project Structure

```
URL_SHORTNER/
│
├── backend/
│   ├── config/            # DB & environment configuration
│   ├── controller/        # Request handlers
│   ├── loadBalancer/      # Load balancing / scaling logic
│   ├── model/             # MongoDB schemas
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── src/               # Server entry / app setup
│   ├── package.json
│   ├── .env               # Environment variables (not in repo)
│   └── .gitignore
│
├── frontend/
│   └── url-shortner/
│       ├── build/         # Production build
│       ├── public/        # Static assets
│       ├── src/           # React components & logic
│       ├── package.json
│       └── .gitignore
│
├── README.md              # Project documentation
└── .gitignore
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ashish-Rautela/URL_SHORTNER.git
cd URL_SHORTNER
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:3000/url
```

Start the backend server:

```bash
npm start
```

Backend will run at: `http://localhost:4000`

### 3️⃣ Frontend Setup

```bash
cd frontend/url-shortner
npm install
```

Update API endpoint in frontend configuration (if needed)

Start the frontend development server:

```bash
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 📡 API Documentation

### Shorten URL

**Endpoint**: `POST /url/shorten`

**Request Body**:
```json
{
  "url": "https://www.example.com/very/long/url/path"
}
```

**Response**:
```json
{
  "shortUrl": "https://ashishrautela.in/url/2I"
}
```

---

### Redirect to Original URL

**Endpoint**: `GET /url/:shortId`

**Example**: `https://ashishrautela.in/url/2I`

**Behavior**: HTTP 301 redirect to the original long URL

---

## ⚙️ Environment Variables

### Backend Configuration

Create `backend/.env`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
BASE_URL=https://ashishrautela.in/url
```

⚠️ **Security Note**: Never commit `.env` files to version control

### Frontend Configuration

Update API base URL in your React app configuration based on environment:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
```

---

## ☁️ Production Deployment

### AWS EC2 Backend Setup

1. **Launch EC2 Instance** (Ubuntu 22.04 LTS)

2. **Install Dependencies**:
```bash
sudo apt update
sudo apt install nodejs npm nginx certbot python3-certbot-nginx mongodb
```

3. **Clone and Setup**:
```bash
git clone https://github.com/Ashish-Rautela/URL_SHORTNER.git
cd URL_SHORTNER/backend
npm install
```

4. **Configure Environment**:
```bash
nano .env
# Add production MongoDB URI and BASE_URL
```

### PM2 Process Management

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start backend with PM2
cd backend
pm2 start src/server.js --name url-backend

# Save PM2 configuration
pm2 save

# Enable auto-restart on reboot
pm2 startup
```

### Nginx Configuration

#### Backend API Configuration

Create `/etc/nginx/sites-available/api.ashishrautela.in`:

```nginx
server {
    server_name api.ashishrautela.in;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Frontend Configuration

Create `/etc/nginx/sites-available/ashishrautela.in`:

```nginx
server {
    server_name ashishrautela.in www.ashishrautela.in;
    root /var/www/ashishrautela.in/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /url/ {
        proxy_pass http://localhost:4000/url/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Enable sites:
```bash
sudo ln -s /etc/nginx/sites-available/api.ashishrautela.in /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/ashishrautela.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Frontend Build & Deployment

```bash
cd frontend/url-shortner
npm run build

# Copy build to web server directory
sudo mkdir -p /var/www/ashishrautela.in
sudo cp -r build/* /var/www/ashishrautela.in/
```

### SSL Certificate Setup

```bash
# For API subdomain
sudo certbot --nginx -d api.ashishrautela.in

# For main domain
sudo certbot --nginx -d ashishrautela.in -d www.ashishrautela.in
```

Auto-renewal is configured automatically by Certbot.

---

## 🔄 Duplicate URL Handling

The system intelligently manages duplicate URLs:

- ✅ **Existing URL Found**: Returns the previously generated short URL
- 🆕 **New URL**: Generates a unique short ID and stores it
- 💡 **Benefits**: Prevents database bloat and ensures consistency

---

## 🌐 Domain Architecture

| Domain | Purpose | Backend | Technology |
|--------|---------|---------|------------|
| `ashishrautela.in` | Frontend UI | N/A | React (Static) |
| `api.ashishrautela.in` | REST API | Port 4000 | Node.js/Express |
| `/url/:shortId` | URL Redirect | Port 4000 | Express Route |

---

## 🛠️ Useful Commands

### PM2 Management
```bash
pm2 list                    # List all processes
pm2 logs url-backend        # View application logs
pm2 restart url-backend     # Restart backend
pm2 stop url-backend        # Stop backend
pm2 delete url-backend      # Remove from PM2
pm2 monit                   # Monitor resources
```

### Nginx Commands
```bash
sudo nginx -t               # Test configuration
sudo systemctl restart nginx # Restart Nginx
sudo systemctl status nginx  # Check Nginx status
sudo systemctl reload nginx  # Reload configuration
```

### SSL Certificate Management
```bash
sudo certbot renew          # Renew certificates
sudo certbot renew --dry-run # Test renewal process
sudo certbot certificates    # List all certificates
```

### MongoDB Commands
```bash
sudo systemctl status mongodb # Check MongoDB status
sudo systemctl start mongodb  # Start MongoDB
mongo                        # Open MongoDB shell
```

---

## 🐛 Troubleshooting

### API Works Locally But Not on Domain

**Symptoms**: API responds on `localhost:4000` but not `api.ashishrautela.in`

**Solutions**:
1. Check Nginx configuration:
```bash
sudo nginx -t
cat /etc/nginx/sites-enabled/api.ashishrautela.in
```

2. Verify PM2 is running:
```bash
pm2 list
pm2 logs url-backend
```

3. Restart services:
```bash
pm2 restart url-backend
sudo systemctl restart nginx
```

### CORS Errors

**Solution**: Ensure CORS is enabled in backend `app.js`:
```javascript
const cors = require('cors');
app.use(cors({
    origin: ['https://ashishrautela.in', 'http://localhost:3000'],
    credentials: true
}));
```

### Frontend Not Loading

**Solutions**:
1. Check build exists:
```bash
ls -la /var/www/ashishrautela.in/
```

2. Verify Nginx permissions:
```bash
sudo chown -R www-data:www-data /var/www/ashishrautela.in
```

3. Check Nginx error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### MongoDB Connection Failed

**Solutions**:
1. Verify MongoDB is running:
```bash
sudo systemctl status mongodb
```

2. Check connection string in `.env`

3. Test connection:
```bash
mongo --eval "db.adminCommand('ping')"
```

---

## 📈 Future Enhancements

- [ ] 📊 **Click Analytics** - Track clicks, geographic data, and referrers
- [ ] 🎯 **Custom Aliases** - User-defined short URLs
- [ ] ⏰ **URL Expiration** - Time-limited short links
- [ ] 🔐 **Rate Limiting** - API abuse prevention
- [ ] 👤 **User Authentication** - Account-based URL management
- [ ] 🐳 **Docker Support** - Containerized deployment
- [ ] 📱 **QR Code Generation** - Visual sharing options
- [ ] 🔍 **URL Preview** - See destination before clicking
- [ ] 📧 **Email Integration** - Share via email
- [ ] 🌙 **Dark Mode** - Theme customization

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ashish Rautela**

- 🌐 Portfolio: [ashishrautela.in](https://ashishrautela.in)
- 💼 GitHub: [@Ashish-Rautela](https://github.com/Ashish-Rautela)
- 📧 Email: contact@ashishrautela.in
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/ashish-rautela)

---

## 🙏 Acknowledgments

- Built with industry best practices and modern DevOps workflows
- Designed as a learning resource for full-stack development
- Implements production-grade architecture and deployment strategies

---

## 📸 Screenshots

### Frontend Interface
![URL Shortener UI](https://via.placeholder.com/800x400?text=Add+Your+Screenshot)

### API Response
```json
{
  "shortUrl": "https://ashishrautela.in/url/abc123",
  "originalUrl": "https://example.com/very/long/url",
  "createdAt": "2026-02-09T10:30:00Z"
}
```

---

## ⭐ Show Your Support

If this project helped you learn full-stack development or DevOps practices, please give it a star! ⭐

---

<div align="center">

**Built with ❤️ by Ashish Rautela**

*Full Stack | Production Ready | Industry Grade*

[⬆ Back to Top](#-url-shortener--full-stack-project)

</div>
