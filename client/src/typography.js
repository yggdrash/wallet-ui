import Typography from "typography";

const typography = new Typography({
  googleFonts: [
    {
      name: "Markazi",
      styles: ["400", "700"]
    },
    {
      name: "Markazi",
      styles: ["400"]
    }
  ],
  headerFontFamily: ["Markazi", "Helvetica", "sans-serif"],
  bodyFontFamily: ["Markazi", "Helvetica", "sans-serif"],
  includeNormalize: false,
  baseFontSize: "14px"
});

export default typography.toString();