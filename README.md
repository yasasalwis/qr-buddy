# QR Buddy

QR Buddy is a modern, privacy-focused QR code generation tool built with Next.js 16 and React 19. It provides a seamless experience for generating customizable QR codes for URLs, text, Wi-Fi credentials, and emails, all without requiring user accounts.

## Features

-   **Versatile QR Generation**: Supports multiple data types including Links, Plain Text, Email, and Wi-Fi configuration.
-   **Advanced Customization**: Customize QR code styles, colors, eye patterns, and embed logos/images.
-   **Privacy & Security**:
    -   **Zero Tracking**: No personal user data is collected or tracked.
    -   **Encryption**: Sensitive application data is encrypted at rest using a dedicated application key.
-   **Smart Features**:
    -   **Short URLs**: Automatically generates concise, shareable short URLs for every QR code.
    -   **Guest Access**: Full functionality available for guest users; no sign-up required.
    -   **Auto-Expiration**: Generated QR codes and data are retained for 1 year and then automatically purged.
-   **Modern Tech Stack**: Built with the latest web technologies for performance and responsiveness.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Frontend**: React 19, Tailwind CSS v4, Lucide React
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **QR Library**: `react-qrcode-logo`

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   **Node.js**: v20 or higher recommended.
-   **PostgreSQL**: A running instance of PostgreSQL (local or cloud-based).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/qr-buddy.git
    cd qr-buddy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

### Environment Configuration

Create a `.env` file in the root directory of the project and configure the necessary environment variables:

```env
# Database Connection
DATABASE_URL="postgresql://username:password@localhost:5432/qr_buddy?schema=public"

# Application Security (32-character random string recommended)
APP_KEY="your-secure-encryption-key"

# Base URL (for short links)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Setup

Initialize the database schema using Prisma:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to the database
npx prisma db push
```

### Running the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

The project follows a standard Next.js App Router structure:

-   `app/`: Contains the application routes, pages, and layouts.
-   `components/`: Reusable React UI components.
-   `lib/`: Utility functions, database clients, and helper libraries.
-   `prisma/`: Database schema definition (`schema.prisma`).
-   `public/`: Static assets like images and fonts.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

## License

Distributed under the MIT License. See `LICENSE` for more information.
