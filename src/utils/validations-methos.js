export const validateCity = (city) => {
    const cityText = city.trim();

    if (cityText.length == 0) return "City is required";
    if (cityText.length < 3) return "City must be at least 3 characters long";
    if (cityText.length > 20) return "City must be less than 20 characters long";

    return "";
}

export const justLetters = (city) => /^[a-zA-Z\s]+$/.test(city)