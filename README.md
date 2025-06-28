# Todo App

A modern, feature-rich todo application built with Next.js, TypeScript, and Tailwind CSS. The app provides an intuitive interface for managing tasks, lists, and tags with a clean, minimalist design.

![Todo App Screenshot](screenshot.png)

## Features

- **Task Management**: Create, update, delete, and complete tasks
- **Lists & Organization**: Organize tasks into different lists (Personal, Work, etc.)
- **Tags**: Categorize tasks with colorful tags
- **Subtasks**: Break down tasks into smaller subtasks
- **Due Dates**: Set and track due dates for tasks
- **Views**: Filter tasks by Today, Upcoming, or specific lists
- **Collapsible Sidebar**: Toggle sidebar for more screen space
- **Persistent Storage**: All data is saved locally using localStorage
- **Responsive Design**: Clean, modern UI that works on all screen sizes

## Tech Stack

- **Framework**: [Next.js 15.3.4](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: localStorage with service layer abstraction
- **Icons**: Custom SVG components

## Project Structure

```
todo-app/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main app component
│   └── globals.css     # Global styles
├── components/
│   ├── icons/          # SVG icon components
│   ├── layout/         # Layout components (Sidebar)
│   ├── task/           # Task-related components (TaskPanel)
│   └── todo/           # Todo list components
├── services/
│   └── todoService.ts  # Data service layer
├── types/
│   └── index.ts        # TypeScript type definitions
└── utils/
    └── sampleData.ts   # Sample data for initialization
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture & Design Decisions

### Service Layer Pattern
The app uses a service layer (`todoService.ts`) to abstract data operations. This makes it easy to switch from localStorage to a REST API or GraphQL backend without changing component code.

### Component Architecture
- **Separation of Concerns**: UI components are separated from business logic
- **Reusable Components**: Icons and UI elements are built as reusable components
- **Type Safety**: Full TypeScript support for better developer experience

### State Management
- Uses React's built-in state management with hooks
- Single source of truth in the main `page.tsx` component
- Props drilling for simplicity (can be refactored to use Context API if needed)

### Data Persistence
- localStorage for client-side persistence
- Automatic initialization with sample data on first load
- Service layer handles all CRUD operations

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with default settings

### Deploy on Other Platforms

1. Build the application:
```bash
npm run build
```

2. The build output will be in the `.next` folder

3. Deploy to your platform of choice:
   - **Netlify**: Use `next export` for static export
   - **Docker**: Create a Dockerfile with Node.js base image
   - **Traditional hosting**: Use Node.js with `npm start`

### Environment Variables

Currently, no environment variables are required. When adding backend API support, create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your-api-url
```

## Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Team collaboration features
- [ ] Dark mode support
- [ ] Drag and drop task reordering
- [ ] Recurring tasks
- [ ] Task priorities
- [ ] Search functionality
- [ ] Export/import data
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern task management applications
- Built with Next.js and the amazing React ecosystem
- [Design Inspiration](https://app.uizard.io/templates/XXJOvmKW0jhEyYZdmA7w/overview)
