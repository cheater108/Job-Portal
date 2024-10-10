/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                orange: "#ED5353",
                lorange: "#FFEEEE",
                oshadow: "#ff20204a",
                sblack: "#525252",
            },
            backgroundImage: {
                hero: "url(/src/assets/cover.png)",
                job: "url(/src/assets/job.png)",
            },
            borderRadius: {
                half: "35px",
            },
            boxShadow: {
                "3xl": "0px 0px 22px 4px rgba(0,0,0,0.3)",
                "4xl": "0px 2px 35px 1px #0000001A",
                linked: "0px 2px 35px 1px #0077B5",
            },
        },
    },
    plugins: [],
};
