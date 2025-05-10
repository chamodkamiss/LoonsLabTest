# Movie Explorer 🎬

A modern React application for discovering, searching, and tracking your favorite movies powered by TMDB API.

## 🌟 Features

- Browse trending movies
- Search movies by title
- Filter movies by genre, year, and rating
- View detailed movie information including trailers
- Save favorite movies
- Dark/Light mode theme
- Responsive design for all devices
- User authentication
- Modern UI with Material Design

## 🛠️ Built With

- React 19
- Material-UI v7
- React Router v7
- Axios
- Vite
- TMDB API

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm/yarn
- TMDB API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/movie-explorer.git
cd movie-explorer
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key
```env
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## 📱 Usage

- **Browse Movies**: View trending movies on the home page
- **Search**: Use the search bar to find specific movies
- **Filters**: Apply filters to discover movies by genre, year, and rating
- **Favorites**: Save movies to your favorites list (requires login)
- **Movie Details**: Click on a movie to view detailed information including:
  - Overview
  - Cast
  - Trailer
  - Ratings
  - Release date
  - Budget and revenue

## 🎨 Features Details

### Authentication
- Simple email/password authentication
- User profile with avatar
- Persistent login state

### Movie Discovery
- Trending movies section
- Advanced filtering options
- Infinite scroll with "Load More" functionality
- Detailed movie information

### User Interface
- Responsive design for mobile, tablet, and desktop
- Dark/Light mode theme toggle
- Modern Material Design components
- Smooth animations and transitions
- Loading states and error handling

## 🔧 Configuration

### Environment Variables
```env
VITE_TMDB_API_KEY=your_api_key_here
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for providing movie data
- [Material-UI](https://mui.com/) for the component library
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool

## 👤 Author

Your Name
- GitHub: [@chamodkamiss](https://github.com/chamodkamiss)
- LinkedIn: [Chamod Kamiss](https://linkedin.com/in/chamodkamiss)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Project Structure

```
movie-explorer/
├── src/
│   ├── api/           # API integration
│   ├── components/    # Reusable components
│   ├── context/       # Context providers
│   ├── pages/         # Page components
│   └── App.jsx        # Root component
├── public/            # Static assets
└── index.html         # Entry HTML file
```
