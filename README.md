# ChaiAdda by Golden Tips

A modern React-based web app designed to induct Gen Z Indians (especially Bengali youth) into premium tea culture. The app serves both e-commerce (buying tea) and free lifestyle content (tea rituals, productivity, memes, music, etc.) with personalization, interactivity, and gamification.

## 🌟 Features

### ☕ E-Commerce Module
- **Product Catalog**: Browse premium Golden Tips teas
- **Product Details**: Comprehensive tea information with AR preview placeholder
- **Shopping Cart**: Full cart functionality with quantity management
- **Checkout**: Mock checkout process ready for payment gateway integration

### 🌱 Lifestyle Features
- **Tea Timer**: Pomodoro-style brewing timer with ambient sounds
- **Wellness Rituals**: Guided tea meditation and wellness practices
- **Daily Quotes**: Bengali and English quotes from Tagore and others
- **Tea Calendar**: Festival-based tea suggestions

### 🎯 Gamification
- **Personality Quiz**: "Which Tea Are You?" quiz with results
- **Tea Trivia**: Educational quiz about tea knowledge
- **Badge System**: Achievement badges for user engagement
- **Progress Tracking**: User stats and milestones

### 📚 Cultural Content
- **Bengali Stories**: Short stories and poetry in Bengali and English
- **Music Player**: Rabindra Sangeet and Lo-Fi Bengali Indie
- **Community Adda**: Social features for tea lovers
- **Cultural Events**: Festival-based tea recommendations

### 👥 Community & Social
- **User Profiles**: Personal tea journey tracking
- **Community Posts**: Share tea moments and experiences
- **Hashtags**: #BongAdda, #ChaiMood, #TeaRitual
- **Language Support**: English and Bengali interface

## 🎨 Design & UX

- **Mobile-First**: Optimized for mobile screens with responsive design
- **Bengali Cultural Elements**: Alpona patterns, Tagore motifs
- **Color Palette**: Amber Gold, Forest Green, Teal, Cream White
- **Typography**: Baloo Da 2, Noto Serif Bengali, Inter fonts
- **Animations**: Smooth transitions and micro-interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 with Chakra UI
- **Routing**: React Router DOM
- **State Management**: React Hooks and Context API
- **Styling**: Chakra UI with custom theme
- **Icons**: React Icons (Feather Icons)
- **Deployment**: Vercel-ready configuration

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cha-adda
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the React app

2. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard

3. **Deploy**
   - Vercel will automatically build and deploy on every push

### Manual Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder**
   - Upload to your hosting provider
   - Configure for SPA routing

## 📁 Project Structure

```
cha-adda/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── Navigation.js
│   ├── data/
│   │   ├── products.json
│   │   ├── rituals.json
│   │   ├── quotes.json
│   │   ├── teaQuizzes.json
│   │   ├── stories.json
│   │   ├── calendar.json
│   │   └── users.json
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Shop.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Rituals.js
│   │   ├── Culture.js
│   │   ├── Adda.js
│   │   ├── Profile.js
│   │   └── Quiz.js
│   ├── App.js
│   ├── index.js
│   └── theme.js
├── package.json
├── vercel.json
└── README.md
```

## 🎯 Key Features Implementation

### Tea Timer
- Custom timer with progress tracking
- Multiple duration presets (3, 4, 5, 7 minutes)
- Meditation prompts and quotes on completion

### Personality Quiz
- Dynamic question rendering
- Result calculation based on answers
- Badge assignment and personality descriptions

### E-commerce
- Product filtering and search
- Category-based navigation
- Cart management with quantity controls
- Mock checkout process

### Cultural Content
- Bengali and English content support
- Festival-based tea recommendations
- Music player integration (placeholder)

## 🔧 Customization

### Theme Colors
Edit `src/theme.js` to customize the color palette:
```javascript
colors: {
  brand: { /* Amber Gold */ },
  tea: { /* Forest Green */ },
  ocean: { /* Teal */ },
  cream: { /* Cream White */ }
}
```

### Content Management
All content is stored in JSON files in `src/data/`:
- `products.json`: Tea products catalog
- `quotes.json`: Daily quotes and wisdom
- `stories.json`: Cultural stories and content
- `calendar.json`: Festival and event data

### Adding New Features
1. Create new page component in `src/pages/`
2. Add route in `src/App.js`
3. Update navigation in `src/components/Navigation.js`
4. Add any required data to JSON files

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 PWA Features

- Service Worker ready
- Manifest file configured
- Offline capability (can be enhanced)
- Install prompt support

## 🔮 Future Enhancements

- **Backend Integration**: Firebase or Express.js backend
- **Payment Gateway**: Stripe or Razorpay integration
- **Real-time Features**: WebSocket for live community features
- **AR Integration**: Real AR preview for tea products
- **Push Notifications**: Tea reminders and updates
- **Dark Mode**: Theme toggle functionality
- **Bengali Keyboard**: In-app Bengali typing support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Golden Tips Tea** for the brand and inspiration
- **Rabindranath Tagore** for cultural wisdom and quotes
- **Bengali Community** for cultural authenticity
- **Chakra UI** for the excellent component library

---

**ChaiAdda** - Where every sip tells a story, and every story connects a community. ☕✨ 