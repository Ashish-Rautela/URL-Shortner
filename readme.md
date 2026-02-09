# 🔗 URL Shortener Backend

> A production-grade URL shortening service built with Node.js, Express, and MongoDB. Deployed on AWS EC2 with PM2 process management, Nginx reverse proxy, and Let's Encrypt SSL.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-v4+-green.svg)](https://www.mongodb.com/)

## 🌐 Live Demo

- **API Endpoint**: [https://api.ashishrautela.in](https://api.ashishrautela.in)
- **Frontend**: [https://ashishrautela.in](https://ashishrautela.in)

---

## ✨ Features

- ✅ **URL Shortening** - Convert long URLs into short, shareable links
- 🔄 **Smart Deduplication** - Reuses existing short URLs for duplicate long URLs
- ⚡ **Fast Redirects** - Optimized database queries with indexed lookups
- 🌍 **CORS Enabled** - Seamless frontend integration across origins
- 🔒 **HTTPS Secure** - SSL/TLS encryption via Let's Encrypt
- 🚀 **Production Ready** - PM2 process management with auto-restart
- 🔁 **Nginx Reverse Proxy** - Professional routing and load balancing
- ☁️ **AWS EC2 Hosted** - Scalable cloud infrastructure

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### DevOps & Infrastructure
- **AWS EC2** - Cloud server (Ubuntu)
- **Nginx** - Reverse proxy server
- **PM2** - Production process manager
- **Certbot** - SSL certificate management
- **GitHub** - Version control

---

## 📁 Project Structure

```
url-shortener-backend/
│
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server entry point
│   ├── routes/
│   │   └── index.js        # API route definitions
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── models/             # Database models
│   └── .env                # Environment variables (not in repo)
│
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashish-Rautela/url-shortener-backend.git
   cd url-shortener-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `src/` directory:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/urlshortener
   BASE_URL=http://localhost:4000/url
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   Server will run at: `http://localhost:4000`

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

**Behavior**: Redirects (301) to the original long URL

---

## 🔄 Deduplication Logic

The system intelligently handles duplicate URLs:

- ✅ **Existing URL**: Returns the previously generated short URL
- 🆕 **New URL**: Generates a fresh short ID and stores it

This prevents database bloat and ensures consistency.

---

## ☁️ Production Deployment

### AWS EC2 Setup

1. **Launch EC2 Instance** (Ubuntu 22.04 LTS)
2. **Install dependencies**:
   ```bash
   sudo apt update
   sudo apt install nodejs npm nginx certbot python3-certbot-nginx
   ```

3. **Clone and setup project**:
   ```bash
   git clone https://github.com/Ashish-Rautela/url-shortener-backend.git
   cd url-shortener-backend
   npm install
   ```

### PM2 Process Management

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application
pm2 start src/server.js --name url-backend

# Save PM2 configuration
pm2 save

# Enable auto-restart on system reboot
pm2 startup
```

### Nginx Configuration

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
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/api.ashishrautela.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Certificate (HTTPS)

```bash
sudo certbot --nginx -d api.ashishrautela.in
```

Certbot will automatically:
- Issue SSL certificates
- Configure Nginx for HTTPS
- Set up auto-renewal

---

## 🌐 Domain Configuration

| Domain | Purpose | Points To |
|--------|---------|-----------|
| `ashishrautela.in` | Frontend (GitHub Pages) | GitHub Pages server |
| `api.ashishrautela.in` | Backend API | AWS EC2 IP address |
| `/url/:id` | URL redirection | Express route handler |

---

## 🛠️ Useful Commands

### PM2 Management
```bash
pm2 list                    # View all processes
pm2 logs url-backend        # View logs
pm2 restart url-backend     # Restart app
pm2 stop url-backend        # Stop app
pm2 delete url-backend      # Remove from PM2
```

### Nginx
```bash
sudo nginx -t               # Test configuration
sudo systemctl restart nginx # Restart Nginx
sudo systemctl status nginx  # Check status
```

### SSL Certificate Renewal
```bash
sudo certbot renew          # Manual renewal
sudo certbot renew --dry-run # Test renewal
```

---

## 🐛 Troubleshooting

### CORS Errors
**Solution**: Ensure CORS is enabled in `app.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

### 404 Errors on Domain
**Solution**: Verify Nginx proxy configuration points to correct port (4000)

### PM2 Not Auto-Restarting
**Solution**: Reset PM2 configuration:
```bash
pm2 delete all
pm2 start src/server.js --name url-backend
pm2 save
pm2 startup
```

### MongoDB Connection Issues
**Solution**: Check `MONGO_URI` in `.env` file and ensure MongoDB is running

---

## 🔮 Future Enhancements

- [ ] 📊 **Analytics Dashboard** - Track clicks, referrers, and geographic data
- [ ] 🔐 **Rate Limiting** - Prevent API abuse
- [ ] 👤 **User Authentication** - Enable custom short URLs
- [ ] 🏥 **Health Check Endpoint** - `/health` for monitoring
- [ ] 🐳 **Docker Support** - Containerized deployment
- [ ] 📱 **QR Code Generation** - Visual short URL sharing
- [ ] ⏰ **Expiration Dates** - Time-limited short URLs

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ashish Rautela**

- 🌐 Portfolio: [ashishrautela.in](https://ashishrautela.in)
- 💼 GitHub: [@Ashish-Rautela](https://github.com/Ashish-Rautela)
- 📧 Email: contact@ashishrautela.in

---

## 🙏 Acknowledgments

- Built with best practices from real-world production systems
- Inspired by modern DevOps workflows
- Designed for learners seeking industry-grade examples

---

## ⭐ Show Your Support

If this project helped you learn backend development or deployment, please give it a star! ⭐

---

<div align="center">

**Built with ❤️ by Ashish Rautela**

*Production-tested | Scalable | Industry-grade*

</div>