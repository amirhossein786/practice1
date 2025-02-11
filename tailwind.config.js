/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "4rem",
                    xl: "5rem",
                }
            },
            colors: {
                "table-color": "#34495E",
                "first-blue": "#1462A8",
                "hover-blue" : "#A1CFFF",
            }
        },
    },
    plugins: [],
};
