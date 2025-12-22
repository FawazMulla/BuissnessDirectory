# 🏢 Esypto - Modern Business Directory Platform

<div align="center">

![Esypto Logo](https://img.shields.io/badge/Esypto-Business%20Directory-22c55e?style=for-the-badge&logo=building&logoColor=white)

**A professional, modern business directory platform built with Django**

[![Django](https://img.shields.io/badge/Django-6.0-092E20?style=flat&logo=django&logoColor=white)](https://djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python&logoColor=white)](https://python.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat)](README.md)

</div>

## 🌟 Overview

Esypto is a cutting-edge business directory platform that connects professionals and businesses through an intuitive, modern interface. Built with Django and featuring a professional green color scheme, it provides comprehensive business profiles, photo galleries, interactive maps, and seamless user experience across all devices.

## ✨ Key Features

### 🎨 Modern Design System
- **Professional Green Theme**: Corporate forest green (#22c55e) color palette
- **Glassmorphism UI**: Modern glass-effect components with backdrop blur
- **Dark/Light Mode**: Fully functional theme toggle with smooth transitions
- **Responsive Design**: Mobile-first approach with perfect tablet and desktop layouts
- **Smooth Animations**: Professional transitions and hover effects

### 🏢 Business Management
- **Comprehensive Profiles**: Complete business information with contact details
- **Photo Galleries**: Multiple business photos with modal viewer and navigation
- **Interactive Maps**: Real Google Maps integration with multiple format support
- **Category System**: Organized business categories (Medical, Food, etc.)
- **Search & Discovery**: Advanced search and filtering capabilities

### 👥 User Experience
- **User Authentication**: Secure registration, login, and password management
- **Dashboard**: Personalized user dashboard for business management
- **Contact System**: Built-in contact forms and communication tools
- **Social Sharing**: Share businesses across social platforms
- **Mobile Optimized**: Touch-friendly interactions and responsive design

### 🔧 Technical Excellence
- **Django 6.0**: Latest Django framework with modern features
- **Database Models**: Optimized models for businesses and galleries
- **Admin Interface**: Professional Django admin with inline gallery management
- **Static Files**: Optimized CSS/JS with collectstatic deployment
- **Security**: CSRF protection, secure authentication, and data validation

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/esypto.git
   cd esypto
   ```

2. **Create Virtual Environment**
   ```bash
   python -m venv venv
   ```

3. **Activate Virtual Environment**
   
   **Windows (CMD):**
   ```cmd
   venv\Scripts\activate
   ```
   
   **Windows (PowerShell):**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   
   **macOS/Linux:**
   ```bash
   source venv/bin/activate
   ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create Superuser (Optional)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Collect Static Files**
   ```bash
   python manage.py collectstatic --noinput
   ```

8. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

9. **Access the Application**
   - Main Site: http://127.0.0.1:8000/
   - Admin Panel: http://127.0.0.1:8000/admin/

## 📁 Project Structure

```
esypto/
├── buisdict/                 # Main business directory app
│   ├── templates/           # HTML templates
│   ├── models.py           # Core models
│   ├── views.py            # Business logic
│   └── urls.py             # URL routing
├── users/                   # User management app
│   ├── templates/          # User-related templates
│   ├── models.py           # User and business models
│   ├── views.py            # User views
│   └── admin.py            # Admin configuration
├── static/                  # Static files
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── media/                   # User uploads
│   └── images_uploaded/    # Business images
├── my_project/             # Django project settings
│   ├── settings.py         # Configuration
│   └── urls.py             # Main URL routing
├── requirements.txt         # Python dependencies
└── manage.py               # Django management script
```

## 🎨 Design System

### Color Palette
- **Primary**: Forest Green (#22c55e) - Professional, trustworthy
- **Secondary**: Dark Green (#16a34a) - Strong, reliable
- **Accent**: Emerald (#10b981) - Fresh, modern
- **Grays**: Professional gray scale for text and backgrounds
- **Status Colors**: Orange for warnings, red for errors

### Typography
- **Font Family**: Inter - Modern, professional sans-serif
- **Responsive Sizing**: Clamp-based scaling for all screen sizes
- **Weight Hierarchy**: 300-800 weights for proper information hierarchy

### Components
- **Glassmorphism Cards**: Semi-transparent cards with backdrop blur
- **Professional Buttons**: Multiple variants (primary, secondary, outline)
- **Interactive Elements**: Smooth hover effects and transitions
- **Form Controls**: Modern input fields with focus states

## 🗺️ Features Deep Dive

### Photo Gallery System
- **Multiple Images**: Businesses can upload multiple photos
- **Modal Viewer**: Full-screen photo viewing with navigation
- **Keyboard Support**: Arrow keys and Escape key navigation
- **Mobile Optimized**: Touch-friendly gallery interactions
- **Admin Integration**: Easy gallery management through Django admin

### Google Maps Integration
- **Real Embedded Maps**: Actual Google Maps showing business locations
- **Multiple Formats**: Supports embed links, regular maps links, and addresses
- **Interactive Features**: Zoom, pan, and full map interactions
- **Action Buttons**: Get directions, share location, open in Google Maps
- **Responsive Design**: Perfect scaling on all devices

### Theme System
- **Light/Dark Modes**: Complete theme switching functionality
- **Persistent Settings**: Theme preference saved in localStorage
- **Smooth Transitions**: Animated theme changes
- **Accessibility**: Proper contrast ratios and focus states
- **Professional Styling**: Corporate-appropriate color schemes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database Configuration
The project uses SQLite by default. For production, configure PostgreSQL or MySQL in `settings.py`.

### Static Files
Static files are served from the `staticfiles/` directory after running `collectstatic`.

### Media Files
User uploads are stored in the `media/` directory.

## 🚀 Deployment

### Production Checklist
- [ ] Set `DEBUG = False` in settings
- [ ] Configure proper database (PostgreSQL recommended)
- [ ] Set up static file serving (nginx/Apache)
- [ ] Configure media file serving
- [ ] Set up SSL certificates
- [ ] Configure environment variables
- [ ] Run security checks: `python manage.py check --deploy`

### Recommended Stack
- **Web Server**: nginx
- **WSGI Server**: Gunicorn
- **Database**: PostgreSQL
- **Caching**: Redis
- **Static Files**: nginx or CDN

## 🧪 Testing

Run the test suite:
```bash
python manage.py test
```

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, Flexbox, CSS Custom Properties, Backdrop Filter

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Django Documentation](https://docs.djangoproject.com/)
- [Project Wiki](https://github.com/yourusername/esypto/wiki)

### Getting Help
- Create an [Issue](https://github.com/yourusername/esypto/issues) for bugs
- Start a [Discussion](https://github.com/yourusername/esypto/discussions) for questions
- Check existing issues before creating new ones

### Common Issues
- **Static files not loading**: Run `python manage.py collectstatic`
- **Database errors**: Run migrations with `python manage.py migrate`
- **Permission errors**: Check file permissions in media directory

## 🎯 Roadmap

### Upcoming Features
- [ ] Advanced search filters
- [ ] Business reviews and ratings
- [ ] Email notifications
- [ ] API endpoints
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added photo gallery system
- **v1.2.0** - Enhanced Google Maps integration
- **v1.3.0** - Dark mode and theme system

## 👨‍💻 Authors

- **Development Team** - *Initial work and ongoing development*

## 🙏 Acknowledgments

- Django community for the excellent framework
- Font Awesome for the icon library
- Google Fonts for the Inter font family
- Contributors and testers

---

<div align="center">

**Built with ❤️ for the modern business world**

[⭐ Star this repo](https://github.com/yourusername/esypto) | [🐛 Report Bug](https://github.com/yourusername/esypto/issues) | [💡 Request Feature](https://github.com/yourusername/esypto/issues)

</div>