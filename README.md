# Streamify Analytics Dashboard

Streamify Analytics Dashboard is a front-end application that provides an interactive dashboard for a fictional music streaming service. The dashboard displays key metrics, charts, and data tables, providing insights into user activity, revenue, and content performance. The project uses React, TypeScript, Tailwind CSS, MirageJS, and the Context API for state management.

## Features

- **Key Metrics**: Displays total users, active users, total streams, revenue, and top artist.
- **Charts**:
  - User Growth: A line chart showing the growth of total and active users over the last 12 months.
  - Revenue Distribution: A pie chart displaying revenue from subscriptions and ads.
  - Top 5 Streamed Songs: A bar chart showing the most streamed songs.
- **Recent Streams Table**: A sortable and filterable table listing recent streams with song names, artists, dates streamed, stream counts, and user IDs.
- **State Management**: Uses Context API for managing state across components.
- **Mock Data**: MirageJS is used to mock API endpoints for development without needing a backend server.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **TypeScript**: Superset of JavaScript that adds type checking.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **MirageJS**: API mocking library to simulate backend APIs.
- **Context API**: Provides a way to share state across components without prop drilling.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/streamify-dashboard.git
   cd streamify-dashboard
Install dependencies:
`npm install`

### Setup MirageJS
MirageJS is configured in the mirage.ts file and mocks the following API endpoints:

/api/metrics: Provides key metrics data.
/api/user-growth: Provides data for the user growth chart.
/api/revenue: Provides data for the revenue distribution chart.
/api/top-songs: Provides data for the top streamed songs.
/api/streams: Provides data for the recent streams table.
Running the Application
To run the application in development mode:

`npm run dev`
Open http://localhost:5173 to view it in your browser.

### Run Unit Tests
`npm test`

### Building for Production
To create an optimized production build:

`npm run build`
The production-ready files will be in the dist folder.

### How It Works
Context API: The DashboardContext provides a central place for managing and fetching data from MirageJS. All state is managed in the context and passed down to child components.

MirageJS: MirageJS mocks the backend API, allowing you to develop and test the frontend without needing a real server. Data is seeded into MirageJS and served via API endpoints.

Tailwind CSS: Tailwind is used for styling the components with utility classes, providing a clean and modern look.

Charts and Tables: The charts are implemented using Chart.js with react-chartjs-2, while the table is built with basic HTML and enhanced with sorting and filtering functionalities.

### Contact
For any questions or feedback, please contact yuvrajjsingh0@gmail.com.