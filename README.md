# Nine2Six - Trip Planner Pro

**Trip Planner Pro** is a web application that helps users plan, track, and manage a personal or family travel plan.

The application covers:
- Itinerary management
- Packing checklist
- Travel budget planning
- Trip progress dashboard
- Data persistence using mocked data or localStorage

## Setup Guide
### Installation
1. **Clone the repository**
2. Install dependencies (Ensure you have Node.js installed)
    ```bash
    npm install
    ```
3. **Run the application**
    ```bash
    npm run dev
    ```

### Adding Shadcn Components
This project uses shadcn/ui. Since we are using a JavaScript configuration with path aliases, follow these steps to add new UI elements:
1. Browse the [shadcn documentation](https://ui.shadcn.com/docs/components) to find a component.
2. Find and run the installation command in your terminal. It should be in below format:
    ```bash
    npx shadcn@latest add <component-name>
    ```