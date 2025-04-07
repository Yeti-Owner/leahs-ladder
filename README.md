
# Leah's Ladder

## Overview

Leah's Ladder is a short interactive game that helps decide what to watch or play next. It uses a Tinder-style swiping followed by head-to-head matchups to rank preferences and make decision-making simple.

![Leah's Ladder Demo](./src/assets/screenshot.png)

## 🌟 Features

- **Tinder-Style Swiping**: Approve or reject each option with easy swipes
- **Smart Matchups**: Compare remaining options in head-to-head battles
- **Personalized Rankings**: Get a sorted list of your preferences at the end
- **Easy Customization**: Add/remove options with just a few lines of code
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Access the Game

Play the live version at: [https://yeti-owner.github.io/leahs-ladder/](https://yeti-owner.github.io/leahs-ladder/)

### How to Play

1. Select which categories to include
2. Swipe right to keep or left to reject each option
3. Compare remaining options in 1v1 matchups
4. View your personalized ranking of all options

## 💻 Technologies Used

- React
- Vite
- GitHub Pages (Hosting)

## ➕ Adding New Options

1. Edit `/src/optionsData.js`:
```javascript
{
    title: "Option name",
    description: "Option description.",
    image: option_image_reference,
    tags: ["what catagory it is"]
  }
```
2. Add corresponding image to `/src/assets/`

## 🤝 Contributing

Want to contribute? Follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [GitHub Pages](https://pages.github.com/)

## 📬 Contact

GitHub: [Yeti-Owner](https://github.com/Yeti-Owner)

Project Link: [https://github.com/Yeti-Owner/leahs-ladder](https://github.com/Yeti-Owner/leahs-ladder)

**Created with ❤️ for Leah**
```